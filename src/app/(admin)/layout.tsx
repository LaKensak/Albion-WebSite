import Link from "next/link";
import { requireAdmin } from "@/lib/auth/guards";
import {
  LayoutDashboard,
  Users,
  Key,
  CreditCard,
  FileText,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Licenses", href: "/admin/licenses", icon: Key },
  { label: "Blog Posts", href: "/admin/posts", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-violet/10 bg-bg-raised md:block">
        <div className="flex h-16 items-center gap-2.5 px-6">
          <span className="h-2 w-2 rounded-full bg-violet shadow-[0_0_8px_rgba(124,77,255,0.5)]" />
          <span className="font-display text-sm font-bold">Admin</span>
        </div>
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-violet/[0.06] hover:text-fg"
            >
              <n.icon size={16} />
              {n.label}
            </Link>
          ))}
          <div className="my-3 h-px bg-white/[0.04]" />
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-fg-dim transition-colors hover:text-fg-soft"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
