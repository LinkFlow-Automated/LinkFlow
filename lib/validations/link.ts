import { z } from "zod";
import { Visibility } from "@/lib/generated/prisma";

export const geoSchema = z.object({
  country: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  coordonate: z.tuple([z.number(), z.number()]).nullable().optional(),
  timezone: z.string().nullable().optional(),
});

export const rulesSchema = z.object({
  // Geographic targeting
  countryAllow: z.array(z.string().length(2)).optional(), // ISO 3166-1 alpha-2
  countryBlock: z.array(z.string().length(2)).optional(),
  regionAllow: z.array(z.string()).optional(), // State/province level (e.g., "US-CA", "UK-London")
  regionBlock: z.array(z.string()).optional(),

  // Advanced click rules
  maxClicks: z.number().int().positive().optional(),
  maxClicksPerDay: z.number().int().positive().optional(),
  maxClicksPerHour: z.number().int().positive().optional(),
  minClicksToShow: z.number().int().min(0).optional(),
  resetPeriod: z.enum(["daily", "weekly", "monthly"]).optional(),

  // Device targeting
  allowedDevices: z.enum(["mobile", "desktop", "tablet"]).array().optional(),

  // Browser/OS targeting
  allowedBrowsers: z.array(z.string()).optional(), // Chrome, Firefox, Safari, etc.
  blockedBrowsers: z.array(z.string()).optional(),
  allowedOS: z.array(z.string()).optional(), // iOS, Android, Windows, macOS
  blockedOS: z.array(z.string()).optional(),
  minBrowserVersion: z
    .object({
      chrome: z.string().optional(),
      firefox: z.string().optional(),
      safari: z.string().optional(),
      edge: z.string().optional(),
    })
    .optional(),

  // Scheduling
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  timeWindows: z
    .array(
      z.object({
        days: z.array(
          z.enum([
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ])
        ),
        start: z
          .string()
          .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid start time (HH:mm)"),
        end: z
          .string()
          .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid end time (HH:mm)"),
      })
    )
    .optional(),

  // A/B Testing
  abTestId: z.string().optional(),
  abTestVariant: z.enum(["A", "B"]).optional(),
  trafficSplit: z.number().min(0).max(100).optional(), // Percentage of traffic for this variant
  testStartDate: z.string().datetime().optional(),
  testEndDate: z.string().datetime().optional(),

  // Authentication and platform
  requiresAuth: z.boolean().optional(),
  platformAllow: z.array(z.string()).optional(),
  userSegmentAllow: z.array(z.string()).optional(),

  // Rotation groups
  rotationGroup: z.string().optional(),
  rotationWeight: z.number().int().min(0).optional(),

  // Auto-feature rules
  autoFeatureIfClicks: z.number().int().positive().optional(),
});

// Validation schema for GET request query parameters
export const getLinkQuerySchema = z.object({
  profileId: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  visibility: z.nativeEnum(Visibility).optional(),
  sortBy: z.enum(["order", "createdAt", "title", "clicks"]).default("order"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const metadataSchema = z.object({
  provider: z
    .enum(["spotify", "youtube", "instagram", "soundcloud", "gumroad", "link"])
    .optional(),
  type: z.string().optional(), // e.g. "NEW_ALBUM", "NOW_PLAYING", "CHANNEL", "FEED", "PRODUCTS"
  id: z.string().optional(), // external ID (albumId, channelId, etc.)
  data: z.record(z.any()).optional(), // provider-specific payload
  lastSynced: z.string().datetime().optional(), // ISO string
});

export const themeOverridesSchema = z.object({
  background: z.string().optional(), // hex, rgb, gradient, or "auto" (from image)
  textColor: z.string().optional(), // hex or rgb
  borderRadius: z.number().min(0).max(50).optional(), // px
  shadow: z.boolean().optional(), // enable/disable shadow
  animation: z.string().optional(), // e.g. "fade", "bounce", "zoom"
  layout: z.enum(["compact", "detailed", "media"]).optional(), // card layout style
});

export const ThumbnailType = z.enum(["image", "icon"]);

// Validation schema for POST request (creating links)
export const createLinkSchema = z.object({
  id: z.string().optional(),
  profileId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").nullable(),
  url: z.string().url("Invalid URL format"),
  category: z.string().max(50, "Category too long").nullable(),
  order: z.number().int().min(0),
  clicks: z.number().int().min(0).default(0),
  type: ThumbnailType.nullable().default(null),
  thumbnail: z.string().optional(),
  featured: z.boolean().default(false),
  autoSyncId: z.string().nullable(),
  platform: z.string().max(50, "Platform too long").nullable(),
  // icon: z.string().url("Invalid icon URL").nullable(),
  isArchived: z.boolean().default(false),
  visibility: z.nativeEnum(Visibility).default(Visibility.PUBLIC),
  scheduledAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  redirectTo: z.string().nullable(),
  isHadRedirectLink: z.boolean(),
  layout: z.string().nullable(),
  animation: z.string().nullable(),
  themeOverrides: themeOverridesSchema,
  metadata: metadataSchema,
  rules: rulesSchema,
  createdAt: z.coerce.date().default(() => new Date()),
});

export const updateLinkSchema = z.object({
  id: z.string().min(1, "Id is required"),
  profileId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").nullable(),
  url: z.string().url("Invalid URL format"),
  category: z.string().max(50, "Category too long").nullable(),
  type: ThumbnailType.nullable().default(null),
  thumbnail: z.string().nullable().default(null),
  order: z.number().int().min(0),
  clicks: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  autoSyncId: z.string().nullable(),
  platform: z.string().max(50, "Platform too long").nullable(),
  // icon: z.string().url("Invalid icon URL").nullable(),
  isArchived: z.boolean().default(false),
  visibility: z.nativeEnum(Visibility).default(Visibility.PUBLIC),
  scheduledAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  redirectTo: z.string().nullable(),
  isHadRedirectLink: z.boolean(),
  layout: z.string().nullable(),
  animation: z.string().nullable(),
  themeOverrides: themeOverridesSchema,
  metadata: metadataSchema,
  rules: rulesSchema,
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

export type GetLinkQuery = z.infer<typeof getLinkQuerySchema>;
export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
