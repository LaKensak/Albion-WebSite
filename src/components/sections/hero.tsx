"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const games = [
  { name: "Albion Online", status: "live"    },
  { name: "Rust",          status: "live"    },
  { name: "ARC RAIDERS",   status: "pending" },
  { name: "CoD MW4",       status: "pending" },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim"
        >
          External overlay platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.07 }}
          className="mt-5 font-display text-5xl font-extrabold leading-[1.07] tracking-[-0.025em] md:text-6xl"
        >
          One platform.
          <br />
          <span className="text-fg-soft">Every game.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="mx-auto mt-5 max-w-md text-base leading-relaxed text-fg-soft"
        >
          Lightweight external overlays that run entirely outside the game process.
          Undetected. Updated within hours of each patch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link href="#pricing" className="btn-primary group">
            Get Access
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="#features" className="btn-ghost">
            See Features
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-1 text-xs text-fg-dim"
        >
          {games.map((g, i) => (
            <span key={g.name} className="flex items-center gap-1">
              {i > 0 && <span className="mr-1 opacity-30">·</span>}
              <span className={g.status === "pending" ? "opacity-40" : ""}>{g.name}</span>
              {g.status === "pending" && (
                <span className="rounded border border-white/10 px-1 py-px font-mono text-[0.55rem] uppercase tracking-wider opacity-50">
                  soon
                </span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
