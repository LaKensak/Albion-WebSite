"use client";

import { motion } from "framer-motion";
import { Gift, Check } from "lucide-react";
import { referral, tiers } from "@/config/loyalty";
import { tierStyle } from "@/components/dashboard/tier-badge";

export function Loyalty() {
  return (
    <section id="rewards" className="relative px-6 py-28">
      <div className="divider mx-auto max-w-5xl" />
      <div className="mx-auto mt-28 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">Rewards</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            The longer you stay, the less you pay.
          </h2>
          <p className="mt-3 max-w-md text-fg-soft">
            Every order moves your tier up. Discounts apply automatically on every future purchase.
          </p>
        </motion.div>

        {/* Tier cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <motion.div
              key={t.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="card rounded-2xl p-6"
            >
              <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${tierStyle[t.key].badge}`}>
                {t.name}
              </span>
              <p className="mt-5 font-display text-3xl font-extrabold text-fg">
                {t.discount > 0 ? `-${t.discount}%` : "Base"}
              </p>
              <p className="mt-1 text-xs text-fg-dim">
                {t.minSpend === 0 ? "From your first order" : `After €${t.minSpend} spent`}
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-fg-soft">
                    <Check size={12} className="mt-0.5 shrink-0 text-fg-soft" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Referral callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-4 flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-bg-card p-5"
        >
          <Gift className="mt-0.5 shrink-0 text-fg-soft" size={20} />
          <p className="text-sm text-fg-soft">
            <span className="font-semibold text-fg">Refer a friend.</span>{" "}
            They get {referral.referredDiscount}% off their first order. You get {referral.referrerBonusDays} free days once they buy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
