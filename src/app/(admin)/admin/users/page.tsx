export const dynamic = "force-dynamic";

import { userRepo } from "@/server/repositories/user";

export default async function AdminUsersPage() {
  const { users } = await userRepo.findAll({ page: 1, perPage: 50 });

  return (
    <>
      <h1 className="font-display text-2xl font-bold">Users</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.04] text-left text-xs text-fg-dim">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Banned</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/[0.03]">
                <td className="py-3 font-medium">{u.name ?? "-"}</td>
                <td className="py-3 text-fg-soft">{u.email ?? "-"}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === "ADMIN" ? "bg-violet/10 text-violet" : "bg-white/[0.04] text-fg-soft"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3">{u.banned ? "Yes" : "No"}</td>
                <td className="py-3 text-fg-dim">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
