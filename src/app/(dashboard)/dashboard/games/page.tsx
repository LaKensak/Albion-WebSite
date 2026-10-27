export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { plans } from "@/config/plans";
import { eur } from "@/lib/format";
import type { LicenseType } from "@prisma/client";

const games = [
  {
    id:     "albion",
    name:   "Albion Online",
    desc:   "ESP overlay with player, animal and resource tracking.",
    status: "live" as const,
  },
  {
    id:     "rust",
    name:   "Rust",
    desc:   "Player ESP, item ESP and base detection overlay.",
    status: "live" as const,
  },
  {
    id:     "arc",
    name:   "ARC RAIDERS",
    desc:   "Overlay in development. Join the waitlist.",
    status: "pending" as const,
  },
  {
    id:     "mw4",
    name:   "CoD MW4",
    desc:   "Overlay in development. Join the waitlist.",
    status: "pending" as const,
  },
];

const planOrder: LicenseType[] = ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"];

export default function GamesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">Games</h1>
        <p className="mt-0.5 text-sm text-fg-soft">Every overlay available on the platform.</p>
      </header>

      <div className="flex flex-col gap-3">
        {games.map((g) => (
          <div
            key={g.id}
            className="card rounded-2xl p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              {/* Left: name + desc + status */}
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-base font-semibold text-fg">{g.name}</h2>
                  {g.status === "live" ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-bg px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-fg-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-green" />
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/[0.07] bg-bg px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-fg-dim">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-fg-soft">{g.desc}</p>
              </div>

              {/* Right: plans or coming soon */}
              {g.status === "live" ? (
                <div className="flex flex-wrap items-center gap-2">
                  {planOrder.map((key) => {
                    const p = plans[key];
                    return (
                      <Link
                        key={key}
                        href={`/checkout?plan=${key}`}
                        className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-bg px-4 py-2.5 transition-colors hover:border-white/[0.15] hover:bg-bg-raised"
                      >
                        <span className="text-sm font-semibold text-fg">{eur(p.price)}</span>
                        <span className="text-xs text-fg-dim">{p.period}</span>
                        <ArrowRight size={12} className="text-fg-dim transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-fg-dim">Notify me when available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
