export const dynamic = "force-dynamic";

import { Check, Gift, Lock, Users } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { getLoyalty, getReferralStats } from "@/server/loyalty";
import { referral, tiers } from "@/config/loyalty";
import { eur } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { CopyButton } from "@/components/copy-button";
import { TierBadge, tierStyle } from "@/components/dashboard/tier-badge";

export default async function RewardsPage() {
  const session = await requireAuth();
  const uid = session.user.id;
  const [loyalty, stats, me] = await Promise.all([
    getLoyalty(uid),
    getReferralStats(uid),
    db.user.findUnique({ where: { id: uid }, select: { referralCode: true } }),
  ]);
  const refLink = `${siteConfig.url}/register?ref=${me?.referralCode}`;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Rewards</h1>
        <p className="mt-1 text-sm text-fg-soft">The longer you stay, the less you pay.</p>
      </header>

      <section className="glass-card-strong rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-cyan">Your tier</p>
            <p className="mt-2 font-display text-3xl font-extrabold">{loyalty.tier.name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-fg-dim">Total spent</p>
            <p className="font-display text-xl font-bold">{eur(loyalty.spend)}</p>
          </div>
        </div>
        <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className={`h-full rounded-full ${tierStyle[loyalty.tier.key].bar}`} style={{ width: `${Math.max(4, loyalty.progress)}%` }} />
        </div>
        <p className="mt-3 text-sm text-fg-soft">
          {loyalty.next
            ? `${eur(loyalty.toNext)} to ${loyalty.next.name}, which unlocks ${loyalty.next.discount}% off every purchase.`
            : "Top tier reached. Every purchase gets the maximum discount."}
        </p>
        {loyalty.discountPct > 0 && (
          <p className="mt-3 inline-block rounded-full bg-green-bg px-3 py-1 text-xs font-medium text-green">
            -{loyalty.discountPct}% applied automatically at checkout ({loyalty.discountReason})
          </p>
        )}
      </section>

      <section>
        <h2 className="font-display text-lg font-bold">Tiers</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {tiers.map((t) => {
            const reached = loyalty.spend >= t.minSpend;
            const current = t.key === loyalty.tier.key;
            return (
              <div key={t.key} className={`rounded-2xl p-5 ${current ? "glass-card-strong" : "glass-card"} ${reached ? "" : "opacity-60"}`} style={{ transform: "none" }}>
                <div className="flex items-center justify-between">
                  <TierBadge tier={t} />
                  <span className="flex items-center gap-1 text-xs text-fg-dim">
                    {reached ? <Check size={13} className="text-green" /> : <Lock size={13} />}
                    {t.minSpend === 0 ? "Start" : `from ${eur(t.minSpend)}`}
                  </span>
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-fg-soft">
                      <span className="h-1 w-1 rounded-full bg-cyan" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="glass-card rounded-2xl p-6 md:p-8" style={{ transform: "none" }}>
        <h2 className="flex items-center gap-2 font-display text-lg font-bold"><Gift size={18} className="text-violet" /> Referral</h2>
        <p className="mt-2 text-sm text-fg-soft">
          Your friend gets {referral.referredDiscount}% off their first order. Once they buy, you get {referral.referrerBonusDays} extra days on your license.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <code className="min-w-0 flex-1 truncate rounded-xl bg-black/30 px-4 py-2.5 font-mono text-xs">{refLink}</code>
          <CopyButton value={refLink} label="Copy link" />
        </div>
        <p className="mt-3 text-xs text-fg-dim">Or share your code: <span className="font-mono text-fg-soft">{me?.referralCode}</span></p>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-black/20 p-4">
            <Users size={16} className="mx-auto text-cyan" />
            <p className="mt-2 font-display text-xl font-bold">{stats.invited}</p>
            <p className="text-[0.7rem] text-fg-dim">Signed up</p>
          </div>
          <div className="rounded-xl bg-black/20 p-4">
            <Check size={16} className="mx-auto text-green" />
            <p className="mt-2 font-display text-xl font-bold">{stats.converted}</p>
            <p className="text-[0.7rem] text-fg-dim">Bought</p>
          </div>
          <div className="rounded-xl bg-black/20 p-4">
            <Gift size={16} className="mx-auto text-violet" />
            <p className="mt-2 font-display text-xl font-bold">{stats.daysEarned}</p>
            <p className="text-[0.7rem] text-fg-dim">Days earned</p>
          </div>
        </div>
      </section>
    </div>
  );
}
