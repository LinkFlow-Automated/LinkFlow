"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import type { SocialLink } from "../social-platforms";

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
  profileId: string,
  data: {
    displayName?: string;
    image?: string;
    username?: string;
    bio?: string;
  }
) => {
  const user = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data,
  });
  return user;
};

export const updateProfileSocials = async (
  profileId: string,
  socials: SocialLink[]
) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  // Only let a user edit their own profile's socials.
  const owned = await prisma.profile.findFirst({
    where: { id: profileId, userId: session.user.id },
    select: { id: true },
  });
  if (!owned) throw new Error("Forbidden");

  const cleaned = socials
    .filter((s) => s.platform && s.url)
    .map((s) => ({ platform: s.platform, url: s.url }));

  return prisma.profile.update({
    where: { id: profileId },
    data: { socialLinks: cleaned },
  });
};
