import { Layers3, Monitor, Settings2, Wallet } from "lucide-react";

import { plans } from "@/config/plans";

const stats = [
  {
    icon: Layers3,
    value: "02",
    label: "Games. One perspective.",
    detail: "Albion Online & Rust",
  },
  {
    icon: Settings2,
    value: "100%",
    label: "Your configuration.",
    detail: "Independent modules & filters",
  },
  {
    icon: Wallet,
    value: `€${plans.DAILY.price}`,
    label: "Your first session.",
    detail: "Daily access available",
  },
  {
    icon: Monitor,
    value: "01",
    label: "Everything in one place.",
    detail: "Licenses, downloads & updates",
  },
];

export function Stats() {
  return (
    <section
      aria-label="Vanta at a glance"
      className="border-y border-border bg-bg-raised/50"
    >
      <div className="site-container grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.value}
            className="border-border px-4 py-7 even:border-l md:border-l md:px-8 md:first:border-l-0"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-[32px] font-medium tracking-tight">
                {stat.value}
              </p>
              <stat.icon size={16} strokeWidth={1.5} className="text-fg-dim" />
            </div>
            <p className="mt-2 text-[10px] font-medium text-fg-soft">
              {stat.label}
            </p>
            <p className="mt-1.5 text-[9px] text-fg-dim">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
