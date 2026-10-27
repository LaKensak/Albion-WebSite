import { db } from "@/lib/db";
import type { LicenseType, PaymentMethod, PaymentStatus } from "@prisma/client";

export const paymentRepo = {
  create: (data: { userId: string; plan: LicenseType; amount: number; method: PaymentMethod; discountPct?: number }) =>
    db.payment.create({ data }),

  findById: (id: string) =>
    db.payment.findUnique({ where: { id }, include: { user: true, license: true } }),

  findByUser: (userId: string) =>
    db.payment.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),

  findByStatus: (statuses: PaymentStatus[]) =>
    db.payment.findMany({
      where: { status: { in: statuses } },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    }),

  countToReview: () => db.payment.count({ where: { status: "SUBMITTED" } }),

  submitTx: (id: string, txRef: string) =>
    db.payment.update({ where: { id }, data: { txRef, status: "SUBMITTED" } }),

  setStatus: (id: string, status: PaymentStatus, licenseId?: string) =>
    db.payment.update({ where: { id }, data: { status, licenseId } }),
};

export async function confirmedRevenue() {
  const agg = await db.payment.aggregate({ where: { status: "CONFIRMED" }, _sum: { amount: true } });
  return agg._sum.amount ?? 0;
}
