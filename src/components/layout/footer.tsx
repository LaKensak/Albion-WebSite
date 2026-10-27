import Link from "next/link";

const product = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Rewards",  href: "#rewards"  },
  { label: "Blog",     href: "/blog"     },
];

const support = [
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

const legal = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 pt-14 pb-10">
      <div className="mx-auto max-w-6xl">
        {/* Top row */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/[0.1] bg-bg-card text-fg">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="3" fill="currentColor" />
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
              <span className="font-display text-sm font-bold tracking-tight">Ghost Overlay</span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-fg-dim">
              External overlays for competitive players. Fully external, always updated.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-dim">Product</p>
            <ul className="flex flex-col gap-3">
              {product.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-fg-soft transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-dim">Support</p>
            <ul className="flex flex-col gap-3">
              {support.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-fg-soft transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-dim">Legal</p>
            <ul className="flex flex-col gap-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-fg-soft transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-fg-dim">&copy; {new Date().getFullYear()} Ghost Overlay. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="text-xs text-fg-dim">Undetected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
