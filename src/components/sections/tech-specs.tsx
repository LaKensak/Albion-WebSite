"use client";

import { motion } from "framer-motion";
import { Shield, Gauge, Monitor, Clock, Layers, Wifi, Zap, Lock } from "lucide-react";

const specs = [
  { icon: Shield, label: "Fully External", desc: "Nothing injected into game memory" },
  { icon: Gauge, label: "Sub-ms Overhead", desc: "Zero impact on game performance" },
  { icon: Monitor, label: "Stream-safe", desc: "Invisible to screenshots and capture" },
  { icon: Clock, label: "Auto-update", desc: "Offset updates within hours of patches" },
  { icon: Layers, label: "Modular", desc: "Toggle each feature independently" },
  { icon: Wifi, label: "Low Bandwidth", desc: "Minimal network footprint" },
  { icon: Zap, label: "Instant Start", desc: "No dependencies, no runtime install" },
  { icon: Lock, label: "HWID Locked", desc: "One license per machine, no sharing" },
];

export function TechSpecs() {
  return (
    <section className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-h to-transparent" />
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-cyan">
            Tech
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Built different
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4">
          {specs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="glass-card group rounded-xl p-5"
            >
              <s.icon size={18} className="text-cyan" />
              <p className="mt-3 text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs text-fg-dim">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
