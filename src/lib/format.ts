export function eur(n: number) {
  return `€${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

export function fmtDate(d: Date | string | null | undefined) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
