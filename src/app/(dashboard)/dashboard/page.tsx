export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, Check, Circle, Newspaper, TriangleAlert } from "lucide-react";
import { requireAuth } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { licenseRepo } from "@/server/repositories/license";
import { paymentRepo } from "@/server/repositories/payment";
import { postRepo } from "@/server/repositories/post";
import { plans, methods } from "@/config/plans";
import { daysLeft, effectiveStatus, isUsable } from "@/lib/license";
import { eur, fmtDate } from "@/lib/format";
import { Downloads } from "@/components/dashboard/downloads";

const statusPill = {
  PENDING:   "bg-white/[0.06] text-fg-soft",
  SUBMITTED: "bg-amber-400/15 text-amber-300",
  CONFIRMED: "bg-green-bg text-green",
  REJECTED:  "bg-red/10 text-red",
} as const;

export default async function DashboardPage() {
  const session = await requireAuth();
  const uid = session.user.id;

  const [licenses, orders, { posts }] = await Promise.all([
    licenseRepo.findByUser(uid),
    paymentRepo.findByUser(uid),
    postRepo.findPublished({ page: 1, perPage: 3 }),
  ]);

  const name      = session.user.name ?? session.user.email ?? "";
  const current   = licenses.find((l) => isUsable(l)) ?? licenses[0];
  const status    = current ? effectiveStatus(current) : null;
  const left      = current ? daysLeft(current) : null;
  const lifetime  = current?.type === "LIFETIME";
  const usable    = !!current && isUsable(current);
  const renewPlan = current && current.type !== "LIFETIME" ? current.type : "MONTHLY";
  const renewPrice = plans[renewPlan].price;
  const tone      = status === "EXPIRED" || status === "REVOKED" ? "red" : status === "EXPIRING" || status === "SUSPENDED" ? "amber" : "green";
  const toneText  = tone === "green" ? "text-green" : tone === "amber" ? "text-amber-300" : "text-red";
  const statusLabel = status === "EXPIRING" ? "Expiring soon" : status ? status[0] + status.slice(1).toLowerCase() : "";

  const steps = [
    { label: "Create your account", done: true },
    { label: "Get your license", done: usable },
    { label: "Launch Vanta to bind your machine", done: licenses.some((l) => l.hwid) },
  ];
  const onboarding = steps.some((s) => !s.done);

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Welcome back{name ? `, ${name}` : ""}
        </h1>
        <p className="mt-0.5 text-sm text-fg-soft">Your account at a glance.</p>
      </header>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <div className="card rounded-xl p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-fg-dim">Status</p>
          <p className={`mt-2 font-display text-xl font-bold ${usable ? "text-green" : "text-fg-dim"}`}>
            {usable ? "Active" : "Inactive"}
          </p>
          <p className="mt-0.5 text-xs text-fg-dim">{current ? plans[current.type].name : "No license"}</p>
        </div>

        <div className="card rounded-xl p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-fg-dim">Remaining</p>
          <p className="mt-2 font-display text-xl font-bold text-fg">
            {lifetime ? "∞" : left !== null ? `${Math.max(0, left)}d` : "--"}
          </p>
          <p className="mt-0.5 text-xs text-fg-dim">{lifetime ? "Lifetime" : "days left"}</p>
        </div>

        <div className="card rounded-xl p-4">
          <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-fg-dim">Orders</p>
          <p className="mt-2 font-display text-xl font-bold text-fg">{orders.length}</p>
          <p className="mt-0.5 text-xs text-fg-dim">{orders.length === 1 ? "purchase" : "total purchases"}</p>
        </div>
      </div>

      {/* Expiry banner */}
      {(status === "EXPIRING" || status === "EXPIRED") && (
        <div className={`flex flex-wrap items-center justify-between gap-4 rounded-xl border px-5 py-4 ${
          status === "EXPIRED" ? "border-red/25 bg-red/[0.04]" : "border-amber-400/25 bg-amber-400/[0.04]"
        }`}>
          <p className="flex items-center gap-3 text-sm">
            <TriangleAlert size={16} className={status === "EXPIRED" ? "text-red" : "text-amber-300"} />
            {status === "EXPIRED"
              ? "Your license has expired."
              : `Your license ends in ${left} day${left === 1 ? "" : "s"}.`}
          </p>
          <Link href={`/checkout?plan=${renewPlan}`} className="btn-primary !px-5 !py-2 !text-xs">
            Renew {eur(renewPrice)} <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* License card */}
      <section className="card rounded-2xl p-6 md:p-7">
        {current ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-bg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={toneText}>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div className="w-full min-w-0 flex-1">
              <h2 className="font-display text-xl font-bold">
                {plans[current.type].name}{" "}
                <span className={`text-base font-medium ${toneText}`}>&middot; {statusLabel}</span>
              </h2>
              <p className="mt-1 text-sm text-fg-soft">
                {lifetime ? "No expiry." : `${usable ? "Valid until" : "Ended on"} ${fmtDate(current.expiresAt)}`}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link href="/dashboard/licenses" className="btn-ghost !px-5 !py-2 !text-xs">Manage</Link>
                {!lifetime && (
                  <Link href={`/checkout?plan=${renewPlan}`} className="btn-primary !px-5 !py-2 !text-xs">
                    Renew {eur(renewPrice)}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 py-2 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-bg">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="text-fg-dim">
                <circle cx="13" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-bold">No active license</p>
              <p className="mt-1 text-sm text-fg-soft">Pick a plan to get your key and downloads.</p>
            </div>
            <Link href="/#pricing" className="btn-primary shrink-0 !px-5 !py-2 !text-xs">
              See plans <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </section>

      {/* Onboarding checklist */}
      {onboarding && (
        <section className="card rounded-2xl p-6">
          <h2 className="font-display text-sm font-semibold text-fg">Get started</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {steps.map((s) => (
              <li key={s.label} className="flex items-center gap-3">
                {s.done
                  ? <Check size={14} className="shrink-0 text-green" />
                  : <Circle size={14} className="shrink-0 text-fg-dim" />
                }
                <span className={`text-sm ${s.done ? "text-fg-dim line-through" : "text-fg-soft"}`}>{s.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Downloads */}
      <Downloads hasActiveLicense={usable} />

      {/* Latest posts + Recent orders */}
      <div className="grid gap-4 md:grid-cols-2">
        <section className="card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-sm font-semibold">
              <Newspaper size={14} className="text-fg-dim" /> Latest updates
            </h2>
            <Link href="/blog" className="text-xs text-fg-dim transition-colors hover:text-fg-soft">All posts</Link>
          </div>
          {posts.length === 0 ? (
            <p className="mt-4 text-sm text-fg-dim">No announcements yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-white/[0.05]">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link href={`/blog/${p.slug}`} className="block py-3 transition-opacity hover:opacity-75">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="mt-0.5 text-xs text-fg-dim">{fmtDate(p.createdAt)}{p.category ? ` · ${p.category.name}` : ""}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Recent orders</h2>
            <Link href="/dashboard/orders" className="text-xs text-fg-dim transition-colors hover:text-fg-soft">All orders</Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-fg-dim">No orders yet.</p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-white/[0.05]">
              {orders.slice(0, 3).map((o) => (
                <li key={o.id}>
                  <Link href={`/dashboard/orders/${o.id}`} className="flex items-center justify-between gap-3 py-3 transition-opacity hover:opacity-75">
                    <span>
                      <span className="block text-sm font-medium">{plans[o.plan].name} &middot; {eur(o.amount)}</span>
                      <span className="block text-xs text-fg-dim">{methods[o.method].label} &middot; {fmtDate(o.createdAt)}</span>
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase ${statusPill[o.status]}`}>
                      {o.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
