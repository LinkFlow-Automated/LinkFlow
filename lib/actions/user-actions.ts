import { prisma } from "../prisma";

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      links: true,
    },
  });
  return user;
};
