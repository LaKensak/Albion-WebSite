import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Shield, Zap, Monitor } from "lucide-react";
import { plans } from "@/config/plans";
import { eur } from "@/lib/format";
import type { LicenseType } from "@prisma/client";

type Feature = { icon: typeof Shield; title: string; desc: string };

type GameData = {
  name: string;
  subtitle: string;
  description: string;
  features: Feature[];
  requirements: string[];
};

const gameData: Record<string, GameData> = {
  "albion-online": {
    name: "Albion Online",
    subtitle: "Complete situational awareness for every zone.",
    description:
      "An external overlay that draws real-time information directly over the game: players, resources, dungeons and more. No interaction with the game process at all. Zero footprint inside the game. Tested across every zone type since launch.",
    features: [
      {
        icon: Shield,
        title: "Player ESP",
        desc: "Every player in render range shown on the overlay with health bar, gear score tier and active spells. Allies and enemies distinguished at a glance. Configurable max range and faction filters.",
      },
      {
        icon: Zap,
        title: "Resource Tracker",
        desc: "Every harvestable node on the map tagged by resource type, tier (T4-T8) and enchantment level. Toggle resource categories independently. Show only enchanted nodes if that is all you need.",
      },
      {
        icon: Monitor,
        title: "Dungeon Scanner",
        desc: "Random dungeons, corrupted portals, hellgates and mists appear on the overlay as soon as they are detectable. See what is ahead before committing to an entrance.",
      },
      {
        icon: Shield,
        title: "Animal ESP",
        desc: "Track animal spawns by type for skinning runs and fame farming. Filter by mob tier to avoid wasted detours across large open-world zones.",
      },
      {
        icon: Zap,
        title: "Radar Overlay",
        desc: "Configurable minimap drawn as a separate overlay window. Adjust zoom, reposition freely, and toggle each object category independently. Works in every zone including the Roads of Avalon.",
      },
      {
        icon: Monitor,
        title: "Extended Camera",
        desc: "Push the default camera distance beyond the standard cap. More screen coverage without touching any in-game setting or file.",
      },
    ],
    requirements: [
      "Windows 10 or Windows 11 (64-bit)",
      "Intel Core i5 or AMD Ryzen 5, any generation",
      "4 GB RAM minimum",
      "Albion Online installed (any server region)",
    ],
  },
  "rust": {
    name: "Rust",
    subtitle: "Know what is around you before it matters.",
    description:
      "An external overlay for Rust that layers player positions, loot locations and structure data over the game as a transparent window. Nothing injected. Nothing written to game files. The overlay runs entirely alongside the game.",
    features: [
      {
        icon: Shield,
        title: "Player ESP",
        desc: "Other players visible through terrain with distance, health bar and the item currently held. Teammate tags included. Configurable distance cutoff to avoid HUD clutter on large maps.",
      },
      {
        icon: Zap,
        title: "Loot ESP",
        desc: "Containers, dropped items and supply crates marked on the overlay with item category and proximity distance. Filter by loot tier to cut noise on high-pop servers.",
      },
      {
        icon: Monitor,
        title: "Base Detection",
        desc: "Structures, auto-turrets and traps in your radius shown on the overlay. Get a read on base density around your position without scouting on foot.",
      },
      {
        icon: Shield,
        title: "Supply Drop Alerts",
        desc: "Supply drops flagged the moment they become visible. Position and descent trajectory shown before they land. Be first, not second.",
      },
    ],
    requirements: [
      "Windows 10 or Windows 11 (64-bit)",
      "Intel Core i5 or AMD Ryzen 5, any generation",
      "8 GB RAM minimum",
      "Rust installed via Steam",
    ],
  },
};

const planOrder: LicenseType[] = ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"];

export function generateStaticParams() {
  return Object.keys(gameData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = gameData[slug];
  if (!game) return {};
  return {
    title: `${game.name} Overlay | Ghost Overlay`,
    description: game.description,
  };
}

export default async function GameShowcasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = gameData[slug];
  if (!game) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 pb-28 pt-24 md:pt-32">
      {/* Breadcrumb */}
      <div className="mb-10 flex items-center gap-2 text-xs text-fg-dim">
        <Link href="/games" className="transition-colors hover:text-fg-soft">Games</Link>
        <span>/</span>
        <span className="text-fg-soft">{game.name}</span>
      </div>

      {/* Hero */}
      <div className="mb-16">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{game.name}</h1>
          <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-bg-raised px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-fg-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Live
          </span>
        </div>
        <p className="mt-3 font-display text-xl font-medium text-fg-soft md:text-2xl">{game.subtitle}</p>
        <p className="mt-4 max-w-2xl leading-relaxed text-fg-soft">{game.description}</p>
      </div>

      {/* Features */}
      <section className="mb-20">
        <p className="mb-8 font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Modules</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {game.features.map((f) => (
            <div key={f.title} className="card rounded-2xl p-6">
              <p className="font-display text-base font-semibold text-fg">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-20">
        <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Requirements</p>
        <ul className="flex flex-col gap-2.5">
          {game.requirements.map((r) => (
            <li key={r} className="flex items-center gap-3 text-sm text-fg-soft">
              <Check size={13} className="shrink-0 text-fg-dim" />
              {r}
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Get access</p>
          <Link href="/#faq" className="text-xs text-fg-dim transition-colors hover:text-fg-soft">
            Questions? See FAQ
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {planOrder.map((key) => {
            const p = plans[key];
            return (
              <div
                key={key}
                className={`flex flex-col rounded-2xl p-5 ${
                  p.featured
                    ? "border border-white/[0.18] bg-bg-card"
                    : "card"
                }`}
              >
                <p className="font-display text-sm font-bold text-fg">{p.name}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-extrabold leading-none text-fg">
                    {eur(p.price)}
                  </span>
                  <span className="text-xs text-fg-dim">{p.period}</span>
                </div>
                <Link
                  href={`/checkout?plan=${key}`}
                  className={`mt-5 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition ${
                    p.featured
                      ? "bg-white text-black hover:opacity-90"
                      : "border border-white/[0.1] text-fg hover:bg-white/[0.04]"
                  }`}
                >
                  Get access <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
