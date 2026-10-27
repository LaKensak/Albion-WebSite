export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { licenseRepo } from "@/server/repositories/license";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) {
    return NextResponse.json({ valid: false, error: "Missing key" }, { status: 400 });
  }

  const license = await licenseRepo.findByKey(key);
  if (!license) {
    return NextResponse.json({ valid: false, error: "Invalid key" }, { status: 404 });
  }

  if (license.user?.banned) {
    return NextResponse.json({ valid: false, error: "User banned" }, { status: 403 });
  }

  if (license.status !== "ACTIVE") {
    return NextResponse.json({ valid: false, error: `License ${license.status.toLowerCase()}` }, { status: 403 });
  }

  if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
    return NextResponse.json({ valid: false, error: "License expired" }, { status: 403 });
  }

  return NextResponse.json({
    valid: true,
    type: license.type,
    expiresAt: license.expiresAt,
    hwid: license.hwid,
  });
}
