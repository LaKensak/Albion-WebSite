"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { plans } from "@/config/plans";

const order = ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"] as const;

export function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-28">
      <div className="divider mx-auto max-w-5xl" />
      <div className="mx-auto mt-28 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent pricing.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-fg-soft">
            Crypto or PayPal. License delivered to your dashboard.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((key, i) => {
            const p = plans[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-7 ${
                  p.featured
                    ? "bg-bg-card border border-white/[0.18]"
                    : "card"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-bg-card px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-fg-soft">
                    Most popular
                  </span>
                )}

                <div>
                  <p className="font-display text-lg font-bold text-fg">{p.name}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-tight text-fg">
                      &euro;{p.price}
                    </span>
                    <span className="text-sm text-fg-dim">{p.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-fg-dim">
                    {key === "DAILY" ? "Try it for a session" : key === "WEEKLY" ? "Try it for a week" : key === "MONTHLY" ? "Best for active players" : "Pay once, keep forever"}
                  </p>
                </div>

                <ul className="mt-7 flex flex-col gap-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-fg-soft">
                      <Check size={14} className="mt-0.5 shrink-0 text-fg-soft" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/checkout?plan=${key}`}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
                    p.featured
                      ? "bg-white text-black hover:opacity-90"
                      : "border border-white/[0.1] bg-transparent text-fg hover:bg-white/[0.04]"
                  }`}
                >
                  Get {p.name}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
