export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Cpu, KeyRound } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { licenseRepo } from "@/server/repositories/license";
import { getLoyalty, priceFor } from "@/server/loyalty";
import { plans } from "@/config/plans";
import { daysLeft, effectiveStatus, isUsable, progressPct } from "@/lib/license";
import { eur, fmtDate } from "@/lib/format";
import { resetHwid } from "@/server/actions/account";
import { RevealKey } from "@/components/dashboard/reveal-key";
import { Downloads } from "@/components/dashboard/downloads";

const DAY = 86_400_000;
const pill = {
  ACTIVE: "bg-green-bg text-green",
  EXPIRING: "bg-amber-400/15 text-amber-300",
  EXPIRED: "bg-red/10 text-red",
  REVOKED: "bg-red/10 text-red",
  SUSPENDED: "bg-amber-400/15 text-amber-300",
} as const;

export default async function LicensesPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const session = await requireAuth();
  const { ok, error } = await searchParams;
  const [licenses, loyalty] = await Promise.all([licenseRepo.findByUser(session.user.id), getLoyalty(session.user.id)]);
  const anyUsable = licenses.some((l) => isUsable(l));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">License</h1>
        <p className="mt-1 text-sm text-fg-soft">Your key, your machine, your time left.</p>
      </header>

      {ok === "hwid" && <p className="rounded-xl bg-green-bg px-4 py-3 text-sm text-green">Machine unbound. Launch Vanta on your new PC to bind it.</p>}
      {error === "cooldown" && <p className="rounded-xl bg-red/10 px-4 py-3 text-sm text-red">You reset too recently. Higher tiers get shorter waits, see Rewards.</p>}

      {licenses.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <KeyRound className="mx-auto text-cyan" size={26} />
          <p className="mt-4 text-sm text-fg-soft">You do not have a license yet.</p>
          <Link href="/#pricing" className="btn-primary mt-6 inline-flex">See plans <ArrowRight size={14} /></Link>
        </div>
      ) : (
        licenses.map((l) => {
          const status = effectiveStatus(l);
          const left = daysLeft(l);
          const nextReset = l.hwidResetAt ? l.hwidResetAt.getTime() + loyalty.tier.hwidCooldownDays * DAY : 0;
          const waitDays = Math.max(0, Math.ceil((nextReset - Date.now()) / DAY));
          const renewPlan = l.type === "LIFETIME" ? null : l.type;

          return (
            <section key={l.id} className="glass-card-strong rounded-2xl p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold">{plans[l.type].name} plan</h2>
                <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase ${pill[status]}`}>{status}</span>
              </div>

              <div className="mt-5"><RevealKey value={l.key} /></div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-fg-dim">
                  <span>{l.type === "LIFETIME" ? "Lifetime" : left !== null && left > 0 ? `${left} day${left === 1 ? "" : "s"} left` : "Expired"}</span>
                  <span>{l.expiresAt ? `Ends ${fmtDate(l.expiresAt)}` : "No end date"}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className={`h-full rounded-full ${status === "ACTIVE" ? "bg-green" : status === "EXPIRING" ? "bg-amber-400" : "bg-red"}`}
                    style={{ width: `${Math.max(3, progressPct(l))}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-black/20 p-4">
                <div className="flex items-center gap-3">
                  <Cpu size={18} className="text-cyan" />
                  <div>
                    <p className="text-sm font-medium">{l.hwid ? "Machine bound" : "No machine bound yet"}</p>
                    <p className="text-xs text-fg-dim">
                      {l.hwid ? `ID ${l.hwid.slice(0, 8)}...` : "First launch binds this key to your PC."}
                    </p>
                  </div>
                </div>
                {l.hwid && (
                  waitDays > 0 ? (
                    <span className="text-xs text-fg-dim">Reset available in {waitDays} day{waitDays === 1 ? "" : "s"}</span>
                  ) : (
                    <form action={resetHwid}>
                      <input type="hidden" name="id" value={l.id} />
                      <button className="btn-ghost !px-4 !py-2 text-xs">Reset machine</button>
                    </form>
                  )
                )}
              </div>

              {renewPlan && (
                <div className="mt-5 flex justify-end">
                  <Link href={`/checkout?plan=${renewPlan}`} className="btn-primary !px-5 !py-2.5 text-xs">
                    Extend {eur(priceFor(plans[renewPlan].price, loyalty.discountPct))} <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </section>
          );
        })
      )}

      <Downloads hasActiveLicense={anyUsable} />
    </div>
  );
}
