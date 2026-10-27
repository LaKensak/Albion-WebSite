import { db } from "@/lib/db";

export const contactRepo = {
  create: (data: { name: string; email: string; message: string }) =>
    db.contactMessage.create({ data }),

  findAll: async ({ page = 1, perPage = 25 }: { page?: number; perPage?: number }) => {
    const messages = await db.contactMessage.findMany({
      where: { archived: false },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const total = await db.contactMessage.count({ where: { archived: false } });
    return { messages, total, page, perPage };
  },

  markRead: (id: string) =>
    db.contactMessage.update({ where: { id }, data: { read: true } }),

  archive: (id: string) =>
    db.contactMessage.update({ where: { id }, data: { archived: true } }),

  countUnread: () =>
    db.contactMessage.count({ where: { read: false, archived: false } }),
};
