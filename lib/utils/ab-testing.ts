/**
 * Single-link A/B testing. A link's `rules.abTesting` (written by the A/B form)
 * holds two variant URLs and a `trafficSplit` (the % of visitors sent to B).
 * A visitor is assigned a sticky variant client-side and sent to that URL; the
 * served variant is recorded on each click so results can be compared.
 */

export type AbVariant = "A" | "B";

export type AbTestConfig = {
  variantAName: string;
  variantBName: string;
  variantAUrl?: string | null;
  variantBUrl?: string | null;
  /** Percentage of traffic routed to variant B (0–100). */
  trafficSplit: number;
};

/** Extract a usable A/B config from a link's `rules` blob, or null. */
export function getAbConfig(rules: unknown): AbTestConfig | null {
  if (!rules || typeof rules !== "object") return null;
  const ab = (rules as Record<string, any>).abTesting;
  if (!ab || typeof ab !== "object") return null;

  const hasAlternative = Boolean(ab.variantAUrl || ab.variantBUrl);
  if (!hasAlternative) return null;

  return {
    variantAName: ab.variantAName || "A",
    variantBName: ab.variantBName || "B",
    variantAUrl: ab.variantAUrl ?? null,
    variantBUrl: ab.variantBUrl ?? null,
    trafficSplit:
      typeof ab.trafficSplit === "number" ? ab.trafficSplit : 50,
  };
}

/** Weighted coin flip — `trafficSplit`% chance of "B". */
export function pickVariant(trafficSplit: number): AbVariant {
  const split = Math.min(100, Math.max(0, trafficSplit));
  return Math.random() * 100 < split ? "B" : "A";
}

/** Destination for a variant, falling back to the link's base URL. */
export function variantUrl(
  config: AbTestConfig,
  variant: AbVariant,
  fallback: string
): string {
  const url = variant === "B" ? config.variantBUrl : config.variantAUrl;
  return url || fallback;
}
