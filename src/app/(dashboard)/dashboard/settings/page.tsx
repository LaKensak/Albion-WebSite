export const dynamic = "force-dynamic";

import { requireAuth } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { fmtDate } from "@/lib/format";
import { changePassword, updateProfile } from "@/server/actions/account";

const input = "w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-cyan/40";

const messages: Record<string, { text: string; good: boolean }> = {
  profile: { text: "Username updated.", good: true },
  password: { text: "Password changed.", good: true },
  name: { text: "Username must be 2 to 32 characters.", good: false },
  weak: { text: "The new password needs at least 8 characters.", good: false },
  current: { text: "Your current password is wrong.", good: false },
};

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const session = await requireAuth();
  const { ok, error } = await searchParams;
  const user = await db.user.findUnique({ where: { id: session.user.id } });
  const msg = messages[ok ?? error ?? ""];

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <header>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-fg-soft">Member since {fmtDate(user?.createdAt)}.</p>
      </header>

      {msg && <p className={`rounded-xl px-4 py-3 text-sm ${msg.good ? "bg-green-bg text-green" : "bg-red/10 text-red"}`}>{msg.text}</p>}

      <form action={updateProfile} className="glass-card flex flex-col gap-3 rounded-2xl p-6">
        <h2 className="font-display text-base font-bold">Profile</h2>
        <label className="text-xs text-fg-dim">Email</label>
        <input value={user?.email ?? ""} disabled className={`${input} opacity-60`} />
        <label className="text-xs text-fg-dim">Username</label>
        <input name="name" defaultValue={user?.name ?? ""} required minLength={2} maxLength={32} className={input} />
        <button className="btn-primary mt-2 self-start !px-5 !py-2.5 text-xs">Save</button>
      </form>

      <form action={changePassword} className="glass-card flex flex-col gap-3 rounded-2xl p-6">
        <h2 className="font-display text-base font-bold">Password</h2>
        <input name="current" type="password" required placeholder="Current password" autoComplete="current-password" className={input} />
        <input name="next" type="password" required minLength={8} placeholder="New password (8+ characters)" autoComplete="new-password" className={input} />
        <button className="btn-ghost mt-2 self-start !px-5 !py-2.5 text-xs">Change password</button>
      </form>
    </div>
  );
}
