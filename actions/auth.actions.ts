"use server";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

export async function signup(
  username: string,
  email: string,
  password: string,
) {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    return { status: false, data: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: { name: username, email, password: hashedPassword },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return { status: true, data: newUser };
}
