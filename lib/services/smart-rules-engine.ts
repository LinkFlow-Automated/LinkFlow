import {
  LinkWithRules,
  EvaluationContext,
  RuleEvaluationResult,
} from "@/types/smart-rules";

export class SmartRulesEngine {
  /**
   * Main evaluation function - determines if a link should be visible and featured
   */
  static evaluateLink(
    link: LinkWithRules,
    context: EvaluationContext
  ): RuleEvaluationResult {
    const result: RuleEvaluationResult = {
      linkId: link.id,
      isVisible: true,
      shouldFeature: link.featured,
      reasons: [],
    };

    // If no rules defined, use basic visibility
    if (!link.rules) {
      result.reasons.push("No rules defined - using default visibility");
      return result;
    }

    // 1. Hard blockers (these override everything)
    const blockResult = SmartRulesEngine.checkBlockingRules(link, context);
    if (blockResult.blocked) {
      result.isVisible = false;
      result.blockedBy = blockResult.reason;
      result.reasons.push(`Blocked: ${blockResult.reason}`);
      return result;
    }

    // 2. Visibility rules
    const visibilityResult = SmartRulesEngine.checkVisibilityRules(link, context);
    if (!visibilityResult.visible) {
      result.isVisible = false;
      result.blockedBy = visibilityResult.reason;
      result.reasons.push(`Hidden: ${visibilityResult.reason}`);
      return result;
    }

    // 3. Auto-feature rules
    const featureResult = SmartRulesEngine.checkAutoFeatureRules(link, context);
    if (featureResult.shouldFeature) {
      result.shouldFeature = true;
      result.featuredReason = featureResult.reason;
      result.reasons.push(`Featured: ${featureResult.reason}`);
    }

    result.reasons.push("All rules passed - link is visible");
    return result;
  }

  /**
   * Check blocking rules (country blocks, click limits, etc.)
   */
  private static checkBlockingRules(
    link: LinkWithRules,
    context: EvaluationContext
  ): { blocked: boolean; reason?: string } {
    const rules = link.rules!;

    // Country blocking
    if (rules.countryBlock && context.country) {
      if (rules.countryBlock.includes(context.country)) {
        return {
          blocked: true,
          reason: `Country ${context.country} is blocked`,
        };
      }
    }

    // Max clicks reached
    if (rules.maxClicks && link.clicks >= rules.maxClicks) {
      return {
        blocked: true,
        reason: `Max clicks (${rules.maxClicks}) reached`,
      };
    }

    // Device restrictions
    if (rules.allowedDevices && context.device) {
      if (!rules.allowedDevices.includes(context.device)) {
        return {
          blocked: true,
          reason: `Device ${context.device} not allowed`,
        };
      }
    }

    // Authentication requirement
    if (rules.requiresAuth && !context.isAuthenticated) {
      return { blocked: true, reason: "Authentication required" };
    }

    return { blocked: false };
  }

  /**
   * Check visibility rules (schedules, time windows, geo-targeting)
   */
  private static checkVisibilityRules(
    link: LinkWithRules,
    context: EvaluationContext
  ): { visible: boolean; reason?: string } {
    const rules = link.rules!;
    const now = context.timestamp;

    // Schedule check (startDate/endDate)
    if (rules.startDate) {
      const startDate = new Date(rules.startDate);
      if (now < startDate) {
        return {
          visible: false,
          reason: `Not yet active (starts ${startDate.toISOString()})`,
        };
      }
    }

    if (rules.endDate) {
      const endDate = new Date(rules.endDate);
      if (now > endDate) {
        return {
          visible: false,
          reason: `Expired (ended ${endDate.toISOString()})`,
        };
      }
    }

    // Legacy scheduled/expires fields
    if (link.scheduledAt && now < link.scheduledAt) {
      return {
        visible: false,
        reason: `Scheduled for ${link.scheduledAt.toISOString()}`,
      };
    }

    if (link.expiresAt && now > link.expiresAt) {
      return {
        visible: false,
        reason: `Expired at ${link.expiresAt.toISOString()}`,
      };
    }

    // Time windows check
    if (rules.timeWindows && rules.timeWindows.length > 0) {
      const timeWindowResult = SmartRulesEngine.checkTimeWindows(
        rules.timeWindows,
        now,
        context.timezone
      );
      if (!timeWindowResult.inWindow) {
        return { visible: false, reason: timeWindowResult.reason };
      }
    }

    // Country allow list
    if (rules.countryAllow && context.country) {
      if (!rules.countryAllow.includes(context.country)) {
        return {
          visible: false,
          reason: `Country ${context.country} not in allow list`,
        };
      }
    }

    // Platform restrictions
    if (rules.platformAllow && context.platform) {
      if (!rules.platformAllow.includes(context.platform)) {
        return {
          visible: false,
          reason: `Platform ${context.platform} not allowed`,
        };
      }
    }

    return { visible: true };
  }

