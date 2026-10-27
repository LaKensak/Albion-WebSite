import Link from "next/link";
import { ArrowRight } from "lucide-react";

const games = [
  {
    slug:     "albion-online",
    name:     "Albion Online",
    tagline:  "ESP, radar and resource tracking. Every node, every threat, every dungeon.",
    features: ["Player ESP", "Resource Tracker", "Dungeon Scanner", "Radar Overlay"],
    status:   "live" as const,
  },
  {
    slug:     "rust",
    name:     "Rust",
    tagline:  "Player ESP, loot detection and base awareness for the open world.",
    features: ["Player ESP", "Loot ESP", "Base Detection", "Supply Drop Alerts"],
    status:   "live" as const,
  },
  {
    slug:     "arc-raiders",
    name:     "ARC RAIDERS",
    tagline:  "Overlay in development. Join the waitlist.",
    features: [],
    status:   "soon" as const,
  },
  {
    slug:     "cod-mw4",
    name:     "CoD MW4",
    tagline:  "Overlay in development. Join the waitlist.",
    features: [],
    status:   "soon" as const,
  },
];

export const metadata = {
  title: "Games | Ghost Overlay",
  description: "External overlays for Albion Online, Rust and more. ESP, radar, resource and loot tracking.",
};

export default function GamesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      {/* Header */}
      <div className="mb-16">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Overlays</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Every game we cover.
        </h1>
        <p className="mt-4 max-w-lg text-fg-soft">
          External overlays: transparent windows that show what you need, without touching the game process.
        </p>
      </div>

      {/* Game grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {games.map((g) => (
          <div
            key={g.slug}
            className={`card relative flex flex-col rounded-2xl p-7 ${g.status === "soon" ? "opacity-50" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-xl font-bold">{g.name}</h2>
                  {g.status === "live" ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-bg px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-fg-soft">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      Live
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/[0.07] bg-bg px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-fg-dim">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-fg-soft">{g.tagline}</p>
              </div>
            </div>

            {g.features.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {g.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-lg border border-white/[0.07] bg-bg px-2.5 py-1 text-xs text-fg-dim"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {g.status === "live" && (
              <div className="mt-7">
                <Link
                  href={`/games/${g.slug}`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-fg transition-opacity hover:opacity-75"
                >
                  View showcase
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
