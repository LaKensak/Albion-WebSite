"use client";

import { motion } from "framer-motion";
import { Crosshair, Swords, Palette, Eye, Camera, MapPin } from "lucide-react";

const features = [
  {
    icon: Crosshair,
    title: "ESP Overlay",
    desc: "Players, mobs, resources, dungeons rendered on an external overlay. Names, health bars, distances. Filter anything.",
    span: "md:col-span-2",
  },
  {
    icon: Swords,
    title: "Combat Assist",
    desc: "Auto-combo, ability timers, cooldown tracking. Configurable aggression per weapon type.",
    span: "md:col-span-2",
  },
  {
    icon: Palette,
    title: "Skin Changer",
    desc: "Swap any gear appearance client-side. Preview skins before buying on the marketplace.",
    span: "",
  },
  {
    icon: Eye,
    title: "Radar",
    desc: "Minimap overlay with real-time player positions. Custom range, icon sizing, threat colors.",
    span: "",
  },
  {
    icon: Camera,
    title: "Free Camera",
    desc: "First and third person camera unlock. Full orbit, zoom, tilt control.",
    span: "",
  },
  {
    icon: MapPin,
    title: "Gatherer Mode",
    desc: "Highlight rare resources and enchanted nodes with distance markers and respawn timers.",
    span: "",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-6 py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-border-h to-transparent" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-cyan">
            Features
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to dominate
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`glass-card group rounded-2xl p-7 ${f.span}`}
            >
              <div className="icon-ring h-11 w-11">
                <f.icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-soft">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
