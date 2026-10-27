"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/guards";
import { db } from "@/lib/db";
import { getLoyalty } from "@/server/loyalty";

const DAY = 86_400_000;

function field(formData: FormData, name: string) {
  const v = formData.get(name);
  return typeof v === "string" ? v : "";
}

export async function updateProfile(formData: FormData) {
  const session = await requireAuth();
  const parsed = z.string().trim().min(2).max(32).safeParse(field(formData, "name"));
  if (!parsed.success) redirect("/dashboard/settings?error=name");
  await db.user.update({ where: { id: session.user.id }, data: { name: parsed.data } });
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/settings?ok=profile");
}

export async function changePassword(formData: FormData) {
  const session = await requireAuth();
  const current = field(formData, "current");
  const next = z.string().min(8).max(128).safeParse(field(formData, "next"));
  if (!next.success) redirect("/dashboard/settings?error=weak");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user?.passwordHash || !(await bcrypt.compare(current, user.passwordHash))) {
    redirect("/dashboard/settings?error=current");
  }
  await db.user.update({
    where: { id: user.id },
    data: { passwordHash: await bcrypt.hash(next.data, 12) },
  });
  redirect("/dashboard/settings?ok=password");
}

export async function resetHwid(formData: FormData) {
  const session = await requireAuth();
  const id = z.string().cuid().safeParse(field(formData, "id"));
  if (!id.success) redirect("/dashboard/licenses");

  const license = await db.license.findUnique({ where: { id: id.data } });
  if (!license || license.userId !== session.user.id || !license.hwid) redirect("/dashboard/licenses");

  const { tier } = await getLoyalty(session.user.id);
  const nextAllowed = license.hwidResetAt ? license.hwidResetAt.getTime() + tier.hwidCooldownDays * DAY : 0;
  if (Date.now() < nextAllowed) redirect("/dashboard/licenses?error=cooldown");

  await db.license.update({ where: { id: license.id }, data: { hwid: null, hwidResetAt: new Date() } });
  revalidatePath("/dashboard/licenses");
  redirect("/dashboard/licenses?ok=hwid");
}
