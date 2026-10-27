"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is it detected?",
    a: "Fully external — nothing runs inside the game process. Zero confirmed bans since launch. The overlay is invisible to screenshots and screen capture.",
  },
  {
    q: "How do I receive it?",
    a: "Once your payment is confirmed, your license and the download appear in your dashboard. Package includes everything you need plus a step-by-step setup guide. No extra dependencies required.",
  },
  {
    q: "Does it work on Windows 11?",
    a: "Yes. Both Windows 10 and 11 are fully supported. The setup guide covers everything — running in under 3 minutes.",
  },
  {
    q: "Payment methods?",
    a: "Crypto (BTC, ETH, USDT, LTC) and PayPal Friends & Family. You check out on the site, send the payment, submit the transaction ID, and your license is activated after verification.",
  },
  {
    q: "What if a game update breaks it?",
    a: "Offsets are updated within hours of a patch. Your license stays active during downtime. The overlay warns you automatically if an update is needed.",
  },
  {
    q: "Can I use combat assist without ESP?",
    a: "Yes. Every module is independent. Toggle whatever you want via the settings menu (Insert key). ESP, radar, combat assist, skin changer — all optional and separately configurable.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-h to-transparent" />
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-cyan">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Common questions
          </h2>
        </motion.div>

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={`overflow-hidden rounded-2xl transition-all duration-300 ${
                  isOpen ? "glass-card-strong" : "glass-card"
                }`}
                style={isOpen ? {} : { transform: "none" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[0.9375rem] font-semibold text-fg transition-colors hover:text-cyan"
                >
                  {f.q}
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-fg-dim transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-sm leading-relaxed text-fg-soft">{f.a}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
