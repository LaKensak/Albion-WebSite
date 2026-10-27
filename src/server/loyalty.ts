import { db } from "@/lib/db";
import { nextTier, referral, tierFor } from "@/config/loyalty";

export async function getLoyalty(userId: string) {
  const [agg, confirmedCount, user] = await Promise.all([
    db.payment.aggregate({ where: { userId, status: "CONFIRMED" }, _sum: { amount: true } }),
    db.payment.count({ where: { userId, status: "CONFIRMED" } }),
    db.user.findUnique({ where: { id: userId }, select: { referredById: true } }),
  ]);

  const spend = agg._sum.amount ?? 0;
  const tier = tierFor(spend);
  const next = nextTier(spend);
  const referralDiscount = user?.referredById && confirmedCount === 0 ? referral.referredDiscount : 0;
  const discountPct = Math.max(tier.discount, referralDiscount);
  const discountReason =
    discountPct === 0 ? null : referralDiscount > tier.discount ? "Welcome discount (referral)" : `${tier.name} tier`;

  return {
    spend,
    tier,
    next,
    toNext: next ? Math.max(0, next.minSpend - spend) : 0,
    progress: next ? ((spend - tier.minSpend) / (next.minSpend - tier.minSpend)) * 100 : 100,
    discountPct,
    discountReason,
    confirmedCount,
  };
}

export function priceFor(base: number, discountPct: number) {
  return Math.round(base * (100 - discountPct)) / 100;
}

export async function getReferralStats(userId: string) {
  const invited = await db.user.findMany({
    where: { referredById: userId },
    select: { id: true, payments: { where: { status: "CONFIRMED" }, select: { id: true }, take: 1 } },
  });
  const converted = invited.filter((u) => u.payments.length > 0).length;
  return { invited: invited.length, converted, daysEarned: converted * referral.referrerBonusDays };
}
