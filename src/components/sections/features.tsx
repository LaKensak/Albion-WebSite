"use client";

import { motion } from "framer-motion";
import { Layers, ShieldOff, RefreshCw, Lock } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-game platform",
    desc: "Each supported game has its own dedicated overlay. Buy only what you play.",
  },
  {
    icon: ShieldOff,
    title: "External process",
    desc: "Nothing runs inside the game. The overlay draws on a separate window, leaving zero trace in memory.",
  },
  {
    icon: RefreshCw,
    title: "Same-day updates",
    desc: "Patch dropped? We push an update within hours. Your overlay keeps working when others go dark.",
  },
  {
    icon: Lock,
    title: "Private by design",
    desc: "No usage logs, no telemetry. Your hardware ID is only used once for license binding.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="divider mx-auto max-w-5xl" />

      <div className="mx-auto mt-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Platform</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.02em]">
            Built differently.
          </h2>
        </motion.div>

        <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--color-border)" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="group flex flex-col gap-4 bg-bg p-8 transition-colors hover:bg-bg-raised"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-bg-card text-fg-soft transition-colors group-hover:border-white/[0.12] group-hover:text-fg">
                <f.icon size={16} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-soft">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
