"use server";

import { auth } from "@/auth";
import { TimeLimit } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";

export const updateUserProfileInfo = async (
  userName: string,
  email: string,
  timeLimit: TimeLimit,
) => {
  const session = await auth();

  console.log("STARTED");

  console.log({ email, name: userName, timeLimit });

  if (session?.user?.email) {
    const updatedProfile = await prisma.user.update({
      where: { email: session.user.email },
      data: { email, name: userName, timeLimit },
    });

    return { status: true, data: updatedProfile };
  }

  return { status: false, data: "Internal Server Problem" };
};
