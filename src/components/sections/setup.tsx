"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  KeyRound,
  SlidersHorizontal,
} from "lucide-react";

const steps = [
  {
    num: "01",
    icon: KeyRound,
    title: "Make it yours.",
    desc: "Choose your plan and complete your payment. Your license appears in your dashboard after confirmation.",
  },
  {
    num: "02",
    icon: Download,
    title: "Ready when you are.",
    desc: "Download your package and follow the included setup guide. Launch Vanta alongside your game.",
  },
  {
    num: "03",
    icon: SlidersHorizontal,
    title: "Find your perspective.",
    desc: "Choose your modules, adjust your filters and set your hotkeys. Your configuration, your way.",
  },
];

export function Setup() {
  return (
    <section className="section-space border-y border-border bg-bg-raised/40">
      <div className="site-container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-label">Less setup. More play.</p>
            <h2 className="section-title">Three steps. You&apos;re in.</h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-fg-soft">
            From your first key to your first session.
            <br />
            Everything you need is in your dashboard.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative border-t border-border pt-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-cyan">
                  / {step.num}
                </span>
                <step.icon
                  size={20}
                  strokeWidth={1.5}
                  className="text-fg-dim"
                />
              </div>
              <h3 className="mt-8 font-display text-xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-[11px] leading-[1.9] text-fg-soft">
                {step.desc}
              </p>
              {i < 2 && (
                <ArrowRight
                  size={17}
                  className="absolute -right-6 top-7 hidden text-cyan/40 md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
