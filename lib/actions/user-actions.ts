"use server"

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

export const updateUserProfile = async (
  userId: string,
  data: { name?: string; image?: string; username?: string; bio?: string }
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
  return user;
};
