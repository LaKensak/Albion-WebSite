import { db } from "@/lib/db";
import type { Role } from "@prisma/client";

export const userRepo = {
  findById: (id: string) =>
    db.user.findUnique({ where: { id }, include: { licenses: true } }),


  setRole: (id: string, role: Role) =>
    db.user.update({ where: { id }, data: { role } }),

  ban: (id: string) =>
    db.user.update({ where: { id }, data: { banned: true } }),

  unban: (id: string) =>
    db.user.update({ where: { id }, data: { banned: false } }),

  countAll: () => db.user.count(),

  findAll: async ({ page = 1, perPage = 25 }: { page?: number; perPage?: number }) => {
    const users = await db.user.findMany({
      include: { licenses: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const total = await db.user.count();
    return { users, total, page, perPage };
  },
};
