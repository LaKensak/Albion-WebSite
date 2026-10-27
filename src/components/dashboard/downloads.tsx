import { Download as DownloadIcon, PackageOpen } from "lucide-react";
import { db } from "@/lib/db";
import { fmtDate } from "@/lib/format";

export async function Downloads({ hasActiveLicense }: { hasActiveLicense: boolean }) {
  if (!hasActiveLicense) return null;
  const files = await db.download.findMany({ where: { active: true }, orderBy: { createdAt: "desc" }, take: 3 });

  return (
    <section className="glass-card rounded-2xl p-6">
      <h2 className="font-display text-base font-bold">Latest build</h2>
      {files.length === 0 ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-white/[0.06] p-4 text-sm text-fg-dim">
          <PackageOpen size={18} /> No build published yet. It will appear here as soon as it is released.
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {files.map((f, i) => (
            <li key={f.id}>
              <a
                href={f.fileUrl}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.04] px-4 py-3 text-sm transition hover:border-cyan/20 hover:bg-cyan/[0.03]"
              >
                <span className="flex items-center gap-3 font-medium">
                  <DownloadIcon size={15} className="text-cyan" />
                  {f.fileName}
                  {i === 0 && <span className="rounded-full bg-green-bg px-2 py-0.5 text-[0.6rem] font-bold uppercase text-green">Latest</span>}
                </span>
                <span className="font-mono text-xs text-fg-dim">v{f.version} &middot; {fmtDate(f.createdAt)}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
