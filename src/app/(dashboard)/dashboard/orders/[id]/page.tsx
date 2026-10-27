export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { paymentRepo } from "@/server/repositories/payment";
import { plans, methods } from "@/config/plans";
import { submitPayment } from "@/server/actions/payment";
import { CopyButton } from "@/components/copy-button";
import { eur } from "@/lib/format";

const stepIndex = { PENDING: 0, SUBMITTED: 1, CONFIRMED: 2, REJECTED: 1 } as const;
const labels = ["Send payment", "Verification", "License delivered"];

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireAuth();
  const { id } = await params;
  const order = await paymentRepo.findById(id);
  if (!order || order.userId !== session.user.id) notFound();

  const m = methods[order.method];
  const plan = plans[order.plan];
  const step = stepIndex[order.status];
  const done = order.status === "CONFIRMED";

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Order #{order.id.slice(-8).toUpperCase()}</h1>
      <p className="mt-1 text-sm text-fg-soft">
        {plan.name} plan &middot; {eur(order.amount)}
        {order.discountPct > 0 && ` (-${order.discountPct}%)`} &middot; {m.label}
      </p>

      <ol className="mt-8 grid grid-cols-3 gap-2">
        {labels.map((l, i) => {
          const complete = done || i < step;
          return (
            <li key={l} className="text-center">
              <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${complete ? "bg-green-bg text-green" : i === step ? "bg-white/[0.09] text-fg" : "bg-white/[0.05] text-fg-dim"}`}>
                {complete ? <Check size={14} /> : i + 1}
              </div>
              <p className="mt-2 text-[0.7rem] text-fg-dim">{l}</p>
            </li>
          );
        })}
      </ol>

      {order.status === "PENDING" && (
        <div className="card mt-8 rounded-2xl p-7">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg-dim">1. Send exactly {eur(order.amount)}</p>
          <p className="mt-3 text-sm text-fg-soft">{m.hint}</p>
          <div className="mt-4 flex items-center gap-2">
            <code className="min-w-0 flex-1 break-all rounded-xl bg-black/30 p-4 font-mono text-xs">
              {m.address ?? "Payment address not configured yet. Contact support."}
            </code>
            {m.address && <CopyButton value={m.address} />}
          </div>

          <p className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg-dim">2. Paste your proof</p>
          <form action={submitPayment} className="mt-3 flex flex-col gap-3">
            <input type="hidden" name="id" value={order.id} />
            <input
              name="txRef"
              required
              minLength={6}
              placeholder={order.method === "PAYPAL" ? "PayPal transaction ID" : "Transaction hash"}
              className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 font-mono text-xs outline-none focus:border-white/[0.18]"
            />
            <button type="submit" className="btn-primary justify-center">I have paid</button>
          </form>
        </div>
      )}

      {order.status === "SUBMITTED" && (
        <div className="card mt-8 rounded-2xl p-7 text-sm text-fg-soft">
          <p className="flex items-center gap-2 font-semibold text-fg"><Clock size={16} className="text-amber-300" /> We are checking your payment</p>
          <p className="mt-2">Your license shows up in your dashboard as soon as it is confirmed.</p>
          <p className="mt-3 break-all font-mono text-xs text-fg-dim">{order.txRef}</p>
        </div>
      )}

      {done && (
        <div className="card mt-8 rounded-2xl p-7 text-sm">
          <p className="font-semibold text-green">Payment confirmed. Your license is ready.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/dashboard/licenses" className="btn-primary !px-5 !py-2.5 text-xs">See my license</Link>
            <Link href="/dashboard" className="btn-ghost !px-5 !py-2.5 text-xs">Back to dashboard</Link>
          </div>
        </div>
      )}

      {order.status === "REJECTED" && (
        <div className="card mt-8 rounded-2xl p-7 text-sm text-red">
          This payment was rejected. If you think this is a mistake, contact support with your order number.
        </div>
      )}
    </div>
  );
}
