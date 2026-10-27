export function LicenseRing({
  pct,
  label,
  sub,
  tone,
}: {
  pct: number;
  label: string;
  sub: string;
  tone: "green" | "amber" | "red" | "cyan";
}) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const color = { green: "#10b981", amber: "#f59e0b", red: "#ef4444", cyan: "#22d3ee" }[tone];

  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90">
        <circle cx="54" cy="54" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
        <circle
          cx="54"
          cy="54"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0, Math.min(100, pct)) / 100)}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-2xl font-extrabold leading-none">{label}</span>
        <span className="mt-1 text-[0.65rem] uppercase tracking-wider text-fg-dim">{sub}</span>
      </div>
    </div>
  );
}
