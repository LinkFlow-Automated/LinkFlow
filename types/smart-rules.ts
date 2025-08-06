export interface EvaluationContext {
  userAgent: string;
  country?: string;
  device?: "mobile" | "desktop" | "tablet";
  platform?: string;
  timestamp: Date;
  userId?: string;
  isAuthenticated?: boolean;
  timezone?: string;
}

export interface RuleEvaluationResult {
  linkId: string;
  isVisible: boolean;
  shouldFeature: boolean;
  reasons: string[];
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
  scheduledAt?: Date;
  order?: number;
  expiresAt?: Date;
  rules?: {
    countryAllow?: string[];
    countryBlock?: string[];
    maxClicks?: number;
    autoFeatureIfClicks?: number;
    allowedDevices?: ("mobile" | "desktop" | "tablet")[];
    startDate?: string;
    endDate?: string;
    timeWindows?: Array<{
      days: string[];
      start: string;
      end: string;
    }>;
    requiresAuth?: boolean;
    platformAllow?: string[];
    userSegmentAllow?: string[];
  };
}
