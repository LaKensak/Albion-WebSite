export const dynamic = "force-dynamic";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const { callbackUrl } = await searchParams;
  const target = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/dashboard";
  const session = await auth();
  if (session) redirect(target);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="glass-card w-full max-w-sm rounded-2xl p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/[0.08]">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </div>
        <h1 className="mt-6 font-display text-xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-fg-soft">
          Connect with Discord to access your dashboard.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("discord", { redirectTo: target });
          }}
        >
          <button
            type="submit"
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#5865F2] py-3.5 text-sm font-bold text-white transition hover:bg-[#4752C4] hover:shadow-[0_0_32px_rgba(88,101,242,0.3)]"
          >
            <svg width="20" height="15" viewBox="0 0 71 55" fill="currentColor">
              <path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 5 59.7 59.7 0 00.4 45a.3.3 0 00.1.2 58.9 58.9 0 0017.7 9 .2.2 0 00.3-.1 42.2 42.2 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.7.2.2 0 01 0-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.8 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.4 47.4 0 003.6 5.9.2.2 0 00.3.1 58.7 58.7 0 0017.7-9 .3.3 0 00.1-.2c1.5-15.6-2.5-29.2-10.6-41.2zM23.7 36.9c-3.6 0-6.5-3.3-6.5-7.3s2.9-7.3 6.5-7.3c3.7 0 6.6 3.3 6.5 7.3 0 4-2.9 7.3-6.5 7.3zm24 0c-3.6 0-6.5-3.3-6.5-7.3s2.9-7.3 6.5-7.3c3.7 0 6.6 3.3 6.5 7.3 0 4-2.8 7.3-6.5 7.3z" />
            </svg>
            Continue with Discord
          </button>
        </form>
      </div>
    </div>
  );
}
