"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  KeyRound,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { plans } from "@/config/plans";

const order = ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"] as const;
const descriptions = {
  DAILY: "One session. A whole new view.",
  WEEKLY: "Make your next week count.",
  MONTHLY: "For the games you live in.",
  LIFETIME: "Your perspective. For the long run.",
};

export function Pricing() {
  return (
    <section id="pricing" className="site-container section-space">
      <div className="mb-12 text-center">
        <p className="section-label justify-center">Your next move</p>
        <h2 className="section-title">A better view. A simple choice.</h2>
        <p className="mt-4 text-xs text-fg-soft">
          Same powerful modules. Choose how long you stay.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((key, i) => {
          const plan = plans[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`relative flex flex-col overflow-hidden rounded-lg border p-6 pt-10 ${plan.featured ? "border-cyan/60 bg-[#192213]" : "border-border bg-bg-card"}`}
            >
              {plan.featured && (
                <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-1.5 bg-cyan py-1.5 font-mono text-[8px] font-semibold tracking-wider text-bg">
                  <Sparkles size={9} /> THE COMMUNITY PICK
                </div>
              )}
              <p className="font-display text-lg font-medium">{plan.name}</p>
              <p className="mt-2 text-[9px] text-fg-dim">{descriptions[key]}</p>
              <div className="mt-7 flex items-baseline gap-1">
                <span className="font-display text-[46px] font-medium leading-none tracking-[-.06em]">
                  €{plan.price}
                </span>
                <span className="text-[10px] text-fg-dim">{plan.period}</span>
              </div>
              <div className="my-6 h-px bg-border" />
              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-[10px] text-fg-soft"
                  >
                    <Check size={12} className="shrink-0 text-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={`/checkout?plan=${key}`}
                className={
                  plan.featured
                    ? "btn-primary !px-3 !text-[10px]"
                    : "btn-ghost !px-3 !text-[10px]"
                }
              >
                Get {plan.name.toLowerCase()} access <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[9px] text-fg-dim">
        <span className="flex items-center gap-1.5">
          <CreditCard size={12} /> Crypto & PayPal
        </span>
        <span className="flex items-center gap-1.5">
          <KeyRound size={12} /> Delivered after payment confirmation
        </span>
        <span className="flex items-center gap-1.5">
          <LockKeyhole size={12} /> No automatic renewal
        </span>
      </div>
    </section>
  );
}
