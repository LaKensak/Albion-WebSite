export const dynamic = "force-dynamic";

import { userRepo } from "@/server/repositories/user";
import { licenseRepo } from "@/server/repositories/license";
import { contactRepo } from "@/server/repositories/contact";
import { confirmedRevenue } from "@/server/repositories/payment";
import { eur } from "@/lib/format";
import { Users, Key, MessageSquare, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [userCount, licenseCount, unreadMessages, revenue] = await Promise.all([
    userRepo.countAll(),
    licenseRepo.countActive(),
    contactRepo.countUnread(),
    confirmedRevenue(),
  ]);

  const cards = [
    { icon: Users, label: "Total Users", value: userCount, color: "text-cyan" },
    { icon: Key, label: "Active Licenses", value: licenseCount, color: "text-green" },
    { icon: MessageSquare, label: "Unread Messages", value: unreadMessages, color: "text-violet" },
    { icon: TrendingUp, label: "Revenue", value: eur(revenue), color: "text-cyan" },
  ];

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card rounded-xl p-6">
            <c.icon size={18} className={c.color} />
            <p className="mt-3 font-display text-2xl font-bold">{c.value}</p>
            <p className="text-sm text-fg-soft">{c.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
