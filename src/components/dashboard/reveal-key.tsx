"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

export function RevealKey({ value }: { value: string }) {
  const [shown, setShown] = useState(false);
  const masked = value.slice(0, 4) + "•".repeat(Math.max(0, value.length - 8)) + value.slice(-4);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <code className="min-w-0 flex-1 break-all rounded-xl bg-black/30 px-4 py-2.5 font-mono text-xs">
        {shown ? value : masked}
      </code>
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={shown ? "Hide key" : "Show key"}
        className="rounded-lg bg-white/[0.05] p-2 text-fg-soft transition hover:bg-white/[0.09] hover:text-fg"
      >
        {shown ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
      <CopyButton value={value} />
    </div>
  );
}
