"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const categoryUpdateAction = async ({
  id,
  category,
  color,
}: {
  id: number;
  category: string;
  color: string;
}) => {
  console.log({
    id,
    category,
    color,
  });
  const result = await prisma.category.update({
    where: { id },
    data: { category, color },
  });

  revalidatePath("/profile");
};

export const categoryDeleteAction = async ({ id }: { id: number }) => {
  const result = await prisma.category.delete({ where: { id } });

  revalidatePath("/profile");
};

export const categoryCreateAction = async ({
  color,
  category,
}: {
  color: string;
  category: string;
}) => {
  const session = await auth();

  if (session?.user?.id) {
    const result = await prisma.category.create({
      data: { color, category, userId: +session.user.id },
    });
  }

  revalidatePath("/profile");
};
