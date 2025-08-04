import { z } from "zod";

const dateRangeSchema = z
  .object({
    from: z.coerce.date({
      errorMap: () => ({ message: "Invalid from date format" }),
    }),
    to: z.coerce.date({
      errorMap: () => ({ message: "Invalid to date format" }),
    }),
  })
  .refine((data) => data.from <= data.to, {
    message: "From date must be before or equal to to date",
    path: ["from"],
  })
  .refine(
    (data) => {
      const maxRange = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
      return data.to.getTime() - data.from.getTime() <= maxRange;
    },
    {
      message: "Date range cannot exceed 1 year",
      path: ["to"],
    }
  );

export const getLinkStatsQuerySchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  linkId: z.string().min(1).optional(),
  dateRange: z
    .object({
      from: z
        .string()
        .datetime()
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
      to: z
        .string()
        .datetime()
        .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    })
    .optional()
    .transform((data) => {
      if (!data) return undefined;
      return {
        from: new Date(data.from),
        to: new Date(data.to),
      };
    })
    .pipe(dateRangeSchema.optional()),
  period: z
    .enum([
      "today",
      "yesterday",
      "last7days",
      "last30days",
      "last90days",
      "thisMonth",
      "lastMonth",
      "thisYear",
      "lastYear",
    ])
    .optional(),
  includeMetrics: z
    .array(
      z.enum([
        "overview",
        "topLinks",
        "devices",
        "browsers",
        "os",
        "hourly",
        "daily",
        "referrers",
        "utm",
        "geo",
        "realTime",
      ])
    )
    .optional()
    .default([
      "overview",
      "topLinks",
      "devices",
      "browsers",
      "os",
      "daily",
      "referrers",
    ]),
  topLimit: z.coerce.number().int().min(1).max(50).default(10),
  groupBy: z
    .enum([
      "hour",
      "day",
      "week",
      "month",
      "link",
      "device",
      "browser",
      "os",
      "country",
    ])
    .optional(),
  timezone: z
    .string()
    .regex(/^[A-Za-z_/]+$/)
    .optional()
    .default("UTC"),
  filters: z
    .object({
      devices: z.array(z.string()).optional(),
      browsers: z.array(z.string()).optional(),
      os: z.array(z.string()).optional(),
      countries: z.array(z.string()).optional(),
      referrers: z.array(z.string()).optional(),
      utmSource: z.array(z.string()).optional(),
      utmMedium: z.array(z.string()).optional(),
      utmCampaign: z.array(z.string()).optional(),
    })
    .optional(),
  comparison: z.boolean().default(false),
  format: z.enum(["json", "csv", "excel"]).default("json"),
  realTime: z.boolean().default(false),
  sample: z.coerce.number().min(0).max(1).optional(),
});


export const getLinkStatsURLQuerySchema = z
  .object({
    userId: z.string().min(1, "User ID is required"),
    linkId: z.string().optional(),

    // Date range as separate parameters
    fromDate: z.string().optional(),
    toDate: z.string().optional(),

    // Period shorthand
    period: z
      .enum([
        "today",
        "yesterday",
        "last7days",
        "last30days",
        "last90days",
        "thisMonth",
        "lastMonth",
        "thisYear",
        "lastYear",
      ])
      .optional(),

    // Comma-separated metrics
    includeMetrics: z
      .string()
      .optional()
      .transform((str) => {
        if (!str) return undefined;
        return str.split(",").filter(Boolean);
      })
      .pipe(
        z
          .array(
            z.enum([
              "overview",
              "topLinks",
              "devices",
              "browsers",
              "os",
              "hourly",
              "daily",
              "referrers",
              "utm",
              "geo",
              "realTime",
            ])
          )
          .optional()
      ),

    topLimit: z
      .string()
      .optional()
      .transform((str) => (str ? parseInt(str, 10) : 10)),
    groupBy: z
      .enum([
        "hour",
        "day",
        "week",
        "month",
        "link",
        "device",
        "browser",
        "os",
        "country",
      ])
      .optional(),
    timezone: z.string().optional().default("UTC"),
    comparison: z
      .string()
      .optional()
      .transform((str) => str === "true"),
    format: z.enum(["json", "csv", "excel"]).optional().default("json"),
    realTime: z
      .string()
      .optional()
      .transform((str) => str === "true"),

    // Filter parameters (comma-separated)
    devices: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    browsers: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    os: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    countries: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    referrers: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    utmSource: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    utmMedium: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
    utmCampaign: z
      .string()
      .optional()
      .transform((str) => (str ? str.split(",") : undefined)),
  })
  .transform((data) => {
    // Convert URL params to the main schema format
    const result: any = {
      userId: data.userId,
      ...(data.linkId && { linkId: data.linkId }),
      ...(data.includeMetrics && { includeMetrics: data.includeMetrics }),
      topLimit: data.topLimit,
      ...(data.groupBy && { groupBy: data.groupBy }),
      timezone: data.timezone,
      comparison: data.comparison,
      format: data.format,
      realTime: data.realTime,
    };

    // Handle date range
    if (data.fromDate && data.toDate) {
      result.dateRange = {
        from: new Date(data.fromDate),
        to: new Date(data.toDate),
      };
    } else if (data.period) {
      result.period = data.period;
    }

    // Handle filters
    const filters: any = {};
    if (data.devices) filters.devices = data.devices;
    if (data.browsers) filters.browsers = data.browsers;
    if (data.os) filters.os = data.os;
    if (data.countries) filters.countries = data.countries;
    if (data.referrers) filters.referrers = data.referrers;
    if (data.utmSource) filters.utmSource = data.utmSource;
    if (data.utmMedium) filters.utmMedium = data.utmMedium;
    if (data.utmCampaign) filters.utmCampaign = data.utmCampaign;

    if (Object.keys(filters).length > 0) {
      result.filters = filters;
    }

    return result;
  });

export type GetLinkStatsQuery = z.infer<typeof getLinkStatsQuerySchema>;
export type GetLinkStatsURLQuery = z.infer<typeof getLinkStatsURLQuerySchema>;
