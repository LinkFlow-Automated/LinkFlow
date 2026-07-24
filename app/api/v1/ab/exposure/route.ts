import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";

const bodySchema = z.object({
  linkId: z.string().min(1),
  variant: z.enum(["A", "B"]),
});

// Public endpoint (called from bio pages when a visitor is bucketed into an A/B
// variant). No auth; IP + link rate limited.
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { linkId, variant } = bodySchema.parse(await req.json());

    const limited = await enforceRateLimit(`v1:ab:${ip}:${linkId}`, {
      limit: 30,
      windowSec: 60,
    });
    if (limited) return limited;

    await prisma.abExposure.create({ data: { linkId, variant } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to record exposure" },
      { status: 500 }
    );
  }
}
