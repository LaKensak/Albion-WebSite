import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/layout/brand";

const groups = [
  {
    label: "Explore",
    links: [
      { label: "Games", href: "/games" },
      { label: "Features", href: "/#features" },
      { label: "Live preview", href: "/#showcase" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    label: "Your Vanta",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Create account", href: "/register" },
      { label: "Updates & guides", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    label: "The details",
    links: [
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-raised/40 pb-7 pt-14">
      <div className="site-container">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-5 max-w-[220px] text-[11px] leading-relaxed text-fg-dim">
              A different point of view.
              <br />
              Built for the games you live in.
            </p>
            <Link
              href="/games"
              className="mt-5 inline-flex items-center gap-1.5 text-[10px] text-cyan"
            >
              Find your world <ArrowUpRight size={12} />
            </Link>
          </div>
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-5 font-mono text-[9px] uppercase tracking-widest text-fg-dim">
                {group.label}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[11px] text-fg-soft transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 font-mono text-[8px] text-fg-dim">
          <p>© {new Date().getFullYear()} VANTA. ALL RIGHTS RESERVED.</p>
          <span className="flex items-center gap-2">
            <span className="status-dot !h-1 !w-1" /> AN INDEPENDENT
            PERSPECTIVE.
          </span>
          <span>NOT AFFILIATED WITH GAME DEVELOPERS.</span>
        </div>
      </div>
    </footer>
  );
}
