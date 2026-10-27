export const tiers = [
  { key: "recruit", name: "Recruit", minSpend: 0, discount: 0, hwidCooldownDays: 14, perks: ["Dashboard and downloads", "Community support"] },
  { key: "veteran", name: "Veteran", minSpend: 25, discount: 5, hwidCooldownDays: 7, perks: ["5% off every purchase", "HWID reset every 7 days"] },
  { key: "elite", name: "Elite", minSpend: 75, discount: 10, hwidCooldownDays: 3, perks: ["10% off every purchase", "HWID reset every 3 days", "Priority support"] },
  { key: "legend", name: "Legend", minSpend: 200, discount: 15, hwidCooldownDays: 1, perks: ["15% off every purchase", "HWID reset every day", "Priority support", "Early access to builds"] },
] as const;

export type Tier = (typeof tiers)[number];

export const referral = { referredDiscount: 10, referrerBonusDays: 7 } as const;

export function tierFor(spend: number): Tier {
  return [...tiers].reverse().find((t) => spend >= t.minSpend) ?? tiers[0];
}

export function nextTier(spend: number): Tier | null {
  return tiers.find((t) => t.minSpend > spend) ?? null;
}
