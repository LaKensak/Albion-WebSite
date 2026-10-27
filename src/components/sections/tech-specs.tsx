"use client";

import { motion } from "framer-motion";
import { Shield, Gauge, Monitor, Clock, Layers, Wifi, Zap, Lock } from "lucide-react";

const specs = [
  { icon: Shield, label: "Fully external", desc: "Nothing injected into the game process" },
  { icon: Gauge, label: "Sub-ms overhead", desc: "Zero impact on game performance" },
  { icon: Monitor, label: "Stream-safe", desc: "Invisible to screenshots and capture" },
  { icon: Clock, label: "Auto-update", desc: "Offset updates within hours of patches" },
  { icon: Layers, label: "Modular", desc: "Toggle each feature independently" },
  { icon: Wifi, label: "Low bandwidth", desc: "Minimal network footprint" },
  { icon: Zap, label: "Instant start", desc: "No dependencies, no runtime install" },
  { icon: Lock, label: "HWID locked", desc: "One license per machine" },
];

export function TechSpecs() {
  return (
    <section className="relative px-6 py-28">
      <div className="divider mx-auto max-w-5xl" />
      <div className="mx-auto mt-28 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Architecture</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Built to be invisible.
          </h2>
          <p className="mt-3 max-w-md text-fg-soft">
            Every design choice trades exposure for performance and safety.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="card card-hover group rounded-xl p-5"
            >
              <s.icon size={17} className="text-fg-soft" />
              <p className="mt-3.5 text-sm font-semibold text-fg">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-fg-dim">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
