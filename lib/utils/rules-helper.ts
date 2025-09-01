import { EvaluationContext, Rule } from "@/types/smart-rules";
import { NextRequest } from "next/server";
import { DeviceDetector } from "../services/device-detection";

export class RulesHelpers {
  /**
   * Create a context from request headers and user data
   */
  static createEvaluationContext(
    request: NextRequest,
    user?: { id: string; timezone?: string }
  ): EvaluationContext {
    const userAgent = request.headers.get("user-agent") || "";
    const referrer = request.headers.get("referer") || undefined;

    // Try different country headers (Cloudflare, custom, etc.)
    const country =
      request.headers.get("cf-ipcountry") ||
      request.headers.get("x-country-code") ||
      request.headers.get("country") ||
      undefined;

    return {
      userAgent,
      country,
      device: DeviceDetector.detectDevice(userAgent),
      platform: DeviceDetector.detectPlatform(referrer),
      timestamp: new Date(),
      userId: user?.id,
      isAuthenticated: !!user,
      timezone: user?.timezone || "UTC",
    };
  }

  /**
   * Generate default rules for common scenarios
   */
  static generateDefaultRules(
    scenario: "business-hours" | "weekend-only" | "mobile-only" | "us-only"
  ) {
    switch (scenario) {
      case "business-hours":
        return {
          timeWindows: [
            {
              days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              start: "09:00",
              end: "17:00",
            },
          ],
        };

      case "weekend-only":
        return {
          timeWindows: [
            {
              days: ["Saturday", "Sunday"],
              start: "00:00",
              end: "23:59",
            },
          ],
        };

      case "mobile-only":
        return {
          allowedDevices: ["mobile"],
        };

      case "us-only":
        return {
          countryAllow: ["US"],
        };

      default:
        return {};
    }
  }

  /**
   * Validate rules configuration
   */
  static validateRules(rules: Rule): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check date consistency
    if (rules.startDate && rules.endDate) {
      const start = new Date(rules.startDate);
      const end = new Date(rules.endDate);
      if (start >= end) {
        errors.push("Start date must be before end date");
      }
    }

    // Check time windows
    if (rules.timeWindows) {
      for (const window of rules.timeWindows) {
        if (!window.days || window.days.length === 0) {
          errors.push("Time windows must specify at least one day");
        }
        if (
          window.start >= window.end &&
          window.start !== "00:00" &&
          window.end !== "00:00"
        ) {
          // Allow overnight windows but flag potential issues
          console.warn("Overnight time window detected:", window);
        }
      }
    }

    // Check click thresholds
    if (rules.maxClicks && rules.autoFeatureIfClicks) {
      if (rules.autoFeatureIfClicks >= rules.maxClicks) {
        errors.push("Auto-feature threshold should be less than max clicks");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
