import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

import prisma from "@/lib/prisma";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.name = (user as User).name as unknown as string;
        token.email = (user as User).email as unknown as string;
      }

      return token;
    },
    session({ session, token }) {
      if (token && session && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as unknown as string;
        session.user.email = token.email as unknown as string;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
});
