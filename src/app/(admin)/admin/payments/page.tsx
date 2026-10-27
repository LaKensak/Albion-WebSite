export const dynamic = "force-dynamic";

import { paymentRepo } from "@/server/repositories/payment";
import { confirmPayment, rejectPayment } from "@/server/actions/payment";

export default async function AdminPaymentsPage() {
  const payments = await paymentRepo.findByStatus(["SUBMITTED", "PENDING", "CONFIRMED", "REJECTED"]);

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Payments</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04] text-left text-xs text-fg-dim">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Plan</th>
              <th className="pb-3 font-medium">Method</th>
              <th className="pb-3 font-medium">Tx / ref</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b border-white/[0.03]">
                <td className="py-3">{p.user.name ?? p.user.email}</td>
                <td className="py-3">{p.plan} &middot; &euro;{p.amount}</td>
                <td className="py-3 text-fg-soft">{p.method}</td>
                <td className="max-w-[16rem] truncate py-3 font-mono text-xs text-fg-dim">{p.txRef ?? "—"}</td>
                <td className="py-3">{p.status}</td>
                <td className="py-3">
                  {p.status === "SUBMITTED" && (
                    <div className="flex gap-2">
                      <form action={confirmPayment}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="rounded-lg bg-green-bg px-3 py-1 text-xs font-medium text-green">Confirm</button>
                      </form>
                      <form action={rejectPayment}>
                        <input type="hidden" name="id" value={p.id} />
                        <button className="rounded-lg bg-red/10 px-3 py-1 text-xs font-medium text-red">Reject</button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