  /**
   * Check if current time falls within allowed time windows
   */
  private static checkTimeWindows(
    timeWindows: Array<{ days: string[]; start: string; end: string }>,
    timestamp: Date,
    timezone?: string
  ): { inWindow: boolean; reason?: string } {
    // Convert timestamp to the specified timezone or use UTC
    const targetTime = timezone
      ? new Date(timestamp.toLocaleString("en-US", { timeZone: timezone }))
      : timestamp;

    const currentDay = targetTime.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: timezone,
    });
    const currentTime = targetTime.toTimeString().slice(0, 5); // HH:MM format

    // Check if any time window matches
    for (const window of timeWindows) {
      // Check if current day is in allowed days
      if (window.days.includes(currentDay)) {
        // Check if current time is within the window
        if (SmartRulesEngine.isTimeInRange(currentTime, window.start, window.end)) {
          return { inWindow: true };
        }
      }
    }

    return {
      inWindow: false,
      reason: `Outside allowed time windows (current: ${currentDay} ${currentTime})`,
    };
  }

  /**
   * Check if a time falls within a range (handles overnight ranges)
   */
  private static isTimeInRange(
    time: string,
    start: string,
    end: string
  ): boolean {
    const timeMinutes = SmartRulesEngine.timeToMinutes(time);
    const startMinutes = SmartRulesEngine.timeToMinutes(start);
    const endMinutes = SmartRulesEngine.timeToMinutes(end);

    // Handle overnight ranges (e.g., 22:00 to 06:00)
    if (startMinutes > endMinutes) {
      return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }

    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
  }

  /**
   * Convert HH:MM to minutes since midnight
   */
  private static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Check auto-feature rules based on performance
   */
  private static checkAutoFeatureRules(
    link: LinkWithRules,
    context: EvaluationContext
  ): { shouldFeature: boolean; reason?: string } {
    const rules = link.rules!;

    // Auto-feature if clicks threshold is met
    if (rules.autoFeatureIfClicks && link.clicks >= rules.autoFeatureIfClicks) {
      return {
        shouldFeature: true,
        reason: `Auto-featured: ${link.clicks} clicks >= ${rules.autoFeatureIfClicks} threshold`,
      };
    }

    return { shouldFeature: false };
  }

  /**
   * Bulk evaluate multiple links for a user
   */
  static evaluateLinks(
    links: LinkWithRules[],
    context: EvaluationContext
  ): RuleEvaluationResult[] {
    return links.map((link) => SmartRulesEngine.evaluateLink(link, context));
  }

  /**
   * Get visible and featured links with proper ordering
   */
  static getProcessedLinks(
    links: LinkWithRules[],
    context: EvaluationContext
  ): {
    visible: LinkWithRules[];
    featured: LinkWithRules[];
    evaluations: RuleEvaluationResult[];
  } {
    const evaluations = SmartRulesEngine.evaluateLinks(links, context);
    const visible: LinkWithRules[] = [];
    const featured: LinkWithRules[] = [];

    evaluations.forEach((evaluation, index) => {
      if (evaluation.isVisible) {
        const link = links[index];
        visible.push(link);

        if (evaluation.shouldFeature) {
          featured.push(link);
        }
      }
    });

    // Sort visible links by order
    visible.sort((a, b) => a.order || 0 - (b.order || 0));

    // Sort featured links by clicks (descending) then by order
    featured.sort((a, b) => {
      if (b.clicks !== a.clicks) {
        return b.clicks - a.clicks;
      }
      return (a.order || 0) - (b.order || 0);
    });

    return { visible, featured, evaluations };
  }
}
