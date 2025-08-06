import { NextRequest, NextResponse } from "next/server";
import { EvaluationContext, LinkWithRules } from "@/types/smart-rules";
import { DeviceDetector } from "@/lib/services/device-detection";
import { SmartRulesEngine } from "@/lib/services/smart-rules-engine";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { links, context: providedContext } = body;

    // Build evaluation context
    const userAgent = request.headers.get("user-agent") || "";
    const country =
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-country-code") ||
      providedContext?.country;

    const context: EvaluationContext = {
      userAgent,
      country,
      device: DeviceDetector.detectDevice(userAgent),
      platform: DeviceDetector.detectPlatform(providedContext?.referrer),
      timestamp: new Date(),
      userId: providedContext?.userId,
      isAuthenticated: providedContext?.isAuthenticated || false,
      timezone: providedContext?.timezone || "UTC",
    };

    // Evaluate all links
    const result = SmartRulesEngine.getProcessedLinks(links, context);

    return NextResponse.json({
      success: true,
      data: {
        visible: result.visible,
        featured: result.featured,
        evaluations: result.evaluations,
        context: {
          device: context.device,
          country: context.country,
          platform: context.platform,
          timestamp: context.timestamp.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("Rules evaluation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate rules" },
      { status: 500 }
    );
  }
}
