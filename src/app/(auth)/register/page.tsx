export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { registerAction } from "@/server/actions/auth";
import { AuthForm } from "@/components/auth-form";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string; ref?: string }>;
}) {
  const { error, callbackUrl, ref } = await searchParams;
  const session = await auth();
  if (session) redirect("/dashboard");
  return <AuthForm mode="register" action={registerAction} error={error} callbackUrl={callbackUrl} referral={ref} />;
}
