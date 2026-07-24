import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type Principal = { userId: string };

/**
 * Resolve the caller from either a Better Auth session cookie or an
 * `x-api-key` header (verified by the apiKey plugin registered in lib/auth.ts).
 * Returns null when the request is unauthenticated.
 */
export async function getPrincipal(req: Request): Promise<Principal | null> {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) return null;
  return { userId: session.user.id };
}

export function unauthorized() {
  return NextResponse.json(
    { error: "Authentication required" },
    { status: 401 }
  );
}

export function forbidden() {
  return NextResponse.json(
    { error: "You do not have access to this resource" },
    { status: 403 }
  );
}

/** True when the given profile belongs to the user. */
export async function userOwnsProfile(
  userId: string,
  profileId: string
): Promise<boolean> {
  const profile = await prisma.profile.findFirst({
    where: { id: profileId, userId },
    select: { id: true },
  });
  return Boolean(profile);
}

/** Fetch a link only if it belongs to one of the user's profiles, else null. */
export async function getOwnedLink(userId: string, linkId: string) {
  return prisma.link.findFirst({
    where: { id: linkId, profile: { userId } },
  });
}

/** From a set of link ids, return only the ones owned by the user. */
export async function filterOwnedLinkIds(
  userId: string,
  linkIds: string[]
): Promise<Set<string>> {
  const owned = await prisma.link.findMany({
    where: { id: { in: linkIds }, profile: { userId } },
    select: { id: true },
  });
  return new Set(owned.map((l) => l.id));
}
