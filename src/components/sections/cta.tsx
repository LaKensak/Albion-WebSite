"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Get started</p>
        <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-fg-soft">
          Pick a plan and get access within minutes.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="#pricing" className="btn-primary group text-base">
            Get Access
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link href="/register" className="btn-ghost text-base">
            Create account
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
