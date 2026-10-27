import Link from "next/link";

const errors: Record<string, string> = {
  invalid: "Invalid email or password.",
  rate: "Too many attempts. Try again in a minute.",
  exists: "An account with this email already exists.",
  ref: "This referral code does not exist.",
  register: "Check your details. The password needs at least 8 characters.",
};

const input =
  "w-full rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-cyan/40";

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
  const message = error ? (!isLogin && error === "invalid" ? errors.register : errors[error]) : undefined;
  const params = new URLSearchParams();
  if (callbackUrl) params.set("callbackUrl", callbackUrl);
  if (referral) params.set("ref", referral);
  const q = params.size ? `?${params}` : "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="glass-card w-full max-w-sm rounded-2xl p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan/[0.08]">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold">
          {isLogin ? "Sign in" : "Create your account"}
        </h1>

        {message && (
          <p className="mt-5 rounded-xl bg-red/10 px-4 py-3 text-center text-xs text-red">{message}</p>
        )}

        <form action={action} className="mt-6 flex flex-col gap-3">
          <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/dashboard"} />
          {!isLogin && (
            <input name="name" required minLength={2} maxLength={32} placeholder="Username" autoComplete="username" className={input} />
          )}
          <input name="email" type="email" required placeholder="Email" autoComplete="email" className={input} />
          <input
            name="password"
            type="password"
            required
            minLength={isLogin ? 1 : 8}
            placeholder="Password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            className={input}
          />
          {!isLogin && (
            <input name="ref" defaultValue={referral} maxLength={16} placeholder="Referral code (optional, -10% on your first order)" className={input} />
          )}
          <button type="submit" className="btn-primary mt-2 w-full justify-center">
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-fg-dim">
          {isLogin ? "No account yet? " : "Already registered? "}
          <Link href={`${isLogin ? "/register" : "/login"}${q}`} className="text-cyan hover:underline">
            {isLogin ? "Create one" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
