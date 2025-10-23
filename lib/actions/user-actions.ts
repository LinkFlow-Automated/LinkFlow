"use server";

import { prisma } from "../prisma";

export const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profiles: {
        include: {
          links: true,
        },
      },
    },
  });
  return data;
};

export const updateUserProfile = async (
  userId: string,
  data: { name?: string; image?: string; username?: string; bio?: string }
) => {
  const user = await prisma.profile.update({
    where: {
      id: userId,
    },
    data,
  });
  return user;
};
