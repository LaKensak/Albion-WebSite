import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@albionradar.com";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN" },
    create: {
      email: adminEmail,
      name: "Admin",
      role: "ADMIN",
    },
  });

  await prisma.category.upsert({
    where: { slug: "changelog" },
    update: {},
    create: { name: "Changelog", slug: "changelog" },
  });
  await prisma.category.upsert({
    where: { slug: "guide" },
    update: {},
    create: { name: "Guide", slug: "guide" },
  });
  await prisma.category.upsert({
    where: { slug: "news" },
    update: {},
    create: { name: "News", slug: "news" },
  });

  const changelog = await prisma.category.findUnique({ where: { slug: "changelog" } });

  await prisma.post.upsert({
    where: { slug: "welcome" },
    update: {},
    create: {
      title: "Welcome to Albion Radar",
      slug: "welcome",
      excerpt: "The site is live. Here is what to expect.",
      content: "<p>Albion Radar is now online. Stay tuned for updates, changelogs, and guides.</p>",
      published: true,
      categoryId: changelog?.id,
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
