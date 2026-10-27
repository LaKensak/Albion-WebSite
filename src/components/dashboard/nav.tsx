"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, KeyRound, Receipt, Layers, Settings, Newspaper, Shield } from "lucide-react";

const items = [
  { label: "Overview",  href: "/dashboard",           icon: LayoutDashboard, exact: true  },
  { label: "License",   href: "/dashboard/licenses",  icon: KeyRound,        exact: false },
  { label: "Orders",    href: "/dashboard/orders",    icon: Receipt,         exact: false },
  { label: "Games",     href: "/dashboard/games",     icon: Layers,          exact: false },
  { label: "Settings",  href: "/dashboard/settings",  icon: Settings,        exact: false },
  { label: "Updates",   href: "/blog",                icon: Newspaper,       exact: false },
];

export function DashboardNav({ isAdmin, variant }: { isAdmin: boolean; variant: "side" | "top" }) {
  const pathname = usePathname();
  const all = isAdmin ? [...items, { label: "Admin", href: "/admin", icon: Shield, exact: false }] : items;

  if (variant === "top") {
    return (
      <nav className="flex gap-0.5 overflow-x-auto px-3 pb-2 pt-1">
        {all.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-[0.8125rem] font-medium transition-colors ${
                active ? "bg-white/[0.09] text-fg" : "text-fg-dim hover:bg-white/[0.04] hover:text-fg-soft"
              }`}
            >
              <n.icon size={14} />
              {n.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-0.5 py-1">
      {all.map((n) => {
        const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.8125rem] transition-all ${
              active
                ? "bg-white/[0.09] font-semibold text-fg"
                : "font-medium text-fg-dim hover:bg-white/[0.04] hover:text-fg-soft"
            }`}
          >
            {active && (
              <span className="absolute left-1.5 top-1/2 h-[18px] w-[2.5px] -translate-y-1/2 rounded-full bg-white/50" />
            )}
            <n.icon
              size={15}
              className={`shrink-0 transition-colors ${active ? "text-fg" : "text-fg-dim group-hover:text-fg-soft"}`}
            />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
