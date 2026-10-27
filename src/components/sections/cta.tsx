"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Crosshair } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section className="site-container mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-lg bg-cyan p-8 text-[#17200e] md:p-14"
      >
        <div className="cta-rings" aria-hidden="true" />
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-[9px] tracking-widest">
            <Crosshair size={13} /> YOUR NEXT CHAPTER
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-[-.05em] md:text-5xl">
            Change your perspective.
          </h2>
          <p className="mt-4 text-xs text-[#334422]">
            Pick your game. Find your setup. See what&apos;s next.
          </p>
        </div>
        <Link
          href="/#pricing"
          className="relative inline-flex items-center justify-center gap-8 rounded-md bg-[#17200e] px-6 py-4 text-xs font-medium text-cyan transition-colors hover:bg-[#2a391e]"
        >
          Find your advantage <ArrowUpRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
