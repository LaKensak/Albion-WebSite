export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/guards";
import { plans, methods, checkoutMethods } from "@/config/plans";
import { createOrder } from "@/server/actions/payment";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  await requireAuth();
  const { plan } = await searchParams;
  if (!plan || !(plan in plans)) redirect("/#pricing");
  const p = plans[plan as keyof typeof plans];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-fg-soft">Choose how you want to pay. You will get the payment details on the next step.</p>

      <form action={createOrder} className="glass-card-strong mt-8 rounded-2xl p-7">
        <input type="hidden" name="plan" value={plan} />
        <div className="flex items-baseline justify-between">
          <p className="font-display text-lg font-bold">{p.name}</p>
          <p className="font-display text-2xl font-extrabold">&euro;{p.price}</p>
        </div>

        <fieldset className="mt-6 flex flex-col gap-2">
          <legend className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-cyan">Payment method</legend>
          {checkoutMethods.map((m, i) => (
            <label key={m} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.05] px-4 py-3 text-sm transition hover:border-cyan/20 has-[:checked]:border-cyan/40 has-[:checked]:bg-cyan/[0.04]">
              <input type="radio" name="method" value={m} defaultChecked={i === 0} className="accent-cyan" />
              {methods[m].label}
            </label>
          ))}
        </fieldset>

        <button type="submit" className="btn-primary mt-7 w-full justify-center">Continue</button>
      </form>
    </div>
  );
}
