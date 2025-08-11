export interface osInfo {
  name: string;
  version: string;
}

export interface  EvaluationContext {
  userAgent: string;
  country?: string;
  device?: "mobile" | "desktop" | "tablet";
  browserVersion?: string;
  platform?: string;
  timestamp: Date;
  userId?: string;
  isAuthenticated?: boolean;
  timezone?: string;
  ipAddress?: string;
  ip?: string;

  // New properties
  region?: string; // State/province in format "US-CA"
  browser?: {
    name: string; // "Chrome", "Firefox", "Safari", etc.
    version: string;
  };
  os?: {
    name: string; // "iOS", "Android", "Windows", "macOS"
    version: string;
  };
  sessionId?: string;
  dailyClicks?: Record<string, number>; // linkId -> count
  hourlyClicks?: Record<string, number>; // linkId -> count
  abTestAssignments?: Record<string, "A" | "B">; // testId -> variant
  userSegments?: string[]; // User segmentation tags

  // language
  language?: string;

}

export interface RuleEvaluationResult {
  linkId: string;
  isVisible: boolean;
  shouldFeature: boolean;
  reasons: string[];
  abTestVariant?: "A" | "B";
  blockedBy?: string;
  featuredReason?: string;
}

export interface LinkWithRules {
  id: string;
  title: string;
  url: string;
  clicks: number;
  featured: boolean;
  visibility: string;
  order?: number;
  scheduledAt?: Date;
  expiresAt?: Date;
  rules?: {
    // Geographic targeting
    countryAllow?: string[];
    countryBlock?: string[];
    regionAllow?: string[];
    regionBlock?: string[];

    // Advanced click rules
    maxClicks?: number;
    maxClicksPerDay?: number;
    maxClicksPerHour?: number;
    minClicksToShow?: number;
    resetPeriod?: "daily" | "weekly" | "monthly";

    // Device targeting
    allowedDevices?: ("mobile" | "desktop" | "tablet")[];

    // languages targeting
    allowedLanguages?: string[];
    blockedLanguages?: string[];
    localizedContent?: {
      // Show different content by language
      [languageCode: string]: {
        title: string;
        description: string;
      };
    };

    // Browser/OS targeting
    allowedBrowsers?: string[];
    blockedBrowsers?: string[];
    allowedOS?: string[];
    blockedOS?: string[];
    minBrowserVersion?: {
      chrome?: string;
      firefox?: string;
      safari?: string;
      edge?: string;
    };

    // Scheduling
    startDate?: string;
    endDate?: string;
    timeWindows?: Array<{
      days: string[];
      start: string;
      end: string;
    }>;

    // A/B Testing
    abTestId?: string;
    abTestVariant?: "A" | "B";
    trafficSplit?: number;
    testStartDate?: string;
    testEndDate?: string;

    // Authentication and platform
    requiresAuth?: boolean;
    platformAllow?: string[];
    userSegmentAllow?: string[];

    // Rotation groups
    rotationGroup?: string;
    rotationWeight?: number;

    // Auto-feature rules
    autoFeatureIfClicks?: number;

    // Location radius targeting
    radiusTargeting?: {
      lat: number;
      lng: number;
      radius: number; // in km
    };
  };
}
