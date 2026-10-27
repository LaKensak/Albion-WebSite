"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/[0.03]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="font-display text-sm font-bold tracking-tight">
            Albion Radar
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-[0.8125rem] text-fg-soft transition-colors hover:text-fg"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan transition-all group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="btn-ghost !px-5 !py-2.5 text-xs">
            Sign in
          </Link>
          <Link href="#pricing" className="btn-primary !px-5 !py-2.5 text-xs">
            Get Access
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-fg-soft md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-white/[0.03] px-6 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-fg-soft transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/login" className="btn-ghost justify-center text-xs">
              Sign in
            </Link>
            <Link href="#pricing" className="btn-primary justify-center text-xs">
              Get Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
