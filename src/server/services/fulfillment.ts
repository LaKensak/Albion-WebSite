import type { LicenseType, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { planDays } from "@/lib/license";
import { referral } from "@/config/loyalty";

const DAY = 86_400_000;
type Tx = Prisma.TransactionClient;

async function extendOrCreate(tx: Tx, userId: string, type: LicenseType, days: number | null) {
  const existing = await tx.license.findFirst({
    where: { userId, status: { in: ["ACTIVE", "EXPIRED"] } },
    orderBy: { createdAt: "desc" },
  });

  if (days === null) {
    if (existing) {
      return tx.license.update({ where: { id: existing.id }, data: { type: "LIFETIME", status: "ACTIVE", expiresAt: null } });
    }
    return tx.license.create({ data: { type: "LIFETIME", userId } });
  }

  if (existing && existing.type === "LIFETIME") return existing;

  if (existing) {
    const base = Math.max(Date.now(), existing.expiresAt?.getTime() ?? 0);
    return tx.license.update({
      where: { id: existing.id },
      data: { type, status: "ACTIVE", expiresAt: new Date(base + days * DAY) },
    });
  }
  return tx.license.create({ data: { type, userId, expiresAt: new Date(Date.now() + days * DAY) } });
}

export async function fulfillPayment(paymentId: string) {
  return db.$transaction(async (tx) => {
    const claimed = await tx.payment.updateMany({
      where: { id: paymentId, status: { in: ["PENDING", "SUBMITTED"] } },
      data: { status: "CONFIRMED" },
    });
    if (claimed.count !== 1) return null;

    const payment = await tx.payment.findUniqueOrThrow({ where: { id: paymentId } });
    const license = await extendOrCreate(tx, payment.userId, payment.plan, planDays[payment.plan]);
    await tx.payment.update({ where: { id: paymentId }, data: { licenseId: license.id } });

    const confirmed = await tx.payment.count({ where: { userId: payment.userId, status: "CONFIRMED" } });
    if (confirmed === 1) {
      const buyer = await tx.user.findUnique({ where: { id: payment.userId }, select: { referredById: true } });
      if (buyer?.referredById) {
        await extendOrCreate(tx, buyer.referredById, "WEEKLY", referral.referrerBonusDays);
      }
    }
    return license;
  });
}
