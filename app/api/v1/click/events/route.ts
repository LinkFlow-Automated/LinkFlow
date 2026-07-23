import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClickEvents } from "@/lib/services/link-analitycs";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";

const bodySchema = z.object({
  linkId: z.string().min(1),
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  abVariant: z.enum(["A", "B"]).optional(),
});

// Public endpoint (called from bio pages by visitors). No auth, but IP + link
// rate limited to curb click-spam / inflation.
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    const json = await req.json();
    const { linkId, utmCampaign, utmMedium, utmSource, abVariant } =
      bodySchema.parse(json);

    const limited = await enforceRateLimit(`v1:click:${ip}:${linkId}`, {
      limit: 30,
      windowSec: 60,
    });
    if (limited) return limited;

    const headers = req.headers;
    const userAgent = headers.get("user-agent") || "";
    const referrer = headers.get("referer") || "";

    const created = await createClickEvents({
      linkId,
      referrer,
      userAgent,
      ip,
      utmCampaign,
      utmMedium,
      utmSource,
      abVariant,
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to record click event" },
      { status: 500 }
    );
  }
}


