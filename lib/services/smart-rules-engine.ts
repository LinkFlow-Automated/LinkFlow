import {
  LinkWithRules,
  EvaluationContext,
  RuleEvaluationResult,
  osInfo,
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
      abTestVariant: undefined,
    };

    // If no rules defined, use basic visibility
    if (!link.rules) {
      result.reasons.push("No rules defined - using default visibility");
      return result;
    }

    // 1. Hard blockers (these override everything)
    const blockResult = this.checkBlockingRules(link, context);
    if (blockResult.blocked) {
      result.isVisible = false;
      result.blockedBy = blockResult.reason;
      result.reasons.push(`Blocked: ${blockResult.reason}`);
      return result;
    }

    // 2. Visibility rules
    const visibilityResult = this.checkVisibilityRules(link, context);
    if (!visibilityResult.visible) {
      result.isVisible = false;
      result.blockedBy = visibilityResult.reason;
      result.reasons.push(`Hidden: ${visibilityResult.reason}`);
      return result;
    }

    // 3. Auto-feature rules
    const featureResult = this.checkAutoFeatureRules(link, context);
    if (featureResult.shouldFeature) {
      result.shouldFeature = true;
      result.featuredReason = featureResult.reason;
      result.reasons.push(`Featured: ${featureResult.reason}`);
    }

    // 4. A/B Test Assignment
    if (link.rules.abTestId) {
      result.abTestVariant = this.getABTestVariant(link, context);
      if (result.abTestVariant !== link.rules.abTestVariant) {
        result.isVisible = false;
        result.blockedBy = "Not in target AB test variant";
        result.reasons.push(
          `AB Test Variant: ${result.abTestVariant} (required: ${link.rules.abTestVariant})`
        );
        return result;
      }
      result.reasons.push(`AB Test Variant: ${result.abTestVariant}`);
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

    // Region blocking
    if (rules.regionBlock && context.region) {
      if (rules.regionBlock.includes(context.region)) {
        return {
          blocked: true,
          reason: `Region ${context.region} is blocked`,
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

    // Daily click limit
    if (
      rules.maxClicksPerDay &&
      (context.dailyClicks?.[link.id] ?? 0) >= rules.maxClicksPerDay
    ) {
      return {
        blocked: true,
        reason: `Daily click limit (${rules.maxClicksPerDay}) reached`,
      };
    }

    // Hourly click limit
    if (
      rules.maxClicksPerHour &&
      (context.hourlyClicks?.[link.id] ?? 0) >= rules.maxClicksPerHour
    ) {
      return {
        blocked: true,
        reason: `Hourly click limit (${rules.maxClicksPerHour}) reached`,
      };
    }

    // Minimum clicks to show
    if (rules.minClicksToShow && link.clicks < rules.minClicksToShow) {
      return {
        blocked: true,
        reason: `Minimum clicks (${rules.minClicksToShow}) not reached`,
      };
    }

    // Max clicks reached
    if (rules.maxClicks && link.clicks >= rules.maxClicks) {
      return {
        blocked: true,
        reason: `Max clicks (${rules.maxClicks}) reached`,
      };
    }

    // Language restrictions
    if (rules.allowedLanguages && context.language) {
      if (!rules.allowedLanguages.includes(context.language as string)) {
        return {
          blocked: true,
          reason: `Language ${context.language} not allowed`,
        };
      }
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

    // Browser restrictions
    if (rules.allowedBrowsers && context.browser) {
      if (!rules.allowedBrowsers.includes(context.browser.name)) {
        return {
          blocked: true,
          reason: `Browser ${context.browser.name} not allowed`,
        };
      }
    }

    // OS restrictions
    if (rules.allowedOS && context.os) {
      if (!rules.allowedOS.includes(context.os.name)) {
        return {
          blocked: true,
          reason: `OS ${context.os.name} not allowed`,
        };
      }
    }

    // Browser version check
    if (rules.minBrowserVersion && context.browser) {
      const minVersion =
        rules.minBrowserVersion[
          context.browser.name.toLowerCase() as keyof typeof rules.minBrowserVersion
        ];
      if (
        minVersion &&
        this.compareVersions(
          this.parseVersion(context.browser.version),
          this.parseVersion(minVersion)
        ) < 0
      ) {
        return {
          blocked: true,
          reason: `Browser ${context.browser.name} version ${context.browser.version} is below minimum ${minVersion}`,
        };
      }
    }

    // Authentication requirement
    if (rules.requiresAuth && !context.isAuthenticated) {
      return { blocked: true, reason: "Authentication required" };
    }

    // AB Test date range
    if (rules.abTestId && rules.testStartDate && rules.testEndDate) {
      const now = context.timestamp;
      const startDate = new Date(rules.testStartDate);
      const endDate = new Date(rules.testEndDate);

      if (now < startDate || now > endDate) {
        return {
          blocked: true,
          reason: `AB test not active (${startDate.toISOString()} - ${endDate.toISOString()})`,
        };
      }
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
      const timeWindowResult = this.checkTimeWindows(
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

    // Region allow list
    if (rules.regionAllow && context.region) {
      if (!rules.regionAllow.includes(context.region)) {
        return {
          visible: false,
          reason: `Region ${context.region} not in allow list`,
        };
      }
    }

    // Language restrictions
    if (rules.allowedLanguages && context.language) {
      if (!rules.allowedLanguages.includes(context.language as string)) {
        return {
          visible: false,
          reason: `Language ${context.language} not allowed`,
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

    // Browser allow list
    if (rules.allowedBrowsers && context.browser) {
      if (!rules.allowedBrowsers.includes(context.browser.name)) {
        return {
          visible: false,
          reason: `Browser ${context.browser.name} not allowed`,
        };
      }
    }

    // OS allow list
    if (rules.allowedOS && context.os) {
      if (!rules.allowedOS.includes(context.os.name)) {
        return {
          visible: false,
          reason: `OS ${context.os.name} not allowed`,
        };
      }
    }

    // User segment restriction
    if (rules.userSegmentAllow && context.userSegments) {
      if (
        rules.userSegmentAllow.some((segment) =>
          context?.userSegments?.includes(segment)
        )
      ) {
        return {
          visible: false,
          reason: `User segment not allowed`,
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
        if (this.isTimeInRange(currentTime, window.start, window.end)) {
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
    const timeMinutes = this.timeToMinutes(time);
    const startMinutes = this.timeToMinutes(start);
    const endMinutes = this.timeToMinutes(end);

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
    return links.map((link) => this.evaluateLink(link, context));
  }

  /**
   * Get visible and featured links with proper ordering and rotation
   */
  static getProcessedLinks(
    links: LinkWithRules[],
    context: EvaluationContext
  ): {
    visible: LinkWithRules[];
    featured: LinkWithRules[];
    evaluations: RuleEvaluationResult[];
  } {
    const evaluations = this.evaluateLinks(links, context);
    const visible: LinkWithRules[] = [];
    const featured: LinkWithRules[] = [];

    // First pass: collect all visible links
    evaluations.forEach((evaluation, index) => {
      if (evaluation.isVisible) {
        const link = links[index];
        visible.push(link);

        if (evaluation.shouldFeature) {
          featured.push(link);
        }
      }
    });

    // Handle rotation groups
    const processedVisible = this.applyRotationGroups(visible, context);

    // Sort visible links by order
    processedVisible.sort((a, b) => (a.order || 0) - (b.order || 0));

    // Sort featured links by clicks (descending) then by order
    featured.sort((a, b) => {
      if (b.clicks !== a.clicks) {
        return b.clicks - a.clicks;
      }
      return (a.order || 0) - (b.order || 0);
    });

    return { visible: processedVisible, featured, evaluations };
  }

  /**
   * Apply rotation group logic - only show one link per group
   */
  private static applyRotationGroups(
    links: LinkWithRules[],
    context: EvaluationContext
  ): LinkWithRules[] {
    const rotationGroups = new Map<string, LinkWithRules[]>();
    const nonRotatingLinks: LinkWithRules[] = [];

    // Separate links by rotation group
    links.forEach((link) => {
      const rotationGroup = link.rules?.rotationGroup;
      if (rotationGroup) {
        if (!rotationGroups.has(rotationGroup)) {
          rotationGroups.set(rotationGroup, []);
        }
        rotationGroups.get(rotationGroup)!.push(link);
      } else {
        nonRotatingLinks.push(link);
      }
    });

    const result = [...nonRotatingLinks];

    // For each rotation group, select one link to show
    rotationGroups.forEach((groupLinks, groupName) => {
      const selectedLink = this.selectLinkFromRotationGroup(
        groupLinks,
        context,
        groupName
      );
      if (selectedLink) {
        result.push(selectedLink);
      }
    });

    return result;
  }

  /**
   * Select which link to show from a rotation group
   */
  private static selectLinkFromRotationGroup(
    links: LinkWithRules[],
    context: EvaluationContext,
    groupName: string
  ): LinkWithRules | null {
    if (links.length === 0) return null;
    if (links.length === 1) return links[0];

    // Create a deterministic seed based on context and time
    // This ensures the same visitor sees the same link for a period of time
    const rotationSeed = this.createRotationSeed(context, groupName);

    // Use weighted selection if weights are defined
    const hasWeights = links.some((link) => link.rules?.rotationWeight);

    if (hasWeights) {
      return this.weightedSelection(links, rotationSeed);
    } else {
      // Simple round-robin based on seed
      const index = rotationSeed % links.length;
      return links[index];
    }
  }

  /**
   * Create a deterministic seed for rotation selection
   */
  private static createRotationSeed(
    context: EvaluationContext,
    groupName: string
  ): number {
    // Create seed that changes based on hour and user characteristics
    // This makes rotation feel natural while being consistent per user per hour
    const hour = new Date(context.timestamp).getHours();
    const day = new Date(context.timestamp).getDay();

    // Create a simple hash from context
    const contextString = `${context.country || "unknown"}-${
      context.device || "unknown"
    }-${context.userId || "anon"}-${groupName}`;
    let hash = 0;
    for (let i = 0; i < contextString.length; i++) {
      const char = contextString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Combine with time component (changes every hour)
    return Math.abs(hash + hour + day * 24);
  }

  /**
   * Weighted selection for rotation groups
   */
  private static weightedSelection(
    links: LinkWithRules[],
    seed: number
  ): LinkWithRules {
    // Calculate total weight
    const totalWeight = links.reduce((sum, link) => {
      return sum + (link.rules?.rotationWeight || 1);
    }, 0);

    // Generate pseudo-random number based on seed
    const randomValue = (seed % 1000) / 1000; // Convert to 0-1 range
    let weightedRandom = randomValue * totalWeight;

    // Select link based on weights
    for (const link of links) {
      const weight = link.rules?.rotationWeight || 1;
      weightedRandom -= weight;
      if (weightedRandom <= 0) {
        return link;
      }
    }

    // Fallback (shouldn't happen)
    return links[0];
  }

  private static getABTestVariant(
    link: LinkWithRules,
    context: EvaluationContext
  ): "A" | "B" {
    if (!link.rules?.abTestId) return "A"; // Default to control variant

    // Check if user already has a variant assigned
    if (context.abTestAssignments?.[link.rules.abTestId]) {
      return context.abTestAssignments[link.rules.abTestId] as "A" | "B";
    }

    // If this is the control variant, respect the traffic split
    if (link.rules.abTestVariant === "A") {
      const bucketKey = `${link.rules.abTestId}-${
        context.userId || context.sessionId || context.ip
      }`;
      const hash = this.createSimpleHash(bucketKey);
      const bucket = hash % 100;

      if (bucket < (link.rules.trafficSplit || 50)) {
        return "A";
      }
      return "B";
    }

    // For variant B, we only show if explicitly assigned
    return link.rules.abTestVariant || "A";
  }

  private static createSimpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Check if OS matches target specifications
   */
  private static matchesOsTarget(
    targets: Array<{ name: string; minVersion?: string; maxVersion?: string }>,
    os: osInfo
  ): boolean {
    return targets.some((target) => {
      if (target.name.toLowerCase() !== os.name.toLowerCase()) {
        return false;
      }

      // Check version if specified
      if (target.minVersion || target.maxVersion) {
        const osVersion = this.parseVersion(os.version);
        const minVersion = target.minVersion
          ? this.parseVersion(target.minVersion)
          : null;
        const maxVersion = target.maxVersion
          ? this.parseVersion(target.maxVersion)
          : null;

        if (minVersion && this.compareVersions(osVersion, minVersion) < 0) {
          return false;
        }

        if (maxVersion && this.compareVersions(osVersion, maxVersion) > 0) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Parse version string into comparable parts
   */
  private static parseVersion(version: string): number[] {
    return version.split(".").map((part) => {
      const num = parseInt(part, 10);
      return isNaN(num) ? 0 : num;
    });
  }

  /**
   * Compare two version arrays
   */
  private static compareVersions(v1: number[], v2: number[]): number {
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
      const part1 = v1[i] || 0;
      const part2 = v2[i] || 0;
      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }
    return 0;
  }
}
