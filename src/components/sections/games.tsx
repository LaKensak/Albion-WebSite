"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { games } from "@/config/games";

export function GameCards() {
  return games.map((game, i) => (
    <motion.article
      key={game.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      className={`game-card group ${game.status === "soon" ? "soon" : ""}`}
    >
      <Image
        src={game.image}
        alt={`${game.name} artwork`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
      />
      <span
        className={`absolute left-4 top-4 flex items-center gap-1.5 rounded border px-2 py-1 font-mono text-[8px] uppercase tracking-wide backdrop-blur-md ${game.status === "live" ? "border-cyan/20 bg-bg/70 text-cyan" : "border-white/15 bg-bg/70 text-fg-soft"}`}
      >
        {game.status === "live" && <span className="status-dot !h-1 !w-1" />}
        {game.status === "live" ? "Available" : "In development"}
      </span>
      <p className="font-mono text-[8px] tracking-[.12em] text-fg-soft">
        {game.genre}
      </p>
      <h3 className="mt-2 font-display text-[25px] font-medium tracking-tight">
        {game.name}
      </h3>
      <p className="mt-1 text-[10px] text-fg-soft">{game.tagline}</p>
      {game.status === "live" ? (
        <Link
          href={`/games/${game.slug}`}
          aria-label={`Explore ${game.name}`}
          className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] font-medium text-cyan after:absolute after:inset-0"
        >
          Explore game{" "}
          <MoveUpRight
            size={14}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <Link
          href="/blog"
          className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] text-fg-dim after:absolute after:inset-0"
        >
          Follow development <ArrowUpRight size={13} />
        </Link>
      )}
    </motion.article>
  ));
}

export function Games() {
  return (
    <section id="games" className="site-container section-space !pt-16">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-label">Choose your world</p>
          <h2 className="section-title">Your game. Your advantage.</h2>
        </div>
        <Link
          href="/games"
          className="flex items-center gap-2 text-[11px] text-fg-soft hover:text-cyan"
        >
          Explore all games <ArrowUpRight size={14} />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GameCards />
      </div>
      <p className="mt-5 text-right font-mono text-[8px] tracking-wide text-fg-dim">
        MORE WORLDS. SAME VANTA.
      </p>
    </section>
  );
}
