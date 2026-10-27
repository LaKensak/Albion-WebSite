"use client";

import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { RadarPreview } from "@/components/sections/radar-preview";

export function Showcase() {
  return (
    <section id="showcase" className="site-container section-space">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-label">Don&apos;t just take our word for it</p>
          <h2 className="section-title">A new point of view.</h2>
          <p className="mt-4 max-w-lg text-xs leading-relaxed text-fg-soft">
            Switch games. Toggle a module. Adjust your range. Get a feel for
            your next setup, right here.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-[9px] text-fg-dim">
          <MousePointer2 size={12} className="text-cyan" /> INTERACTIVE PREVIEW
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.7 }}
      >
        <RadarPreview />
      </motion.div>
      <p className="mt-4 text-center text-[9px] leading-relaxed text-fg-dim">
        Illustrative simulation with sample data and game artwork. Available
        modules depend on the game.
      </p>
    </section>
  );
}
