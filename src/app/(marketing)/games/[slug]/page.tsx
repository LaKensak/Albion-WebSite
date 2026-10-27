import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, Shield, Zap, Monitor } from "lucide-react";
import Image from "next/image";
import { Pricing } from "@/components/sections/pricing";
import { RadarPreview } from "@/components/sections/radar-preview";

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
    subtitle: "Full situational awareness across every zone.",
    description:
      "A separate process that draws live game data directly over your screen: players, resources, mobs and world objects. Nothing touches the game process. Runs alongside the client without modifying files or memory.",
    features: [
      {
        icon: Shield,
        title: "Player ESP",
        desc: "Every player in range with health, gear tier and active abilities. Allies and enemies distinguished at a glance. Configurable max distance and per-faction filters.",
      },
      {
        icon: Zap,
        title: "Resource Tracker",
        desc: "All harvestable nodes tagged by type, tier (T1-T8) and enchantment level (0-4). Toggle each resource category independently. Distance cutoff configurable per category.",
      },
      {
        icon: Monitor,
        title: "Radar",
        desc: "Separate minimap with distinct icons for players, mobs and resources. Adjustable range and scale. Reposition freely on screen.",
      },
      {
        icon: Shield,
        title: "Extended Camera",
        desc: "Remove the default fog limit and push zoom beyond the in-game cap. More coverage per screen without editing any game file.",
      },
      {
        icon: Zap,
        title: "Entity Filter",
        desc: "Show or hide chests with empty-state filtering, mob categories, critters and world objects. Each type has its own distance slider.",
      },
      {
        icon: Monitor,
        title: "Hostile Alert",
        desc: "On-screen count and distance readout for hostile players near your position. Know before you see them.",
      },
    ],
    requirements: [
      "Windows 10 or Windows 11 (64-bit)",
      "Works on Intel and AMD",
      "Albion Online installed (any server region)",
    ],
  },
  rust: {
    name: "Rust",
    subtitle: "See everything around you before it costs you.",
    description:
      "A separate process for Rust that draws player data, world items and terrain objects over the game as a transparent window. Nothing is injected. Nothing is written to game files. Runs entirely alongside the client.",
    features: [
      {
        icon: Shield,
        title: "Player ESP",
        desc: "Every player through terrain with corner box, skeleton, health bar, name, distance and held item. NPCs and sleepers included with distinct colours. Configurable distance cutoff.",
      },
      {
        icon: Zap,
        title: "World ESP",
        desc: "Ores, hemp, dropped items, bags, crates and tool cupboards marked on screen with distance. Toggle each category independently.",
      },
      {
        icon: Monitor,
        title: "Aimbot",
        desc: "Adjustable FOV cone, smooth factor and max range. Team-fire protection built in. Optional humanize mode adds natural movement variance.",
      },
      {
        icon: Shield,
        title: "Homing",
        desc: "Steer projectiles mid-flight for bow, crossbow and nailgun. Configurable turn rate cap for natural-looking correction.",
      },
    ],
    requirements: [
      "Windows 10 or Windows 11 (64-bit)",
      "Works on Intel and AMD",
      "Rust installed via Steam",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(gameData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gameData[slug];
  if (!game) return {};
  return {
    title: `${game.name} | Vanta`,
    description: game.description,
  };
}

export default async function GameShowcasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gameData[slug];
  if (!game) notFound();

  return (
    <>
      <div className="site-container pb-8 pt-36">
        <div className="mb-7 flex items-center gap-2 font-mono text-[10px] text-fg-dim">
          <Link href="/games" className="hover:text-cyan">
            ALL GAMES
          </Link>
          <span>/</span>
          <span className="uppercase text-fg-soft">{game.name}</span>
        </div>
        <div className="relative isolate overflow-hidden rounded-xl border border-border px-7 py-14 md:px-12 md:py-20">
          <Image
            src={`/games/${slug}.jpg`}
            alt={`${game.name} artwork`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            preload
            className="-z-20 object-cover opacity-55"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
          <span className="inline-flex items-center gap-2 rounded border border-cyan/25 bg-bg/70 px-3 py-1.5 font-mono text-[9px] tracking-wider text-cyan">
            <span className="status-dot" /> AVAILABLE NOW
          </span>
          <h1 className="mt-7 font-display text-5xl font-medium tracking-[-.05em] md:text-7xl">
            {game.name}
            <span className="text-cyan">.</span>
          </h1>
          <p className="mt-5 max-w-md font-display text-xl text-fg-soft">
            {game.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#pricing" className="btn-primary">
              Get access <ArrowUpRight size={14} />
            </Link>
            <Link href="#game-preview" className="btn-ghost">
              Explore the overlay
            </Link>
          </div>
        </div>
      </div>
      <section className="site-container section-space !pb-12">
        <p className="section-label">Built for {game.name}</p>
        <h2 className="section-title">Your world. In full view.</h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-fg-soft">
          {game.description}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {game.features.map((feature) => (
            <div key={feature.title} className="card card-hover rounded-lg p-6">
              <feature.icon size={20} strokeWidth={1.5} className="text-cyan" />
              <h3 className="mt-5 font-display text-lg font-medium">
                {feature.title}
              </h3>
              <p className="mt-3 text-xs leading-[1.9] text-fg-soft">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="game-preview"
        className="site-container section-space !pb-12"
      >
        <p className="section-label">A different point of view</p>
        <h2 className="section-title mb-9">Meet your new perspective.</h2>
        <RadarPreview
          initialGame={slug === "rust" ? "rust" : "albion-online"}
        />
        <p className="mt-4 text-center text-[10px] text-fg-dim">
          Illustrative simulation. Sample data and game artwork.
        </p>
      </section>
      <section className="site-container mt-12 rounded-lg border border-border bg-bg-card p-7">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-fg-soft">
          Before you jump in
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {game.requirements.map((requirement) => (
            <li
              key={requirement}
              className="flex items-center gap-2 text-xs text-fg-soft"
            >
              <Check size={13} className="shrink-0 text-cyan" />
              {requirement}
            </li>
          ))}
        </ul>
      </section>
      <Pricing />
    </>
  );
}
