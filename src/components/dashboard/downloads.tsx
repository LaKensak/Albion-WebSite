import { Download as DownloadIcon } from "lucide-react";
import { db } from "@/lib/db";

export async function Downloads({ hasActiveLicense }: { hasActiveLicense: boolean }) {
  if (!hasActiveLicense) return null;
  const files = await db.download.findMany({ where: { active: true }, orderBy: { createdAt: "desc" }, take: 3 });

  return (
    <div className="mt-10">
      <h2 className="font-display text-lg font-bold">Download</h2>
      {files.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-white/[0.06] p-6 text-center text-sm text-fg-dim">
          No build published yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {files.map((f) => (
            <a key={f.id} href={f.fileUrl} className="glass-card flex items-center justify-between rounded-xl p-5">
              <span className="flex items-center gap-3 text-sm font-medium">
                <DownloadIcon size={16} className="text-cyan" /> {f.fileName}
              </span>
              <span className="font-mono text-xs text-fg-dim">v{f.version}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
