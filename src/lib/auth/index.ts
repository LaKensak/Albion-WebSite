import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { authConfig } from "./config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      discordId?: string | null;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
        session.user.discordId = dbUser.discordId;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "discord" && user.id) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            discordId: account.providerAccountId,
            discordTag: user.name,
          },
        });
      }
      return true;
    },
  },
  session: { strategy: "database" },
});
