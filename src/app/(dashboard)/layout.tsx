import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Key, Settings, LogOut, Shield } from "lucide-react";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Licenses", href: "/dashboard/licenses", icon: Key },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = session.user?.role === "ADMIN";

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-white/[0.04] bg-bg-raised md:block">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="font-display text-sm font-bold">Albion Radar</span>
        </div>
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-white/[0.04] hover:text-fg"
            >
              <n.icon size={16} />
              {n.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-violet transition-colors hover:bg-violet/[0.06]"
            >
              <Shield size={16} />
              Admin Panel
            </Link>
          )}
        </nav>
        <div className="mt-auto border-t border-white/[0.04] p-4">
          <div className="flex items-center gap-3">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{session.user?.name}</p>
              <p className="truncate text-xs text-fg-dim">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
