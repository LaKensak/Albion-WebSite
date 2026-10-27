import { db } from "@/lib/db";
import type { LicenseType, LicenseStatus } from "@prisma/client";

export const licenseRepo = {
  findByUser: (userId: string) =>
    db.license.findMany({
      where: { userId },
      include: { payments: true },
      orderBy: { createdAt: "desc" },
    }),

  findByKey: (key: string) =>
    db.license.findUnique({
      where: { key },
      include: { user: true },
    }),

  create: (data: { type: LicenseType; userId?: string; key?: string; expiresAt?: Date }) =>
    db.license.create({ data }),

  updateStatus: (id: string, status: LicenseStatus) =>
    db.license.update({ where: { id }, data: { status } }),

  setHwid: (id: string, hwid: string) =>
    db.license.update({ where: { id }, data: { hwid } }),

  countActive: () =>
    db.license.count({ where: { status: "ACTIVE" } }),

  findAll: async ({ page = 1, perPage = 25 }: { page?: number; perPage?: number }) => {
    const licenses = await db.license.findMany({
      include: { user: true, payments: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const total = await db.license.count();
    return { licenses, total, page, perPage };
  },
};
