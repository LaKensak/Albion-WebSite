export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginAction } from "@/server/actions/auth";
import { AuthForm } from "@/components/auth-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  const session = await auth();
  if (session) redirect("/dashboard");
  return <AuthForm mode="login" action={loginAction} error={error} callbackUrl={callbackUrl} />;
}
