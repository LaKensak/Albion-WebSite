"use client";

import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { plans } from "@/config/plans";

const order = ["WEEKLY", "MONTHLY", "LIFETIME"] as const;

export function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-h to-transparent" />
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-cyan">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Pick your plan</h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {order.map((key, i) => {
            const p = plans[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 ${p.featured ? "glass-card-strong" : "glass-card"}`}
              >
                {p.featured && (
                  <div className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-cyan/10 px-3 py-1 text-[0.65rem] font-bold text-cyan">
                    <Crown size={12} /> Popular
                  </div>
                )}
                <p className="font-display text-lg font-bold">{p.name}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-extrabold tracking-tight">&euro;{p.price}</span>
                  <span className="text-sm text-fg-dim">{p.period}</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-fg-soft">
                      <span className="h-1 w-1 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plan=${key}`}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition ${
                    p.featured
                      ? "bg-cyan text-black hover:shadow-[0_0_32px_rgba(34,211,238,0.3)]"
                      : "bg-white/[0.04] text-fg hover:bg-white/[0.07]"
                  }`}
                >
                  Buy now
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md rounded-2xl bg-violet/[0.06] p-5 text-center"
        >
          <p className="text-sm text-fg-soft">
            Pay directly on the site with <span className="font-semibold text-violet">Crypto or PayPal</span>.
            Your license is delivered to your dashboard.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
