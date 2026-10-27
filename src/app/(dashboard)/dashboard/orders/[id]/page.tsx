export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/guards";
import { paymentRepo } from "@/server/repositories/payment";
import { plans, methods } from "@/config/plans";
import { submitPayment } from "@/server/actions/payment";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  const { id } = await params;
  const order = await paymentRepo.findById(id);
  if (!order || order.userId !== session.user.id) notFound();

  const m = methods[order.method];
  const plan = plans[order.plan];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-bold">Order {order.id.slice(-8).toUpperCase()}</h1>
      <p className="mt-1 text-sm text-fg-soft">{plan.name} &middot; &euro;{order.amount} &middot; {m.label}</p>

      {order.status === "PENDING" && (
        <div className="glass-card-strong mt-8 rounded-2xl p-7">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-cyan">1. Send payment</p>
          <p className="mt-3 text-sm text-fg-soft">{m.hint}</p>
          <p className="mt-4 break-all rounded-xl bg-black/30 p-4 font-mono text-xs">
            {m.address ?? "Payment address not configured yet. Contact support."}
          </p>
          <p className="mt-2 text-xs text-fg-dim">Amount: &euro;{order.amount}</p>

          <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-cyan">2. Confirm</p>
          <form action={submitPayment} className="mt-3 flex flex-col gap-3">
            <input type="hidden" name="id" value={order.id} />
            <input
              name="txRef"
              required
              minLength={6}
              placeholder={order.method === "PAYPAL" ? "PayPal transaction ID" : "Transaction hash"}
              className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 font-mono text-xs outline-none focus:border-cyan/40"
            />
            <button type="submit" className="btn-primary justify-center">I have paid</button>
          </form>
        </div>
      )}

      {order.status === "SUBMITTED" && (
        <div className="glass-card mt-8 rounded-2xl p-7 text-sm text-fg-soft">
          Payment submitted. We are verifying it, your license appears in your dashboard as soon as it is confirmed.
          <p className="mt-3 break-all font-mono text-xs text-fg-dim">{order.txRef}</p>
        </div>
      )}

      {order.status === "CONFIRMED" && (
        <div className="glass-card-strong mt-8 rounded-2xl p-7 text-sm">
          <p className="font-semibold text-green">Payment confirmed.</p>
          {order.license && <p className="mt-3 break-all rounded-xl bg-black/30 p-4 font-mono text-xs">{order.license.key}</p>}
          <Link href="/dashboard" className="btn-primary mt-6 inline-flex">Go to dashboard</Link>
        </div>
      )}

      {order.status === "REJECTED" && (
        <div className="glass-card mt-8 rounded-2xl p-7 text-sm text-red">
          Payment rejected. Contact support if you think this is a mistake.
        </div>
      )}
    </div>
  );
}
