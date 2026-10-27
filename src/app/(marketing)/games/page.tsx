import { GameCards } from "@/components/sections/games";
import { ArrowDownRight } from "lucide-react";

export const metadata = {
  title: "Games | Vanta",
  description:
    "Explore Vanta for Albion Online, Rust and upcoming games. ESP, radar and configurable overlays.",
};

export default function GamesPage() {
  return (
    <div className="site-container pb-24 pt-40">
      <div className="mb-14 flex items-end justify-between gap-8">
        <div>
          <p className="section-label">The collection</p>
          <h1 className="section-title !text-5xl md:!text-7xl">
            Pick your world.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-fg-soft">
            Different worlds. The same perspective. Explore the modules built
            for your game, and find the setup that fits the way you play.
          </p>
        </div>
        <ArrowDownRight
          size={56}
          strokeWidth={1}
          className="hidden text-cyan sm:block"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 [&_.game-card]:min-h-[380px]">
        <GameCards />
      </div>
    </div>
  );
}
