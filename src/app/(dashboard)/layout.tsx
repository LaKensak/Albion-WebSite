export const dynamic = "force-dynamic";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { signOutAction } from "@/server/actions/auth";
import { DashboardNav } from "@/components/dashboard/nav";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.1] bg-bg-card text-fg transition-opacity group-hover:opacity-90">
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

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAuth();
  const isAdmin = session.user.role === "ADMIN";
  const name = session.user.name ?? session.user.email ?? "Member";
  const initial = name[0]?.toUpperCase() ?? "?";

  return (
    <div className="min-h-screen md:flex">
      {/* ── Desktop sidebar ── */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/[0.06] bg-bg-raised md:flex">
        {/* Logo */}
        <div className="flex h-14 items-center border-b border-white/[0.06] px-4">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 pt-2">
          <p className="mb-1 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-fg-dim">Menu</p>
          <DashboardNav isAdmin={isAdmin} variant="side" />
        </div>

        {/* Bottom: user row */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] font-display text-[0.8125rem] font-bold text-fg-soft">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold leading-none text-fg">{name}</p>
              <p className="mt-0.5 truncate text-[0.7rem] text-fg-dim">{session.user.email}</p>
            </div>
            <form action={signOutAction}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-fg-dim transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <LogOut size={13} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-bg/90 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <form action={signOutAction}>
              <button
                type="submit"
                aria-label="Sign out"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-dim hover:bg-white/[0.06] hover:text-fg"
              >
                <LogOut size={14} />
              </button>
            </form>
          </div>
        </div>
        <DashboardNav isAdmin={isAdmin} variant="top" />
      </header>

      {/* ── Main content ── */}
      <main className="min-w-0 flex-1 bg-bg">
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
