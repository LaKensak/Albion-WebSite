export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/guards";
import { plans, methods, checkoutMethods } from "@/config/plans";
import { createOrder } from "@/server/actions/payment";
import { eur } from "@/lib/format";

const order = ["DAILY", "WEEKLY", "MONTHLY", "LIFETIME"] as const;

const planDesc: Record<string, string> = {
  DAILY:    "Try it for a session",
  WEEKLY:   "Try it for a week",
  MONTHLY:  "Best value",
  LIFETIME: "Pay once, keep forever",
};

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  await requireAuth();
  const { plan } = await searchParams;
  if (!plan || !(plan in plans)) redirect("/#pricing");
  const key = plan as keyof typeof plans;
  const p = plans[key];

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
      <p className="mt-1 text-sm text-fg-soft">Choose a plan, send payment, get your license. Renewals add time to what you have.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_20rem]">
        <form action={createOrder} className="flex flex-col gap-6">
          <input type="hidden" name="plan" value={key} />

          {/* Step 1 — Plan */}
          <fieldset>
            <legend className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg-dim">1. Plan</legend>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {order.map((k) => (
                <Link
                  key={k}
                  href={`/checkout?plan=${k}`}
                  replace
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    k === key
                      ? "border-white/30 bg-white/[0.06]"
                      : "border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.02]"
                  }`}
                >
                  <span className="block font-semibold">{plans[k].name}</span>
                  <span className="block text-xs text-fg-dim">{eur(plans[k].price)} {plans[k].period}</span>
                </Link>
              ))}
            </div>
          </fieldset>

          {/* Step 2 — Method */}
          <fieldset>
            <legend className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg-dim">2. Payment method</legend>
            <div className="flex flex-col gap-2">
              {checkoutMethods.map((m, i) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.05] px-4 py-3 text-sm transition hover:border-white/[0.1] has-[:checked]:border-white/20 has-[:checked]:bg-white/[0.04]"
                >
                  <input type="radio" name="method" value={m} defaultChecked={i === 0} className="accent-white" />
                  {methods[m].label}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn-primary justify-center">Continue to payment</button>
        </form>

        {/* Summary sidebar */}
        <aside className="card h-fit rounded-2xl p-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-fg-dim">Summary</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span>{p.name} plan</span>
            <span>{eur(p.price)}</span>
          </div>
          <p className="mt-1 text-xs text-fg-dim">{planDesc[key]}</p>
          <div className="mt-4 flex items-baseline justify-between border-t border-white/[0.06] pt-4">
            <span className="text-sm text-fg-soft">Total</span>
            <span className="font-display text-3xl font-extrabold">{eur(p.price)}</span>
          </div>
          <ul className="mt-5 flex flex-col gap-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-fg-soft">
                <span className="h-1 w-1 shrink-0 rounded-full bg-fg-dim" />
                {f}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
