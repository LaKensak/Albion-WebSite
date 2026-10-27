export const dynamic = "force-dynamic";

import Link from "next/link";
import { Brand } from "@/components/layout/brand";
import { LogOut } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { signOutAction } from "@/server/actions/auth";
import { DashboardNav } from "@/components/dashboard/nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth();
  const isAdmin = session.user.role === "ADMIN";
  const name = session.user.name ?? session.user.email ?? "Member";
  const initial = name[0]?.toUpperCase() ?? "?";

  return (
    <div className="min-h-screen md:flex">
      {/* ── Desktop sidebar ── */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/[0.06] bg-bg-raised md:flex">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-border px-6">
          <Brand />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pt-7">
          <p className="mb-1 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-fg-dim">
            Your workspace
          </p>
          <DashboardNav isAdmin={isAdmin} variant="side" />
        </div>

        {/* Bottom: user row */}
        <div className="border-t border-white/[0.06] px-3 py-4">
          <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan/10 font-display text-[0.8125rem] font-bold text-fg-soft">
              {initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.8125rem] font-semibold leading-none text-fg">
                {name}
              </p>
              <p className="mt-0.5 truncate text-[0.7rem] text-fg-dim">
                {session.user.email}
              </p>
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
          <Brand />
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
        <div className="hidden h-20 items-center justify-between border-b border-border px-8 md:flex">
          <p className="font-mono text-[9px] tracking-widest text-fg-dim">
            <span className="text-cyan">VANTA</span> / YOUR PERSPECTIVE
          </p>
          <Link href="/games" className="text-xs text-fg-soft hover:text-cyan">
            Explore games ↗
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
