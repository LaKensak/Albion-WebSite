"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateReferralCode } from "@/lib/referral";

function safeTarget(value: FormDataEntryValue | null) {
  const s = typeof value === "string" ? value : "";
  return s.startsWith("/") && !s.startsWith("//") ? s : "/dashboard";
}

async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for") ?? "unknown";
}

function field(formData: FormData, name: string) {
  const v = formData.get(name);
  return typeof v === "string" ? v : "";
}

export async function loginAction(formData: FormData) {
  const target = safeTarget(formData.get("callbackUrl"));
  const q = `callbackUrl=${encodeURIComponent(target)}`;

  const rl = await checkRateLimit(`login:${await clientIp()}`);
  if (!rl.success) redirect(`/login?error=rate&${q}`);

  try {
    await signIn("credentials", {
      email: field(formData, "email").trim().toLowerCase(),
      password: field(formData, "password"),
      redirectTo: target,
    });
  } catch (e) {
    if (e instanceof AuthError) redirect(`/login?error=invalid&${q}`);
    throw e;
  }
}

const registerSchema = z.object({
  name: z.string().trim().min(2).max(32),
  email: z.string().trim().toLowerCase().email().max(255),
  password: z.string().min(8).max(128),
});

export async function registerAction(formData: FormData) {
  const target = safeTarget(formData.get("callbackUrl"));
  const ref = field(formData, "ref").trim().toUpperCase();
  const q = `callbackUrl=${encodeURIComponent(target)}${ref ? `&ref=${encodeURIComponent(ref)}` : ""}`;

  const rl = await checkRateLimit(`register:${await clientIp()}`);
  if (!rl.success) redirect(`/register?error=rate&${q}`);

  const parsed = registerSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    password: field(formData, "password"),
  });
  if (!parsed.success) redirect(`/register?error=invalid&${q}`);

  const { name, email, password } = parsed.data;
  if (await prisma.user.findUnique({ where: { email } })) redirect(`/register?error=exists&${q}`);

  let referredById: string | undefined;
  if (ref) {
    const referrer = await prisma.user.findUnique({ where: { referralCode: ref }, select: { id: true } });
    if (!referrer) redirect(`/register?error=ref&${q}`);
    referredById = referrer.id;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  for (let attempt = 0; ; attempt++) {
    try {
      await prisma.user.create({
        data: { name, email, passwordHash, referralCode: generateReferralCode(), referredById },
      });
      break;
    } catch (e) {
      const code = (e as { code?: string }).code;
      if (code !== "P2002" || attempt >= 4) throw e;
      if (await prisma.user.findUnique({ where: { email } })) redirect(`/register?error=exists&${q}`);
    }
  }

  await signIn("credentials", { email, password, redirectTo: target });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
