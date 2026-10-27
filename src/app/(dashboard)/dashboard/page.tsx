export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { licenseRepo } from "@/server/repositories/license";
import { Key, Clock, Shield } from "lucide-react";
import { Downloads } from "@/components/dashboard/downloads";

export default async function DashboardPage() {
  const session = await auth();
  const licenses = session?.user?.id
    ? await licenseRepo.findByUser(session.user.id)
    : [];

  const active = licenses.filter((l) => l.status === "ACTIVE");

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-fg-soft">
        Welcome back, {session?.user?.name}.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="glass-card rounded-xl p-6">
          <Key size={18} className="text-cyan" />
          <p className="mt-3 font-display text-2xl font-bold">{licenses.length}</p>
          <p className="text-sm text-fg-soft">Total Licenses</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <Shield size={18} className="text-green" />
          <p className="mt-3 font-display text-2xl font-bold">{active.length}</p>
          <p className="text-sm text-fg-soft">Active</p>
        </div>
        <div className="glass-card rounded-xl p-6">
          <Clock size={18} className="text-violet" />
          <p className="mt-3 font-display text-2xl font-bold">
            {active[0]?.expiresAt
              ? new Date(active[0].expiresAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-sm text-fg-soft">Next Expiry</p>
        </div>
      </div>

      <Downloads hasActiveLicense={active.length > 0} />

      <div className="mt-10">
        <h2 className="font-display text-lg font-bold">Your Licenses</h2>
        {licenses.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-white/[0.06] p-8 text-center text-sm text-fg-dim">
            No licenses yet. Purchase one on Discord to get started.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04] text-left text-xs text-fg-dim">
                  <th className="pb-3 font-medium">Key</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {licenses.map((l) => (
                  <tr key={l.id} className="border-b border-white/[0.03]">
                    <td className="py-3 font-mono text-xs">{l.key.slice(0, 8)}...</td>
                    <td className="py-3">{l.type}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          l.status === "ACTIVE"
                            ? "bg-green-bg text-green"
                            : "bg-red/10 text-red"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 text-fg-dim">
                      {l.expiresAt ? new Date(l.expiresAt).toLocaleDateString() : "Lifetime"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
