"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-cyan/[0.045] blur-[140px]"
          style={{ animation: "float 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[10%] right-[12%] h-[450px] w-[450px] rounded-full bg-violet/[0.06] blur-[120px]"
          style={{ animation: "float 18s ease-in-out infinite 3s" }}
        />
        <div
          className="absolute left-[55%] top-[40%] h-[300px] w-[300px] rounded-full bg-cyan/[0.025] blur-[100px]"
          style={{ animation: "float 12s ease-in-out infinite 6s" }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.75rem] font-medium text-fg-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            Undetected since launch
            <ChevronRight size={12} className="text-fg-dim" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 font-display text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl"
        >
          See everything.
          <br />
          <span
            className="bg-gradient-to-r from-cyan via-violet to-cyan bg-[length:200%_auto] bg-clip-text text-transparent"
            style={{ animation: "gradient-x 6s linear infinite" }}
          >
            Fear nothing.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-soft"
        >
          External radar overlay for Albion Online. ESP, combat assist, skin
          changer — fully undetected, always updated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="#pricing" className="btn-primary group">
            Get Access
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
          <Link href="#features" className="btn-ghost">
            See Features
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
