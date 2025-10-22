"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";

export const getAllTenants = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const data = await prisma.profile.findMany({
      where: { userId: session?.user.id as string },
      orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }],
    });
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const getTenantBySlug = async (slug: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const data = await prisma.profile.findUnique({
      where: {
        userId: session?.user.id as string,
        slug,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
