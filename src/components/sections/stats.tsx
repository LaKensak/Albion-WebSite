"use client";

import { motion } from "framer-motion";
import { Shield, Gauge, Clock, Users } from "lucide-react";

const stats = [
  { icon: Shield, value: "0", label: "Detections", sub: "Since launch" },
  { icon: Gauge, value: "<1ms", label: "Latency", sub: "Render overhead" },
  { icon: Clock, value: "24/7", label: "Support", sub: "Discord" },
  { icon: Users, value: "500+", label: "Users", sub: "Active licenses" },
];

export function Stats() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass-card group rounded-2xl p-6 text-center"
          >
            <div className="icon-ring mx-auto h-10 w-10">
              <s.icon size={18} />
            </div>
            <p className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm font-medium text-fg">{s.label}</p>
            <p className="mt-0.5 text-xs text-fg-dim">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
