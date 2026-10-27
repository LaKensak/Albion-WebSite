"use client";

import { motion } from "framer-motion";
import { Download, Play, SlidersHorizontal } from "lucide-react";

const steps = [
  { icon: Download, title: "Download", desc: "Get the package from your dashboard once your payment is confirmed." },
  { icon: Play, title: "Play", desc: "Launch the overlay, then start Albion Online. Auto-detection handles the rest." },
  { icon: SlidersHorizontal, title: "Customize", desc: "Toggle modules, adjust filters, set hotkeys. Your config saves automatically." },
];

export function Setup() {
  return (
    <section className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-h to-transparent" />
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-cyan">
            Setup
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready in 3 minutes
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="glass-card group rounded-2xl p-7 text-center"
            >
              <div className="icon-ring mx-auto h-12 w-12">
                <s.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
