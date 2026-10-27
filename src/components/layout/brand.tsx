import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      aria-label="Vanta home"
      className="inline-flex shrink-0 items-center gap-2.5"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
          <path
            d="m3 5 8.9 15L21 5h-5.3L12 11.6 8.3 5H3Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="font-display text-2xl font-semibold tracking-[-0.07em]">
        vanta<span className="text-cyan">.</span>
      </span>
    </Link>
  );
}
