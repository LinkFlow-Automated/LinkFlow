/**
 * Frequentist A/B significance via a two-proportion z-test, comparing the
 * conversion rate (clicks / exposures) of variant B against variant A.
 */

export type AbSignificance = {
  /** Conversion rates in 0–1. */
  conversionRateA: number;
  conversionRateB: number;
  zScore: number;
  /** Two-tailed p-value. */
  pValue: number;
  /** (1 − pValue) × 100. */
  confidence: number;
  /** True when there's enough data AND p < 0.05. */
  significant: boolean;
  /** Higher-converting variant, or null on a tie / no data. */
  leader: "A" | "B" | null;
  /** Relative lift of B over A, in %, or null when A has no conversions. */
  uplift: number | null;
  /** Whether the sample is large enough to trust the test. */
  enoughData: boolean;
};

/** Error function (Abramowitz & Stegun 7.1.26), |error| ≤ 1.5e-7. */
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t -
      0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-ax * ax);
  return sign * y;
}

/** Standard normal CDF. */
function normalCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export function abSignificance({
  eA,
  cA,
  eB,
  cB,
}: {
  eA: number;
  cA: number;
  eB: number;
  cB: number;
}): AbSignificance {
  const conversionRateA = eA > 0 ? cA / eA : 0;
  const conversionRateB = eB > 0 ? cB / eB : 0;

  let zScore = 0;
  let pValue = 1;
  if (eA > 0 && eB > 0) {
    const pPool = (cA + cB) / (eA + eB);
    const se = Math.sqrt(pPool * (1 - pPool) * (1 / eA + 1 / eB));
    if (se > 0) {
      zScore = (conversionRateB - conversionRateA) / se;
      pValue = 2 * (1 - normalCdf(Math.abs(zScore)));
    }
  }

  // Guardrail against declaring significance on tiny samples.
  const enoughData = eA >= 30 && eB >= 30 && cA + cB > 0;
  const confidence = Math.max(0, Math.min(100, (1 - pValue) * 100));
  const significant = enoughData && pValue < 0.05;

  const leader =
    conversionRateB > conversionRateA
      ? "B"
      : conversionRateA > conversionRateB
        ? "A"
        : null;

  const uplift =
    conversionRateA > 0
      ? ((conversionRateB - conversionRateA) / conversionRateA) * 100
      : conversionRateB > 0
        ? null
        : 0;

  return {
    conversionRateA,
    conversionRateB,
    zScore,
    pValue,
    confidence,
    significant,
    leader,
    uplift,
    enoughData,
  };
}
