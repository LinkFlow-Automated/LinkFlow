import { NextRequest, NextResponse } from "next/server";
import { EvaluationContext } from "@/types/smart-rules";
import { DeviceDetector } from "@/lib/services/device-detection";
import { SmartRulesEngine } from "@/lib/services/smart-rules-engine";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";

// Public, stateless rule evaluation (operates only on links in the request
// body). IP rate limited to prevent abuse of the compute.
export async function POST(request: NextRequest) {
  try {
    const limited = await enforceRateLimit(
      `v1:evaluate:${getClientIp(request)}`,
      { limit: 60, windowSec: 60 }
    );
    if (limited) return limited;

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
