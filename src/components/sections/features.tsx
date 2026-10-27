"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Crosshair,
  Fingerprint,
  Layers3,
  RefreshCw,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Settings2,
    title: "Your setup. Your rules.",
    desc: "Fine-tune your range, filters, colours and hotkeys. Keep the information you need. Clear the rest.",
  },
  {
    icon: RefreshCw,
    title: "Evolving with your game.",
    desc: "Get new builds and game compatibility updates directly from your dashboard.",
  },
  {
    icon: Fingerprint,
    title: "One key. Your machine.",
    desc: "Manage your license and hardware binding from one place, with clear access to your account.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="section-space border-y border-border bg-bg-raised/40"
    >
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-label">More awareness. Less noise.</p>
            <h2 className="section-title">
              Everything you need.
              <br />
              <span className="text-fg-dim">Nothing in your way.</span>
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-fg-soft">
            Purpose-built modules. A clean overlay. The information that
            matters, right when it matters.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card relative overflow-hidden rounded-lg p-7 md:p-9"
          >
            <div className="absolute -right-5 top-5 opacity-70">
              <div className="feature-orbit">
                <Crosshair size={28} strokeWidth={1} />
              </div>
            </div>
            <span className="font-mono text-[9px] tracking-widest text-cyan">
              01 / AWARENESS
            </span>
            <h3 className="relative mt-20 font-display text-2xl font-medium tracking-tight">
              A bigger picture.
            </h3>
            <p className="relative mt-3 max-w-xs text-xs leading-[1.9] text-fg-soft">
              Players, resources and points of interest. See the details around
              you in a single, readable view.
            </p>
            <Link
              href="/#showcase"
              className="mt-6 inline-flex items-center gap-2 text-[10px] text-cyan"
            >
              Explore the overlay <ArrowUpRight size={12} />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card relative overflow-hidden rounded-lg p-7 md:p-9"
          >
            <div className="absolute right-9 top-10 grid h-24 w-24 place-items-center rounded-2xl border border-cyan/20 bg-cyan/5 rotate-12">
              <ShieldCheck
                size={44}
                strokeWidth={1}
                className="text-cyan/70 -rotate-12"
              />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-cyan">
              02 / ARCHITECTURE
            </span>
            <h3 className="relative mt-20 font-display text-2xl font-medium tracking-tight">
              Alongside your game.
            </h3>
            <p className="relative mt-3 max-w-xs text-xs leading-[1.9] text-fg-soft">
              An external process and a separate overlay. Designed to run
              alongside your game, with no changes to game files.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-[10px] text-fg-dim">
              <Layers3 size={12} /> Independent by design
            </span>
          </motion.div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group rounded-lg border border-border p-6 transition-colors hover:border-cyan/25"
            >
              <feature.icon size={20} strokeWidth={1.5} className="text-cyan" />
              <h3 className="mt-5 font-display text-base font-medium">
                {feature.title}
              </h3>
              <p className="mt-2 text-[11px] leading-[1.9] text-fg-soft">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
