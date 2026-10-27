"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Games",    href: "/games"    },
  { label: "FAQ",      href: "#faq"      },
  { label: "Blog",     href: "/blog"     },
];

function NavLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-bg-card text-fg transition-colors group-hover:border-white/[0.18]">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="2.5" fill="currentColor" />
          <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <line x1="7.5" y1="1" x2="7.5" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7.5" y1="11.5" x2="7.5" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="1" y1="7.5" x2="3.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11.5" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-sm font-bold tracking-tight">Ghost Overlay</span>
    </Link>
  );
}

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? "border-b border-white/[0.06] bg-bg/80 backdrop-blur-xl" : "bg-transparent"
    }`}>
      <nav className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-6">
        <NavLogo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-lg px-3 py-2 text-[0.8125rem] text-fg-soft transition-colors hover:bg-white/[0.04] hover:text-fg"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-lg px-4 py-2 text-xs font-medium text-fg-soft transition-colors hover:text-fg">
            Sign in
          </Link>
          <Link href="#pricing" className="btn-primary !py-2 !px-5 !text-xs">
            Get Access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-fg-soft transition-colors hover:bg-white/[0.04] hover:text-fg md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-bg/95 px-6 pb-6 pt-3 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-4">
            <Link href="/login" className="btn-ghost justify-center !text-xs">Sign in</Link>
            <Link href="#pricing" className="btn-primary justify-center !text-xs">Get Access</Link>
          </div>
        </div>
      )}
    </header>
  );
}
