"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { RadarPreview } from "@/components/sections/radar-preview";

export function Hero() {
  return (
    <section className="hero-section pb-16 md:pb-20">
      <div className="site-container relative">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-cyan/5 px-3 py-1.5 font-mono text-[9px] tracking-wide text-cyan">
              <span className="status-dot" /> A DIFFERENT POINT OF VIEW
            </p>
            <h1 className="hero-heading">
              See beyond.
              <br />
              Play <span className="text-cyan">ahead.</span>
            </h1>
            <p className="mt-6 max-w-sm text-[13px] leading-[1.9] text-fg-soft">
              Your next move starts with a better view. Powerful ESP, radar and
              real-time insights for the games you live in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#pricing" className="btn-primary group">
                Find your advantage{" "}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link href="/#showcase" className="btn-ghost">
                <span className="grid h-4 w-4 place-items-center rounded-full border border-fg-soft">
                  <span className="ml-px text-[7px]">▶</span>
                </span>{" "}
                Explore the preview
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[9px] text-fg-dim">
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-cyan" /> External by design
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-cyan" /> Configurable modules
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={11} className="text-cyan" /> Windows 10 / 11
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="min-w-0"
          >
            <div className="mb-3 flex items-center justify-between font-mono text-[8px] tracking-widest text-fg-dim">
              <span>THE VANTA PERSPECTIVE</span>
              <span className="text-cyan">[ TRY IT YOURSELF ]</span>
            </div>
            <div className="hero-demo">
              <RadarPreview />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 text-[9px] text-fg-dim">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-cyan" /> Separate
                process. Complete control.
              </span>
              <Link
                href="/#showcase"
                className="flex items-center gap-1 text-fg-soft hover:text-cyan"
              >
                Full preview <ArrowUpRight size={11} />
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="mt-14 flex items-center justify-between border-t border-border pt-5 font-mono text-[8px] tracking-[.14em] text-fg-dim md:mt-20">
          <span>BUILT FOR THE WAY YOU PLAY</span>
          <Link
            href="/#games"
            className="flex items-center gap-2 hover:text-cyan"
          >
            SCROLL TO EXPLORE <ArrowDown size={11} />
          </Link>
        </div>
      </div>
    </section>
  );
}
