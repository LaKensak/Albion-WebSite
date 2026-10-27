import type { License } from "@prisma/client";

const DAY = 86_400_000;

export const planDays = { DAILY: 1, WEEKLY: 7, MONTHLY: 30, LIFETIME: null } as const;

export type EffectiveStatus = "ACTIVE" | "EXPIRING" | "EXPIRED" | "REVOKED" | "SUSPENDED";

export function daysLeft(l: Pick<License, "expiresAt">) {
  if (!l.expiresAt) return null;
  return Math.ceil((new Date(l.expiresAt).getTime() - Date.now()) / DAY);
}

export function effectiveStatus(l: Pick<License, "status" | "expiresAt">): EffectiveStatus {
  if (l.status === "REVOKED" || l.status === "SUSPENDED") return l.status;
  const left = daysLeft(l);
  if (left !== null && left <= 0) return "EXPIRED";
  if (left !== null && left <= 3) return "EXPIRING";
  return "ACTIVE";
}

export function isUsable(l: Pick<License, "status" | "expiresAt">) {
  const s = effectiveStatus(l);
  return s === "ACTIVE" || s === "EXPIRING";
}

export function progressPct(l: Pick<License, "type" | "expiresAt">) {
  const total = planDays[l.type];
  const left = daysLeft(l);
  if (total === null || left === null) return 100;
  return Math.max(0, Math.min(100, (left / total) * 100));
}
