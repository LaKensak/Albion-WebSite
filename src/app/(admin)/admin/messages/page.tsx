export const dynamic = "force-dynamic";

import { contactRepo } from "@/server/repositories/contact";

export default async function AdminMessagesPage() {
  const { messages } = await contactRepo.findAll({ page: 1, perPage: 50 });

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Contact Messages</h1>
      <div className="mt-6 flex flex-col gap-3">
        {messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/[0.06] p-8 text-center text-sm text-fg-dim">
            No messages yet.
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl p-5 ${m.read ? "glass-card" : "glass-card-strong"}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-fg-dim">{m.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
                  )}
                  <span className="text-xs text-fg-dim">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-soft">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
