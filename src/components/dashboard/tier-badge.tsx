import type { Tier } from "@/config/loyalty";

export const tierStyle: Record<Tier["key"], { badge: string; bar: string; text: string }> = {
  recruit: { badge: "bg-white/[0.06] text-fg-soft", bar: "bg-fg-dim", text: "text-fg-soft" },
  veteran: { badge: "bg-cyan/10 text-cyan", bar: "bg-cyan", text: "text-cyan" },
  elite: { badge: "bg-violet/15 text-violet", bar: "bg-violet", text: "text-violet" },
  legend: { badge: "bg-amber-400/15 text-amber-300", bar: "bg-amber-400", text: "text-amber-300" },
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${tierStyle[tier.key].badge}`}>
      {tier.name}
    </span>
  );
}
