import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClickEvents } from "@/lib/services/link-analitycs";

const bodySchema = z.object({
  linkId: z.string().min(1),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { linkId, utmCampaign, utmMedium, utmSource } = bodySchema.parse(json);

    const headers = req.headers;
    const userAgent = headers.get("user-agent") || "";
    // Trust proxy header first, fallback to remote address if available
    const forwardedFor = headers.get("x-forwarded-for");
    const ip = (forwardedFor ? forwardedFor.split(",")[0]?.trim() : undefined) ||
      (headers.get("x-real-ip") || "0.0.0.0");
    const referrer = headers.get("referer") || "";

    const created = await createClickEvents({
      linkId,
      referrer,
      userAgent,
      ip,
      utmCampaign,
      utmMedium,
      utmSource,
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


