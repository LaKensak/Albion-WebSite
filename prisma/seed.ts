import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { generateReferralCode } from "../src/lib/referral";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: (() => { const u = new URL(process.env.DATABASE_URL!); u.searchParams.delete("sslmode"); u.searchParams.delete("pgbouncer"); return u.toString(); })(),
    ssl: { rejectUnauthorized: false },
  }),
});

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 8) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (min 8 chars) in .env.local");
  }

  await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) },
    create: { email, name: "Admin", role: "ADMIN", referralCode: generateReferralCode(), passwordHash: await bcrypt.hash(password, 12) },
  });

  for (const [name, slug] of [["Changelog", "changelog"], ["Guide", "guide"], ["News", "news"]]) {
    await prisma.category.upsert({ where: { slug }, update: {}, create: { name, slug } });
  }
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
