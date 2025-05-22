import { ProfilePageClient } from "./_components/client-components";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function ProfilePageServer() {
  const session = await auth();

  if (!session?.user?.id)
    return { status: false, data: "user is not authemticated" };

  const result = await prisma.category.findMany({
    where: { userId: +session.user.id },
    select: { id: true, category: true, color: true },
  });

  console.log(result);

  return <ProfilePageClient data={result} />;
}
