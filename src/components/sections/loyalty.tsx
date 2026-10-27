import { ArrowUpRight, Check, Gift, Star } from "lucide-react";
import Link from "next/link";
import { referral, tiers } from "@/config/loyalty";
import { tierStyle } from "@/components/dashboard/tier-badge";

export function Loyalty() {
  return (
    <section
      id="rewards"
      className="section-space border-y border-border bg-bg-raised/40"
    >
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-label">Good company. Better rewards.</p>
            <h2 className="section-title">Stay in. Level up.</h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-fg-soft">
            Every purchase moves you forward. Unlock automatic discounts and
            perks as you go.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <div
              key={tier.key}
              className="rounded-lg border border-border bg-bg p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded px-2 py-1 font-mono text-[8px] uppercase tracking-wider ${tierStyle[tier.key].badge}`}
                >
                  {tier.name}
                </span>
                <Star
                  size={13}
                  className={tierStyle[tier.key].text}
                  fill={i > 1 ? "currentColor" : "none"}
                />
              </div>
              <p className="mt-6 font-display text-3xl font-medium tracking-tight">
                {tier.discount > 0
                  ? `${tier.discount}% off`
                  : "Your first step"}
              </p>
              <p className="mt-2 text-[9px] text-fg-dim">
                {tier.minSpend === 0
                  ? "From your first order"
                  : `Unlocked after €${tier.minSpend} spent`}
              </p>
              <ul className="mt-5 space-y-2">
                {tier.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-start gap-2 text-[9px] leading-relaxed text-fg-soft"
                  >
                    <Check size={11} className="mt-0.5 shrink-0 text-fg-dim" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-cyan/15 bg-cyan/5 px-6 py-5">
          <div className="flex items-center gap-4">
            <Gift size={22} strokeWidth={1.5} className="shrink-0 text-cyan" />
            <p className="text-[11px] leading-relaxed text-fg-soft">
              <span className="font-medium text-fg">
                Better with your squad.
              </span>
              <br />
              Give a friend {referral.referredDiscount}% off. Get{" "}
              {referral.referrerBonusDays} free days when they make their first
              purchase.
            </p>
          </div>
          <Link
            href="/dashboard/rewards"
            className="flex items-center gap-2 text-[10px] text-cyan"
          >
            Explore your rewards <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
