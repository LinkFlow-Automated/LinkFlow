import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Resolve the profile addressed by an `/admin/[layout]` route segment, ensuring
 * it belongs to the authenticated user. Returns null when there is no session
 * or the profile isn't owned by the caller.
 */
export async function getActiveProfile(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;

  return prisma.profile.findFirst({
    where: { username, userId: session.user.id },
  });
}

/**
 * Week-over-week percentage change from a chronological daily-clicks series
 * (oldest → newest). Returns 0 when there's no prior-week baseline.
 */
export function weekOverWeekChange(daily: { clicks: number }[]): number {
  const n = daily.length;
  if (n < 8) return 0;
  const last7 = daily.slice(n - 7).reduce((s, d) => s + d.clicks, 0);
  const prev7 = daily.slice(Math.max(0, n - 14), n - 7).reduce(
    (s, d) => s + d.clicks,
    0
  );
  if (prev7 === 0) return last7 > 0 ? 100 : 0;
  return ((last7 - prev7) / prev7) * 100;
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}
