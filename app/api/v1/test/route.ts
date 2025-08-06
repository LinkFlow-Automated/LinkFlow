import { NextRequest, NextResponse } from "next/server";
import { SmartRulesEngine } from "@/lib/services/smart-rules-engine";
import { RulesHelpers } from "@/lib/utils/rules-helper";
import { LinkWithRules } from "@/types/smart-rules";

export async function POST(request: NextRequest) {
  const testLink: LinkWithRules = {
    id: "test-1",
    title: "Test Link",
    url: "https://example.com",
    clicks: 150,
    featured: false,
    visibility: "PUBLIC",
    order: 1,
    rules: {
      timeWindows: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start: "09:00",
          end: "17:00",
        },
      ],
      countryAllow: ["US", "CA"],
      autoFeatureIfClicks: 100,
      allowedDevices: ["mobile", "desktop"],
    },
  };

  const context = RulesHelpers.createEvaluationContext(request);
  const result = SmartRulesEngine.evaluateLink(testLink, context);

  return NextResponse.json({
    link: testLink,
    context,
    evaluation: result,
  });
}
