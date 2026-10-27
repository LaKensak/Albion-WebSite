"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "0", label: "Detections", detail: "since launch" },
  { value: "<1ms", label: "Overhead", detail: "render latency" },
  { value: "500+", label: "Active users", detail: "verified licenses" },
  { value: "24/7", label: "Support", detail: "response via Discord" },
];

export function Stats() {
  return (
    <section className="px-6 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="divider" />
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`flex flex-col gap-1 px-8 py-10 ${i > 0 ? "border-l border-white/[0.06]" : ""}`}
            >
              <p className="font-display text-4xl font-extrabold tracking-[-0.03em] text-fg md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-fg">{s.label}</p>
              <p className="text-xs text-fg-dim">{s.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="divider" />
      </div>
    </section>
  );
}
