import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { signInSchema } from "@/lib/zod";

export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<any> => {
        try {
          let user = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          user = await prisma.user.findUnique({
            where: { email: email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });

          if (!user) return null;

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password,
          );

          if (!isPasswordMatched) {
            throw new Error("Invalid credentials.");
          }

          // return JSON object with the user data
          return { ...user, password: null };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
