import { getLinkStats } from "@/lib/services/link-analitycs";
import { periodToDateRange } from "@/lib/utils";
import { getLinkStatsURLQuerySchema } from "@/lib/validations/clickEvents";
import { ZodError } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getPrincipal, unauthorized } from "@/lib/api/guard";
import { enforceRateLimit } from "@/lib/api/rate-limit";

export async function GET(req: NextRequest) {
  try {
    const principal = await getPrincipal(req);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(`v1:stats:${principal.userId}`, {
      limit: 120,
      windowSec: 60,
    });
    if (limited) return limited;

    const { searchParams } = new URL(req.url);
    const queryData = Object.fromEntries(searchParams.entries());

    const validatedQuery = getLinkStatsURLQuerySchema.parse(queryData);

    let dateRange = validatedQuery.dateRange;
    if (validatedQuery.period && !dateRange) {
      dateRange = periodToDateRange(
        validatedQuery.period
        // validatedQuery.timezone
      );
    }

    // getLinkStats scopes by link.profile.userId — always force it to the
    // authenticated user so callers can never read another user's analytics.
    const stats = await getLinkStats(
      principal.userId,
      validatedQuery.linkId,
      dateRange as any
    );

    return NextResponse.json(stats);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
