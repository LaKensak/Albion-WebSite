"use client";

import { motion } from "framer-motion";
import { Download, Play, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Download,
    title: "Download",
    desc: "Get the package from your dashboard once your payment is confirmed.",
  },
  {
    num: "02",
    icon: Play,
    title: "Run the overlay",
    desc: "Launch it before starting your game. Auto-detection handles the binding.",
  },
  {
    num: "03",
    icon: SlidersHorizontal,
    title: "Configure",
    desc: "Toggle modules, adjust filters, set hotkeys. Config saves automatically.",
  },
];

export function Setup() {
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
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Setup</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Running in under 3 minutes.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.1 }}
              className="card card-hover group rounded-2xl p-7"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[0.65rem] font-bold text-fg-dim">{s.num}</span>
                <div className="icon-ring h-9 w-9">
                  <s.icon size={16} />
                </div>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
