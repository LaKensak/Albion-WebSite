"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/layout/brand";
import { marketingNav } from "@/config/navigation";

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div className="border-b border-border bg-[#12190e] px-4 py-2 text-center font-mono text-[9px] tracking-wide text-fg-soft">
        <span className="mr-2 text-cyan">●</span> ALBION ONLINE & RUST{" "}
        <span className="mx-2 text-white/20">/</span> AVAILABLE NOW
      </div>
      <nav
        aria-label="Main navigation"
        className="site-container flex h-[72px] items-center justify-between gap-4"
      >
        <Brand />
        <ul className="hidden items-center gap-7 lg:flex">
          {marketingNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="text-[11px] text-fg-soft transition-colors hover:text-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto hidden items-center gap-6 md:flex lg:ml-0">
          <Link
            href="/login"
            className="text-[11px] text-fg-soft hover:text-fg"
          >
            Sign in
          </Link>
          <Link
            href="/#pricing"
            className="btn-primary !min-h-9 !px-4 !py-2 !text-[10px]"
          >
            Get access <ArrowUpRight size={13} />
          </Link>
        </div>
        <button
          ref={toggle}
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="grid h-11 w-11 place-items-center rounded-md border border-border text-fg-soft lg:hidden"
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-bg-raised p-5 lg:hidden"
        >
          <ul className="site-container flex flex-col gap-1">
            {marketingNav.map((link) => (
              <li key={link.href}>
                <Link
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="block rounded-md px-3 py-3 text-sm text-fg-soft hover:bg-white/5 hover:text-cyan"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 grid grid-cols-2 gap-3">
              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="btn-ghost"
              >
                Sign in
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/#pricing"
                className="btn-primary"
              >
                Get access <ArrowUpRight size={14} />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
