import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getDeviceInfo } from "@/lib/utils";
import { geoReaderPromise } from "@/lib/georeader";
import { DeviceDetector } from "@/lib/services/device-detection";
import { SmartRulesEngine } from "@/lib/services/smart-rules-engine";
import type { EvaluationContext, LinkWithRules, Rule } from "@/types/smart-rules";
import HeroSection from "@/components/shared/bio/hero/hero-section";
import BioLinks, { type BioLink } from "@/components/shared/bio/bio-links";
import { parseSocialLinks, socialPlatform } from "@/lib/social-platforms";
import { getAbConfig } from "@/lib/utils/ab-testing";

// Uses MaxMind (Node) + per-request headers, so render dynamically.
export const dynamic = "force-dynamic";

async function buildContext(): Promise<EvaluationContext> {
  const h = await headers();
  const userAgent = h.get("user-agent") || "";
  const referrer = h.get("referer") || undefined;
  const { browser, os } = getDeviceInfo(userAgent);

  // Prefer edge/proxy country headers; fall back to a MaxMind IP lookup.
  let country = h.get("cf-ipcountry") || h.get("x-country-code") || undefined;
  let region: string | undefined;
  if (!country) {
    try {
      const ip = (h.get("x-forwarded-for") || "").split(",")[0]?.trim();
      if (ip) {
        const geo = (await geoReaderPromise).city(ip);
        country = geo?.country?.isoCode || undefined;
        const sub = geo?.subdivisions?.[0]?.isoCode;
        // ISO 3166-2 format (e.g. "US-CA") to match the geo targeting form.
        region = country && sub ? `${country}-${sub}` : undefined;
      }
    } catch {
      // Non-routable/unknown IP (e.g. localhost) — leave geo undefined.
    }
  }

  return {
    userAgent,
    country,
    region,
    device: DeviceDetector.detectDevice(userAgent),
    browser: browser ? { name: browser, version: "" } : undefined,
    os: os ? { name: os, version: "" } : undefined,
    platform: DeviceDetector.detectPlatform(referrer),
    timestamp: new Date(),
    isAuthenticated: false,
    timezone: "UTC",
  };
}

export default async function BioPage({
  params,
}: {
  params: Promise<{ bio: string }>;
}) {
  const { bio } = await params;

  const profile = await prisma.profile.findFirst({
    where: { username: bio, isPublic: true },
    include: {
      links: {
        where: { isArchived: false },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  // Record a profile view (best-effort, non-blocking).
  prisma.profile
    .update({ where: { id: profile.id }, data: { views: { increment: 1 } } })
    .catch(() => { });

  const context = await buildContext();

  const evaluable: LinkWithRules[] = profile.links.map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    clicks: link.clicks,
    featured: link.featured,
    visibility: link.visibility,
    order: link.order,
    scheduledAt: link.scheduledAt ?? undefined,
    expiresAt: link.expiresAt ?? undefined,
    rules: (link.rules as Rule) ?? undefined,
  }));

  const { visible } = SmartRulesEngine.getProcessedLinks(evaluable, context);
  const byId = new Map(profile.links.map((l) => [l.id, l]));

  const bioLinks: BioLink[] = visible.map((v) => {
    const full = byId.get(v.id);
    return {
      id: v.id,
      title: v.title,
      url: v.url,
      description: full?.description,
      category: full?.category,
      layout: (full?.layout as BioLink["layout"]) || "minimal",
      animation: full?.animation,
      thumbnail: full?.thumbnail,
      thumbnailType: full?.type,
      abTest: getAbConfig(full?.rules),
    };
  });

  const socialIcons = parseSocialLinks(profile.socialLinks).flatMap((s) => {
    const platform = socialPlatform(s.platform);
    return platform
      ? [{ label: platform.label, icon: platform.icon, href: s.url }]
      : [];
  });

  return (
    <div className="flex flex-col gap-8 w-full pb-8">
      <HeroSection
        name={profile.displayName || profile.username}
        bio={profile.bio ?? ""}
        avatar={profile.image}
        socialIcons={socialIcons}
      />
      <div className="px-4">
        <BioLinks links={bioLinks} />
      </div>
    </div>
  );
}
