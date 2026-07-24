/**
 * Rule forms each edit a namespaced slice of `link.rules` (e.g.
 * `rules.geographicTargeting`), but the Smart Rules Engine reads *flat* keys off
 * `link.rules` (e.g. `rules.countryAllow`). These helpers merge a form's data
 * into the rules object, writing BOTH:
 *   - the namespaced slice, so the form can re-hydrate its UI on reopen, and
 *   - the flat keys the engine actually evaluates (see `smart-rules-engine.ts`
 *     and `rulesSchema` in `lib/validations/link.ts`).
 */

// `any`-valued so the result stays assignable to Prisma's Json input type.
type AnyRules = Record<string, any>;

/** Drop empty arrays so the engine treats "no selection" as "no constraint". */
function nonEmpty<T>(arr?: T[] | null): T[] | undefined {
  return arr && arr.length > 0 ? arr : undefined;
}

export type GeoTargetingData = {
  countryAllow?: string[];
  countryBlock?: string[];
  regionAllow?: string[];
  regionBlock?: string[];
  cityAllow?: string[];
  cityBlock?: string[];
};

export function withGeoRules(
  existing: AnyRules | null | undefined,
  data: GeoTargetingData
): AnyRules {
  return {
    ...(existing || {}),
    geographicTargeting: data,
    countryAllow: nonEmpty(data.countryAllow),
    countryBlock: nonEmpty(data.countryBlock),
    regionAllow: nonEmpty(data.regionAllow),
    regionBlock: nonEmpty(data.regionBlock),
  };
}

export type DeviceTargetingData = {
  allowedDevices?: string[];
  blockedDevices?: string[];
  allowedBrowsers?: string[];
  blockedBrowsers?: string[];
  allowedOS?: string[];
  blockedOS?: string[];
};

export function withDeviceRules(
  existing: AnyRules | null | undefined,
  data: DeviceTargetingData
): AnyRules {
  return {
    ...(existing || {}),
    deviceBrowserTargeting: data,
    allowedDevices: nonEmpty(data.allowedDevices),
    allowedBrowsers: nonEmpty(data.allowedBrowsers),
    blockedBrowsers: nonEmpty(data.blockedBrowsers),
    allowedOS: nonEmpty(data.allowedOS),
    blockedOS: nonEmpty(data.blockedOS),
  };
}

export type ClickLimitsData = {
  maxClicks?: number;
  maxClicksPerDay?: number;
  maxClicksPerHour?: number;
  maxClicksPerUser?: number;
  scheduledAt?: string | null;
  expiresAt?: string | null;
  allowedDays?: string[];
  allowedHours?: { start?: string; end?: string };
  timezone?: string;
};

export function withClickRules(
  existing: AnyRules | null | undefined,
  data: ClickLimitsData
): AnyRules {
  const timeWindows =
    data.allowedDays && data.allowedDays.length > 0
      ? [
          {
            days: data.allowedDays,
            start: data.allowedHours?.start || "00:00",
            end: data.allowedHours?.end || "23:59",
          },
        ]
      : undefined;

  return {
    ...(existing || {}),
    clickLimitsScheduling: data,
    maxClicks: data.maxClicks,
    maxClicksPerDay: data.maxClicksPerDay,
    maxClicksPerHour: data.maxClicksPerHour,
    startDate: data.scheduledAt || undefined,
    endDate: data.expiresAt || undefined,
    timeWindows,
  };
}

export type RuleCategory = "geo" | "device" | "limits" | "schedule" | "abtest";

const hasAny = (...vals: unknown[]) =>
  vals.some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== ""
  );

/**
 * Inspect a link's `rules` blob and report which rule categories are actively
 * configured. Reads the flat engine keys the forms now write, falling back to
 * the namespaced slices so links saved either way are detected.
 */
export function summarizeRules(rules: unknown): RuleCategory[] {
  if (!rules || typeof rules !== "object") return [];
  const r = rules as Record<string, any>;
  const active: RuleCategory[] = [];

  if (
    hasAny(r.countryAllow, r.countryBlock, r.regionAllow, r.regionBlock) ||
    (r.geographicTargeting &&
      hasAny(
        r.geographicTargeting.countryAllow,
        r.geographicTargeting.countryBlock,
        r.geographicTargeting.regionAllow,
        r.geographicTargeting.regionBlock
      ))
  ) {
    active.push("geo");
  }

  if (
    hasAny(
      r.allowedDevices,
      r.allowedBrowsers,
      r.blockedBrowsers,
      r.allowedOS,
      r.blockedOS
    ) ||
    (r.deviceBrowserTargeting &&
      hasAny(
        r.deviceBrowserTargeting.allowedDevices,
        r.deviceBrowserTargeting.allowedBrowsers,
        r.deviceBrowserTargeting.blockedBrowsers,
        r.deviceBrowserTargeting.allowedOS,
        r.deviceBrowserTargeting.blockedOS
      ))
  ) {
    active.push("device");
  }

  if (hasAny(r.maxClicks, r.maxClicksPerDay, r.maxClicksPerHour)) {
    active.push("limits");
  }

  if (
    hasAny(r.startDate, r.endDate, r.timeWindows) ||
    (r.clickLimitsScheduling &&
      hasAny(
        r.clickLimitsScheduling.scheduledAt,
        r.clickLimitsScheduling.expiresAt,
        r.clickLimitsScheduling.allowedDays
      ))
  ) {
    active.push("schedule");
  }

  if (r.abTesting && hasAny(r.abTesting.testName)) {
    active.push("abtest");
  }

  return active;
}
