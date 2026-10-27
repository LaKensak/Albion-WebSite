export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";

const DENIED = { ok: false, error: "Invalid credentials" } as const;
const CUID_RE = /^c[a-z0-9]{20,28}$/;
const HWID_RE = /^[a-f0-9]{32}$/i;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = await checkRateLimit(`license-validate:${ip}`);
    if (!rl.success) {
      return NextResponse.json(
        { ok: false, error: "Too many attempts" },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { key, hwid } = body as { key?: string; hwid?: string };

    if (
      !key || !hwid ||
      typeof key !== "string" || typeof hwid !== "string" ||
      !CUID_RE.test(key) || !HWID_RE.test(hwid)
    ) {
      return NextResponse.json(DENIED, { status: 403 });
    }

    const license = await db.license.findUnique({
      where: { key },
      include: { user: true },
    });

    if (!license || license.user?.banned || license.status !== "ACTIVE") {
      return NextResponse.json(DENIED, { status: 403 });
    }

    if (
      license.type !== "LIFETIME" &&
      license.expiresAt &&
      new Date(license.expiresAt) < new Date()
    ) {
      await db.license.update({
        where: { id: license.id },
        data: { status: "EXPIRED" },
      });
      return NextResponse.json(DENIED, { status: 403 });
    }

    if (license.hwid && license.hwid !== hwid) {
      return NextResponse.json(DENIED, { status: 403 });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await db.license.update({
      where: { id: license.id },
      data: {
        ...(!license.hwid ? { hwid } : {}),
        sessionToken: token,
        lastHeartbeat: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      token,
      type: license.type,
      expiresAt: license.expiresAt?.toISOString() ?? null,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 },
    );
  }
}
