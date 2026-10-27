"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is it detected?",
    a: "Fully external. Nothing runs inside the game process. Zero confirmed bans since launch. The overlay is invisible to screenshots and screen capture.",
  },
  {
    q: "How do I receive it?",
    a: "Once your payment is confirmed, your license and the download appear in your dashboard. The package includes everything you need plus a step-by-step setup guide. No extra dependencies required.",
  },
  {
    q: "Does it work on Windows 11?",
    a: "Yes. Both Windows 10 and 11 are fully supported. The setup guide gets you running in under 3 minutes.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Crypto (BTC, ETH, USDT, LTC) and PayPal Friends & Family. You check out on the site, send the payment, submit the transaction ID, and your license is activated after verification.",
  },
  {
    q: "What if a game update breaks it?",
    a: "Offsets are updated within hours of a patch. Your license stays active during downtime. The overlay warns you automatically if an update is needed.",
  },
  {
    q: "Can I use only some modules?",
    a: "Yes. Every module is independent. Toggle what you want via the settings menu. Each feature is optional and configured separately from the others.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-6 py-28">
      <div className="divider mx-auto max-w-3xl" />
      <div className="mx-auto mt-28 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-fg-dim">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Common questions.
          </h2>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/[0.06]">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-[0.9375rem] font-semibold text-fg transition-colors hover:text-fg-soft"
                >
                  {f.q}
                  <Plus
                    size={18}
                    className={`shrink-0 text-fg-dim transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-fg-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
