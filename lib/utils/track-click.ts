"use client";

type TrackClickInput = {
  linkId: string;
  abVariant?: "A" | "B";
  endpoint?: string;
};

function getUTMFromLocation() {
  if (typeof window === "undefined") return {} as Record<string, string>;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source") || undefined;
  const utmMedium = params.get("utm_medium") || undefined;
  const utmCampaign = params.get("utm_campaign") || undefined;
  return { utmSource, utmMedium, utmCampaign } as Record<string, string | undefined>;
}

export async function trackClick({
  linkId,
  abVariant,
  endpoint = "/api/v1/click/events",
}: TrackClickInput) {
  try {
    const utm = getUTMFromLocation();
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId, ...(abVariant ? { abVariant } : {}), ...utm }),
      keepalive: true,
    });
  } catch (error) {
    // Best-effort tracking; ignore errors on client
  }
}


