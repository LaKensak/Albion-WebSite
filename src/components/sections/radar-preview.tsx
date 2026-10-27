"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  Crosshair,
  Eye,
  Layers3,
  Navigation,
  Pause,
  Play,
  Radar,
  Settings2,
  TreePine,
  Wifi,
} from "lucide-react";

const players = [
  { name: "Wanderer", distance: 42, x: 23, y: 35, enemy: false },
  { name: "Unknown", distance: 86, x: 58, y: 23, enemy: true },
  { name: "Ranger", distance: 120, x: 73, y: 45, enemy: false },
];

function RadarDisc({
  showPlayers,
  showResources,
  range,
}: {
  showPlayers: boolean;
  showResources: boolean;
  range: number;
}) {
  return (
    <div className="radar-disc" aria-hidden="true">
      <div className="radar-sweep" />
      <span className="absolute left-1/2 top-1 -translate-x-1/2 font-mono text-[8px] text-cyan/70">
        N
      </span>
      <Navigation
        size={12}
        fill="currentColor"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan"
      />
      {showPlayers &&
        players
          .filter((p) => p.distance <= range)
          .map((p) => (
            <span
              key={p.name}
              className={`radar-dot ${p.enemy ? "enemy" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            />
          ))}
      {showResources && (
        <>
          <span className="radar-dot !rounded-none !bg-[#f4d692] left-[35%] top-[68%] rotate-45" />
          {range >= 65 && (
            <span className="radar-dot !rounded-none !bg-[#f4d692] left-[65%] top-[73%] rotate-45" />
          )}
        </>
      )}
    </div>
  );
}

export function RadarPreview({
  initialGame = "albion-online",
}: {
  initialGame?: "albion-online" | "rust";
}) {
  const [game, setGame] = useState(initialGame);
  const [view, setView] = useState<"esp" | "radar">("esp");
  const [showPlayers, setShowPlayers] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [showRadar, setShowRadar] = useState(true);
  const [range, setRange] = useState(150);
  const [paused, setPaused] = useState(false);
  const id = useId();
  const gameName = game === "rust" ? "Rust" : "Albion Online";
  const visiblePlayers = players.filter((p) => p.distance <= range);

  return (
    <div
      className={`preview-frame ${paused ? "is-paused" : ""}`}
      data-preview-game={game}
    >
      <div className="preview-header">
        <span className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-fg-soft">
          <Layers3 size={13} className="text-cyan" /> VANTA OVERLAY
        </span>
        <div
          className="flex items-center gap-1 rounded-md border border-border bg-bg/50 p-1"
          aria-label="Preview game"
        >
          <button
            type="button"
            className="preview-game"
            aria-pressed={game === "albion-online"}
            onClick={() => setGame("albion-online")}
          >
            Albion Online
          </button>
          <button
            type="button"
            className="preview-game"
            aria-pressed={game === "rust"}
            onClick={() => setGame("rust")}
          >
            Rust
          </button>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider text-cyan">
          <span className="status-dot" /> DEMO
        </span>
      </div>
      <div className="preview-body">
        <aside className="preview-sidebar" aria-label="Preview settings">
          <p className="mb-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-fg-dim">
            <Settings2 size={12} /> Overlay settings
          </p>
          {[
            {
              label: "Player ESP",
              icon: Eye,
              checked: showPlayers,
              toggle: () => setShowPlayers(!showPlayers),
            },
            {
              label: "Resources",
              icon: TreePine,
              checked: showResources,
              toggle: () => setShowResources(!showResources),
            },
            {
              label: "Minimap",
              icon: Radar,
              checked: showRadar,
              toggle: () => setShowRadar(!showRadar),
            },
          ].map((setting) => (
            <div
              key={setting.label}
              className="mb-5 flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-2 text-[10px] text-fg-soft">
                <setting.icon size={12} /> {setting.label}
              </span>
              <button
                type="button"
                role="switch"
                aria-label={setting.label}
                aria-checked={setting.checked}
                onClick={setting.toggle}
                className="preview-toggle relative before:absolute before:-inset-2"
              />
            </div>
          ))}
          <div className="preview-range mt-8 border-t border-border pt-5">
            <label
              htmlFor={`${id}-range`}
              className="flex items-center justify-between text-[10px] text-fg-soft"
            >
              Render distance{" "}
              <span className="font-mono text-cyan">{range}m</span>
            </label>
            <input
              id={`${id}-range`}
              type="range"
              min="50"
              max="200"
              step="10"
              value={range}
              onChange={(event) => setRange(Number(event.target.value))}
              className="mt-4 w-full accent-cyan"
            />
          </div>
          <p className="mt-8 rounded border border-cyan/10 bg-cyan/5 p-3 text-[9px] leading-relaxed text-fg-dim">
            Make it yours.
            <br />
            <span className="text-fg-soft">
              Try the controls to explore the overlay.
            </span>
          </p>
        </aside>
        <div
          className="preview-scene"
          role="group"
          aria-label={`${gameName} illustrative ${view === "esp" ? "ESP" : "radar"} demo. ${showPlayers ? visiblePlayers.length : 0} players visible. Resources ${showResources ? "on" : "off"}.`}
        >
          <Image
            src={`/games/${game}.jpg`}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 800px"
            className="scene-image"
          />
          <div className="scene-shade" />
          <div className="scene-grid" />
          <div
            className="absolute left-4 top-4 flex gap-1 rounded-md border border-white/10 bg-bg/70 p-1"
            role="group"
            aria-label="Preview mode"
          >
            <button
              type="button"
              onClick={() => setView("esp")}
              aria-pressed={view === "esp"}
              className={`flex items-center gap-1.5 rounded px-3 py-2 text-[9px] ${view === "esp" ? "bg-cyan text-bg" : "text-fg-soft"}`}
            >
              <Crosshair size={11} /> ESP view
            </button>
            <button
              type="button"
              onClick={() => setView("radar")}
              aria-pressed={view === "radar"}
              className={`flex items-center gap-1.5 rounded px-3 py-2 text-[9px] ${view === "radar" ? "bg-cyan text-bg" : "text-fg-soft"}`}
            >
              <Radar size={11} /> Radar
            </button>
          </div>
          <span className="absolute right-4 top-6 font-mono text-[8px] uppercase tracking-wider text-white/60">
            {game === "rust" ? "Procedural map" : "Black zone"}
          </span>
          {view === "esp" ? (
            <>
              {showPlayers &&
                visiblePlayers.map((player, i) => (
                  <div
                    key={player.name}
                    data-player={player.name}
                    className="scene-entity"
                    style={{
                      left: `${player.x}%`,
                      top: `${player.y}%`,
                      color: player.enemy ? "#ff9a83" : "#c2f970",
                      animationDelay: `${i * -2}s`,
                    }}
                  >
                    <span className="entity-label">
                      {player.name} · {player.distance}m
                    </span>
                    <div className="entity-box" />
                    <span className="entity-health" />
                  </div>
                ))}
              {showResources && (
                <>
                  <span className="resource-marker left-[13%] top-[73%]">
                    <TreePine size={10} />{" "}
                    {game === "rust" ? "Hemp" : "T6 Wood"} · 28m
                  </span>
                  {range >= 65 && (
                    <span className="resource-marker left-[49%] top-[67%]">
                      <Layers3 size={10} />{" "}
                      {game === "rust" ? "Metal ore" : "T7 Ore"} · 65m
                    </span>
                  )}
                </>
              )}
              <Crosshair
                aria-hidden="true"
                size={23}
                strokeWidth={1}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/55"
              />
              {showRadar && (
                <div className="scene-minimap">
                  <RadarDisc
                    showPlayers={showPlayers}
                    showResources={showResources}
                    range={range}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="radar-full">
              <RadarDisc
                showPlayers={showPlayers}
                showResources={showResources}
                range={range}
              />
            </div>
          )}
          <div className="absolute bottom-5 left-4 font-mono text-[8px] leading-loose text-white/65">
            <span className="text-cyan">VANTA</span> / {gameName.toUpperCase()}
            <br />
            ILLUSTRATIVE PREVIEW
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Play preview animation" : "Pause preview animation"
            }
            aria-pressed={paused}
            className="absolute bottom-5 right-36 grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-bg/70 text-fg-soft hover:text-cyan"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>
      <div className="preview-footer">
        <span className="flex items-center gap-2">
          <Wifi size={11} className="text-cyan" /> INTERACTIVE SIMULATION
        </span>
        <span>
          EXTERNAL OVERLAY <span className="mx-2 text-white/20">/</span> WINDOWS
          10 & 11
        </span>
      </div>
    </div>
  );
}
