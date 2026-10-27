import { Cpu, HardDrive, Layers3, Monitor } from "lucide-react";

const specs = [
  { icon: Monitor, label: "Windows 10 & 11", desc: "64-bit operating system" },
  { icon: Cpu, label: "Intel & AMD", desc: "Support for both platforms" },
  {
    icon: Layers3,
    label: "External overlay",
    desc: "A separate game companion",
  },
  {
    icon: HardDrive,
    label: "Direct download",
    desc: "Available in your dashboard",
  },
];

export function TechSpecs() {
  return (
    <section
      aria-label="System requirements"
      className="site-container grid grid-cols-2 gap-6 border-b border-border py-9 md:grid-cols-4"
    >
      {specs.map((spec) => (
        <div key={spec.label} className="flex items-center gap-3">
          <spec.icon
            size={19}
            strokeWidth={1.5}
            className="shrink-0 text-fg-dim"
          />
          <div>
            <p className="text-[10px] font-medium text-fg-soft">{spec.label}</p>
            <p className="mt-1 text-[9px] text-fg-dim">{spec.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
