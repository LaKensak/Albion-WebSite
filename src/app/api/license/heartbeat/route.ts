export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const FAIL = { ok: false } as const;
const TOKEN_RE = /^[a-f0-9]{64}$/;
const HWID_RE = /^[a-f0-9]{32}$/i;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = await checkRateLimit(`license-heartbeat:${ip}`);
    if (!rl.success) {
      return NextResponse.json(FAIL, { status: 429 });
    }

    const body = await req.json();
    const { token, hwid } = body as { token?: string; hwid?: string };

    if (
      !token || !hwid ||
      typeof token !== "string" || typeof hwid !== "string" ||
      !TOKEN_RE.test(token) || !HWID_RE.test(hwid)
    ) {
      return NextResponse.json(FAIL, { status: 403 });
    }

    const license = await db.license.findFirst({
      where: { hwid, sessionToken: token, status: "ACTIVE" },
    });

    if (!license) {
      return NextResponse.json(FAIL, { status: 403 });
    }

    if (
      license.type !== "LIFETIME" &&
      license.expiresAt &&
      new Date(license.expiresAt) < new Date()
    ) {
      await db.license.update({
        where: { id: license.id },
        data: { status: "EXPIRED", sessionToken: null },
      });
      return NextResponse.json(FAIL, { status: 403 });
    }

    await db.license.update({
      where: { id: license.id },
      data: { lastHeartbeat: new Date() },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(FAIL, { status: 500 });
  }
}
