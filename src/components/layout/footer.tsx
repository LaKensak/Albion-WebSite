import Link from "next/link";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

const legal = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.03] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
          <span className="font-mono text-xs text-fg-dim">
            © {new Date().getFullYear()} Albion Radar
          </span>
        </div>
        <ul className="flex flex-wrap gap-6">
          {[...nav, ...legal].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-xs text-fg-dim transition-colors hover:text-fg-soft"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
