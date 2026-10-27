import { db } from "@/lib/db";

export const postRepo = {
  findPublished: async ({ page = 1, perPage = 10 }: { page?: number; perPage?: number }) => {
    const posts = await db.post.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    return { posts };
  },

  findBySlug: (slug: string) =>
    db.post.findUnique({
      where: { slug },
      include: { category: true },
    }),

  findAll: async ({ page = 1, perPage = 25 }: { page?: number; perPage?: number }) => {
    const posts = await db.post.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });
    const total = await db.post.count();
    return { posts, total, page, perPage };
  },

  create: (data: { title: string; slug: string; content: string; excerpt?: string; published?: boolean; categoryId?: string }) =>
    db.post.create({ data }),

  update: (id: string, data: Partial<{ title: string; slug: string; content: string; excerpt: string; published: boolean; categoryId: string }>) =>
    db.post.update({ where: { id }, data }),

  delete: (id: string) => db.post.delete({ where: { id } }),
};
