"use server";

import { z } from "zod";
import { licenseRepo } from "@/server/repositories/license";
import { requireAdmin } from "@/lib/auth/guards";

const createLicenseSchema = z.object({
  userId: z.string().cuid(),
  type: z.enum(["WEEKLY", "MONTHLY", "LIFETIME"]),
});

export async function createLicense(data: z.infer<typeof createLicenseSchema>) {
  await requireAdmin();
  const parsed = createLicenseSchema.parse(data);

  const expiresAt =
    parsed.type === "WEEKLY"
      ? new Date(Date.now() + 7 * 86400000)
      : parsed.type === "MONTHLY"
        ? new Date(Date.now() + 30 * 86400000)
        : undefined;

  return licenseRepo.create({ ...parsed, expiresAt });
}

export async function revokeLicense(id: string) {
  await requireAdmin();
  return licenseRepo.updateStatus(id, "REVOKED");
}

export async function suspendLicense(id: string) {
  await requireAdmin();
  return licenseRepo.updateStatus(id, "SUSPENDED");
}

export async function reactivateLicense(id: string) {
  await requireAdmin();
  return licenseRepo.updateStatus(id, "ACTIVE");
}
