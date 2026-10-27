export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Receipt } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { paymentRepo } from "@/server/repositories/payment";
import { plans, methods } from "@/config/plans";
import { eur, fmtDate } from "@/lib/format";

const pill = {
  PENDING: "bg-white/[0.06] text-fg-soft",
  SUBMITTED: "bg-amber-400/15 text-amber-300",
  CONFIRMED: "bg-green-bg text-green",
  REJECTED: "bg-red/10 text-red",
} as const;

const hint = {
  PENDING: "Waiting for your payment",
  SUBMITTED: "We are verifying it",
  CONFIRMED: "Delivered",
  REJECTED: "Rejected",
} as const;

export default async function OrdersPage() {
  const session = await requireAuth();
  const orders = await paymentRepo.findByUser(session.user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Orders</h1>
        <p className="mt-1 text-sm text-fg-soft">Every payment you made, and what is still waiting.</p>
      </header>

      {orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <Receipt className="mx-auto text-cyan" size={26} />
          <p className="mt-4 text-sm text-fg-soft">No orders yet.</p>
          <Link href="/#pricing" className="btn-primary mt-6 inline-flex">See plans <ArrowRight size={14} /></Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((o) => (
            <li key={o.id}>
              <Link href={`/dashboard/orders/${o.id}`} className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
                <div>
                  <p className="font-display text-base font-bold">{plans[o.plan].name} plan</p>
                  <p className="mt-0.5 text-xs text-fg-dim">
                    #{o.id.slice(-8).toUpperCase()} &middot; {methods[o.method].label} &middot; {fmtDate(o.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-display font-bold">{eur(o.amount)}</p>
                    {o.discountPct > 0 && <p className="text-[0.7rem] text-green">-{o.discountPct}% applied</p>}
                  </div>
                  <div className="text-right">
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase ${pill[o.status]}`}>{o.status}</span>
                    <p className="mt-1 text-[0.7rem] text-fg-dim">{hint[o.status]}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
