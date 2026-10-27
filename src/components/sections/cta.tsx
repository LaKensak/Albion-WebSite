"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[10%] h-[400px] w-[400px] rounded-full bg-cyan/[0.04] blur-[130px]" />
        <div className="absolute bottom-[5%] right-[10%] h-[350px] w-[350px] rounded-full bg-violet/[0.06] blur-[110px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Ready to see{" "}
          <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
            everything
          </span>
          ?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-fg-soft">
          Pick your plan, pay, and get full access within minutes.
        </p>
        <div className="mt-10">
          <Link href="#pricing" className="btn-primary group">
            Get Access Now
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
