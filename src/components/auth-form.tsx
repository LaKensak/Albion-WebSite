import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { Brand } from "@/components/layout/brand";

const errors: Record<string, string> = {
  invalid: "Invalid email or password.",
  rate: "Too many attempts. Try again in a minute.",
  exists: "An account with this email already exists.",
  ref: "This referral code does not exist.",
  register: "Check your details. The password needs at least 8 characters.",
};

const input =
  "w-full rounded-md border border-border-h bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-fg-dim/60 focus:border-cyan/60";
const label = "flex flex-col gap-2 text-[11px] text-fg-soft";

export function AuthForm({
  mode,
  action,
  error,
  callbackUrl,
  referral,
}: {
  mode: "login" | "register";
  action: (formData: FormData) => Promise<void>;
  error?: string;
  callbackUrl?: string;
  referral?: string;
}) {
  const isLogin = mode === "login";
  const message = error
    ? !isLogin && error === "invalid"
      ? errors.register
      : errors[error]
    : undefined;
  const params = new URLSearchParams();
  if (callbackUrl) params.set("callbackUrl", callbackUrl);
  if (referral) params.set("ref", referral);
  const q = params.size ? `?${params}` : "";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-border p-12 lg:flex">
        <Image
          src="/games/albion-online.jpg"
          alt=""
          fill
          loading="eager"
          sizes="50vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />
        <div className="relative">
          <Brand />
        </div>
        <div className="relative py-16">
          <p className="section-label">Your next perspective</p>
          <p className="mt-7 font-display text-7xl font-medium leading-[1.05] tracking-[-.06em]">
            See beyond.
            <br />
            Play <span className="text-cyan">ahead.</span>
          </p>
          <p className="mt-7 max-w-sm text-sm leading-relaxed text-fg-soft">
            Your games. Your setup. Everything you need, in one place.
          </p>
          <div className="mt-9 flex flex-col gap-3 text-xs text-fg-soft">
            {[
              "Manage your licenses",
              "Get the latest downloads",
              "Unlock loyalty rewards",
            ].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <Check size={13} className="text-cyan" />
                {text}
              </span>
            ))}
          </div>
        </div>
        <p className="relative font-mono text-[9px] tracking-wider text-fg-dim">
          VANTA / A DIFFERENT POINT OF VIEW.
        </p>
      </aside>
      <main className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-fg-dim hover:text-cyan"
          >
            <ArrowLeft size={13} /> Back to Vanta
          </Link>
          <span className="lg:hidden">
            <Brand />
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-14">
          <span className="mb-6 grid h-11 w-11 place-items-center rounded-lg border border-cyan/20 bg-cyan/5 text-cyan">
            <LockKeyhole size={20} strokeWidth={1.5} />
          </span>
          <p className="section-label">
            {isLogin ? "Your personal space" : "A new point of view"}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-.04em]">
            {isLogin ? "Welcome back." : "Make your next move."}
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-fg-soft">
            {isLogin
              ? "Sign in to your Vanta dashboard."
              : "Create an account. Find your perspective."}
          </p>
          {message && (
            <p
              role="alert"
              className="mt-6 rounded-md border border-red/20 bg-red/10 px-4 py-3 text-xs leading-relaxed text-red"
            >
              {message}
            </p>
          )}
          <form action={action} className="mt-8 flex flex-col gap-5">
            <input
              type="hidden"
              name="callbackUrl"
              value={callbackUrl ?? "/dashboard"}
            />
            {!isLogin && (
              <label className={label}>
                Username
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={32}
                  placeholder="Your username"
                  autoComplete="username"
                  className={input}
                />
              </label>
            )}
            <label className={label}>
              Email address
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                autoComplete="email"
                className={input}
              />
            </label>
            <label className={label}>
              Password
              <input
                name="password"
                type="password"
                required
                minLength={isLogin ? 1 : 8}
                placeholder={
                  isLogin ? "Enter your password" : "At least 8 characters"
                }
                autoComplete={isLogin ? "current-password" : "new-password"}
                className={input}
              />
            </label>
            {!isLogin && (
              <label className={label}>
                Referral code <span className="sr-only">optional</span>
                <input
                  name="ref"
                  defaultValue={referral}
                  maxLength={16}
                  placeholder="Optional — 10% off your first order"
                  className={input}
                />
              </label>
            )}
            <button
              type="submit"
              className="btn-primary mt-1 w-full justify-between"
            >
              {isLogin ? "Sign in" : "Create account"}
              <ArrowUpRight size={15} />
            </button>
          </form>
          <p className="mt-7 text-center text-xs text-fg-dim">
            {isLogin ? "New to Vanta? " : "Already part of it? "}
            <Link
              href={`${isLogin ? "/register" : "/login"}${q}`}
              className="font-medium text-cyan hover:underline"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </div>
        <p className="text-center text-[10px] leading-relaxed text-fg-dim">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-fg-soft hover:text-cyan">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-fg-soft hover:text-cyan">
            Privacy policy
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
