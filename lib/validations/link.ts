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
  countryAllow: z.array(z.string().length(2)).optional(), // ISO 3166-1 alpha-2
  countryBlock: z.array(z.string().length(2)).optional(),
  maxClicks: z.number().int().positive().optional(),
  allowedDevices: z.enum(["mobile", "desktop", "tablet"]).array().optional(),
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
  requiresAuth: z.boolean().optional(),
  platformAllow: z.array(z.string()).optional(),
  userSegmentAllow: z.array(z.string()).optional(),
});

// Validation schema for GET request query parameters
export const getLinkQuerySchema = z.object({
  userId: z.string().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  visibility: z.nativeEnum(Visibility).optional(),
  sortBy: z.enum(["order", "createdAt", "title", "clicks"]).default("order"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Validation schema for POST request (creating links)
export const createLinkSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").nullable(),
  url: z.string().url("Invalid URL format"),
  category: z.string().max(50, "Category too long").nullable(),
  order: z.number().int().min(0),
  clicks: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  autoSyncId: z.string().nullable(),
  platform: z.string().max(50, "Platform too long").nullable(),
  icon: z.string().url("Invalid icon URL").nullable(),
  isArchived: z.boolean().default(false),
  visibility: z.nativeEnum(Visibility).default(Visibility.PUBLIC),
  scheduledAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  rules: rulesSchema,
  createdAt: z.coerce.date().default(() => new Date()),
});

export const updateLinkSchema = z.object({
  id: z.string().min(1, "Id is required"),
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").nullable(),
  url: z.string().url("Invalid URL format"),
  category: z.string().max(50, "Category too long").nullable(),
  order: z.number().int().min(0),
  clicks: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  autoSyncId: z.string().nullable(),
  platform: z.string().max(50, "Platform too long").nullable(),
  icon: z.string().url("Invalid icon URL").nullable(),
  isArchived: z.boolean().default(false),
  visibility: z.nativeEnum(Visibility).default(Visibility.PUBLIC),
  scheduledAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  rules: rulesSchema,
  createdAt: z.coerce.date().default(() => new Date()),
});

export type GetLinkQuery = z.infer<typeof getLinkQuerySchema>;
export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
