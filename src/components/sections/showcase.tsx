"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { title: "ESP Overlay", alt: "ESP overlay screenshot" },
  { title: "Radar View", alt: "Radar minimap screenshot" },
  { title: "Combat HUD", alt: "Combat assist screenshot" },
  { title: "Settings Panel", alt: "Settings panel screenshot" },
  { title: "Skin Changer", alt: "Skin changer screenshot" },
];

export function Showcase() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <section id="showcase" className="relative px-6 py-28">
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
            Showcase
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            See it in action
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <div className="glass-card-strong overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-white/[0.04] px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green/60" />
              <span className="ml-3 font-mono text-[0.65rem] text-fg-dim">
                Albion Radar · {slides[idx].title}
              </span>
            </div>
            <div className="relative aspect-video bg-bg-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-cyan/[0.08] p-4">
                      <div className="h-full w-full rounded-lg bg-cyan/20" />
                    </div>
                    <p className="font-display text-sm font-semibold text-fg-soft">
                      {slides[idx].title}
                    </p>
                    <p className="mt-1 text-xs text-fg-dim">Screenshot placeholder</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-bg-card/80 p-2 text-fg-soft backdrop-blur transition hover:text-fg"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-bg-card/80 p-2 text-fg-soft backdrop-blur transition hover:text-fg"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-6 bg-cyan" : "w-1.5 bg-fg-dim/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
