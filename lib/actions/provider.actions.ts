"use server";
import { prisma } from "../prisma";

export async function getProviderData(userId: string) {
  const result = await prisma.providerAcc.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      provider: true,
      expiresAt: true,
    },
  });
  return result;
}
