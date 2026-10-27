export const dynamic = "force-dynamic";

import { licenseRepo } from "@/server/repositories/license";

export default async function AdminLicensesPage() {
  const { licenses } = await licenseRepo.findAll({ page: 1, perPage: 50 });

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Licenses</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04] text-left text-xs text-fg-dim">
              <th className="pb-3 font-medium">Key</th>
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Expires</th>
              <th className="pb-3 font-medium">HWID</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((l) => (
              <tr key={l.id} className="border-b border-white/[0.03]">
                <td className="py-3 font-mono text-xs">{l.key.slice(0, 12)}...</td>
                <td className="py-3 text-fg-soft">{(l as any).user?.name ?? "Unassigned"}</td>
                <td className="py-3">{l.type}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    l.status === "ACTIVE" ? "bg-green-bg text-green" :
                    l.status === "EXPIRED" ? "bg-white/[0.04] text-fg-dim" :
                    "bg-red/10 text-red"
                  }`}>
                    {l.status}
                  </span>
                </td>
                <td className="py-3 text-fg-dim">
                  {l.expiresAt ? new Date(l.expiresAt).toLocaleDateString() : "Lifetime"}
                </td>
                <td className="py-3 font-mono text-xs text-fg-dim">{l.hwid ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
