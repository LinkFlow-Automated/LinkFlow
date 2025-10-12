import { prisma } from "../prisma";

export async function getProviderData(userId: string) {
  const result = await prisma.providerAcc.findMany({
    where: {
      userId,
    },
  });
  if (!result) return null;
  return result;
}
