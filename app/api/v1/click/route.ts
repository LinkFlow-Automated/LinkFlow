import { getLinkStats } from "@/lib/link-analitycs";
import { periodToDateRange } from "@/lib/utils";
import { getLinkStatsURLQuerySchema } from "@/lib/validations/clickEvents";
import { ZodError } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const stats = await getLinkStats(
      validatedQuery.userId,
      validatedQuery.linkId,
      dateRange
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
