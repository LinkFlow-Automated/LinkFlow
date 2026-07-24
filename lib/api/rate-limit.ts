import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the current window resets. */
  reset: number;
};

/**
 * Fixed-window rate limiter backed by Redis.
 *
 * Fails OPEN when REDIS_URL is not configured or Redis is unreachable, so a
 * Redis outage degrades to "no limiting" rather than taking down the API.
 */
export async function rateLimit(
  identifier: string,
  { limit, windowSec }: { limit: number; windowSec: number }
): Promise<RateLimitResult> {
  if (!process.env.REDIS_URL) {
    return { success: true, limit, remaining: limit, reset: windowSec };
  }

  try {
    const key = `ratelimit:${identifier}`;
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSec);
    }
    const ttl = await redis.ttl(key);
    return {
      success: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
      reset: ttl >= 0 ? ttl : windowSec,
    };
  } catch (error) {
    console.error("[rate-limit] Redis unavailable, allowing request:", error);
    return { success: true, limit, remaining: limit, reset: windowSec };
  }
}

/** Best-effort client IP from proxy headers. */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "0.0.0.0";
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

export function tooManyRequests(reset: number) {
  return NextResponse.json(
    { error: "Rate limit exceeded. Please try again later." },
    { status: 429, headers: { "Retry-After": String(reset) } }
  );
}

/**
 * Enforce a rate limit for `identifier`. Returns a 429 response when the caller
 * is over the limit, otherwise null so the handler can continue.
 */
export async function enforceRateLimit(
  identifier: string,
  opts: { limit: number; windowSec: number }
): Promise<NextResponse | null> {
  const result = await rateLimit(identifier, opts);
  return result.success ? null : tooManyRequests(result.reset);
}
