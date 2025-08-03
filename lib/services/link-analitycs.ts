import { prisma } from "../prisma";
import { getDeviceInfo } from "../utils";
import { Reader } from "@maxmind/geoip2-node";
import {
  startOfDay,
  endOfDay,
  subDays,
  subHours,
  subMonths,
  format,
} from "date-fns";
import { LinkStats } from "@/types/links";
import { geoSchema } from "../validations/link";
import path from "path";

export async function getLinkStats(
  userId: string,
  linkId?: string,
  dateRange?: { from: Date; to: Date }
): Promise<LinkStats> {
  const fromDate = dateRange?.from || subMonths(new Date(), 1);
  const toDate = dateRange?.to || new Date();

  // Base where clause
  const baseWhere = {
    link: { userId },
    ...(linkId && { linkId }),
    timestamp: {
      gte: fromDate,
      lte: toDate,
    },
  };

  // Get all click events for the period
  const clickEvents = await prisma.clickEvent.findMany({
    where: baseWhere,
    include: {
      link: {
        select: {
          id: true,
          title: true,
          url: true,
          clicks: true,
        },
      },
    },
    orderBy: { timestamp: "desc" },
  });

  const totalClicks = clickEvents.length;

  // Calculate unique clicks (based on userAgent + linkId combination)
  const uniqueClicksSet = new Set(
    clickEvents.map((event) => `${event.linkId}-${event.userAgent}`)
  );
  const uniqueClicks = uniqueClicksSet.size;

  // Time-based stats
  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = subDays(now, 7);
  const monthStart = subMonths(now, 1);

  const clicksToday = clickEvents.filter(
    (event) => event.timestamp >= todayStart
  ).length;

  const clicksThisWeek = clickEvents.filter(
    (event) => event.timestamp >= weekStart
  ).length;

  const clicksThisMonth = clickEvents.filter(
    (event) => event.timestamp >= monthStart
  ).length;

  // Top performing links
  const linkClickCounts = clickEvents.reduce((acc, event) => {
    const key = event.linkId;
    if (!acc[key]) {
      acc[key] = {
        link: event.link,
        count: 0,
      };
    }
    acc[key].count++;
    return acc;
  }, {} as Record<string, { link: any; count: number }>);

  const topLinks = Object.values(linkClickCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((item) => ({
      id: item.link.id,
      title: item.link.title,
      url: item.link.url,
      clicks: item.link.clicks,
      clickEvents: item.count,
    }));

  // Device stats
  const deviceCounts = clickEvents.reduce((acc, event) => {
    const device = event.device || "Unknown";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const deviceStats = Object.entries(deviceCounts)
    .map(([device, count]) => ({
      device,
      count,
      percentage: Math.round((count / totalClicks) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Browser stats
  const browserCounts = clickEvents.reduce((acc, event) => {
    const browser = event.browser || "Unknown";
    acc[browser] = (acc[browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const browserStats = Object.entries(browserCounts)
    .map(([browser, count]) => ({
      browser,
      count,
      percentage: Math.round((count / totalClicks) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // OS stats
  const osCounts = clickEvents.reduce((acc, event) => {
    const os = event.os || "Unknown";
    acc[os] = (acc[os] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const osStats = Object.entries(osCounts)
    .map(([os, count]) => ({
      os,
      count,
      percentage: Math.round((count / totalClicks) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Hourly stats (last 24 hours)
  const last24Hours = subHours(now, 24);
  const hourlyData = clickEvents.filter(
    (event) => event.timestamp >= last24Hours
  );

  const hourlyCounts = Array.from({ length: 24 }, (_, i) => {
    const hour = subHours(now, 23 - i);
    const hourStart =
      startOfDay(hour).getTime() + hour.getHours() * 60 * 60 * 1000;
    const hourEnd = hourStart + 60 * 60 * 1000;

    const count = hourlyData.filter((event) => {
      const eventTime = event.timestamp.getTime();
      return eventTime >= hourStart && eventTime < hourEnd;
    }).length;

    return {
      hour: format(new Date(hourStart), "HH:mm"),
      clicks: count,
    };
  });

  // Daily stats (last 30 days)
  const last30Days = subDays(now, 30);
  const dailyData = clickEvents.filter(
    (event) => event.timestamp >= last30Days
  );

  const dailyCounts = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(now, 29 - i);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const count = dailyData.filter(
      (event) => event.timestamp >= dayStart && event.timestamp <= dayEnd
    ).length;

    return {
      date: format(date, "MMM dd"),
      clicks: count,
    };
  });

  // Referrer stats
  const referrerCounts = clickEvents.reduce((acc, event) => {
    const referrer = event.referrer || "Direct";
    acc[referrer] = (acc[referrer] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const referrerStats = Object.entries(referrerCounts)
    .map(([referrer, count]) => ({
      referrer,
      count,
      percentage: Math.round((count / totalClicks) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // UTM stats
  const utmSourceCounts = clickEvents.reduce((acc, event) => {
    const source = event.utmSource || "Unknown";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const utmMediumCounts = clickEvents.reduce((acc, event) => {
    const medium = event.utmMedium || "Unknown";
    acc[medium] = (acc[medium] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const utmCampaignCounts = clickEvents.reduce((acc, event) => {
    const campaign = event.utmCampaign || "Unknown";
    acc[campaign] = (acc[campaign] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const utmStats = {
    sources: Object.entries(utmSourceCounts)
      .map(([source, count]) => ({
        source,
        count,
        percentage: Math.round((count / totalClicks) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),

    mediums: Object.entries(utmMediumCounts)
      .map(([medium, count]) => ({
        medium,
        count,
        percentage: Math.round((count / totalClicks) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),

    campaigns: Object.entries(utmCampaignCounts)
      .map(([campaign, count]) => ({
        campaign,
        count,
        percentage: Math.round((count / totalClicks) * 100),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  };

  // Geo stats (assuming geo JSON contains country info)
  const geoCounts = clickEvents.reduce((acc, event) => {
    if (event.geo && typeof event.geo === "object" && "country" in event.geo) {
      const country = (event.geo as any).country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
    } else {
      acc["Unknown"] = (acc["Unknown"] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const geoStats = Object.entries(geoCounts)
    .map(([country, count]) => ({
      country,
      count,
      percentage: Math.round((count / totalClicks) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalClicks,
    uniqueClicks,
    clicksToday,
    clicksThisWeek,
    clicksThisMonth,
    topLinks,
    deviceStats,
    browserStats,
    osStats,
    hourlyStats: hourlyCounts,
    dailyStats: dailyCounts,
    referrerStats,
    utmStats,
    geoStats,
  };
}

// Get stats for a specific link
export async function getSingleLinkStats(linkId: string, userId: string) {
  return getLinkStats(userId, linkId);
}

// Get overview stats for all user's links
export async function getUserOverviewStats(userId: string) {
  return getLinkStats(userId);
}

// Get real-time stats (last hour)
export async function getRealTimeStats(userId: string, linkId?: string) {
  const lastHour = subHours(new Date(), 1);

  const recentClicks = await prisma.clickEvent.findMany({
    where: {
      link: { userId },
      ...(linkId && { linkId }),
      timestamp: { gte: lastHour },
    },
    include: {
      link: {
        select: {
          title: true,
          url: true,
        },
      },
    },
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  return {
    recentClicksCount: recentClicks.length,
    recentClicks: recentClicks.map((click) => ({
      id: click.id,
      linkTitle: click.link.title,
      device: click.device,
      browser: click.browser,
      os: click.os,
      timestamp: click.timestamp,
      referrer: click.referrer,
    })),
  };
}

// Export stats to CSV
export async function exportStatsToCSV(userId: string, linkId?: string) {
  const stats = await getLinkStats(userId, linkId);

  // This would generate CSV data - you can customize based on needs
  const csvData = stats.topLinks.map((link) => ({
    Title: link.title,
    URL: link.url,
    Clicks: link.clickEvents,
    "Total Clicks": link.clicks,
  }));

  return csvData;
}

let geoReader: any;

try {
  geoReader = Reader.open("../data/GeoLite2-City.mmdb").then((reader) => {
    return reader;
  });
} catch (error) {
  console.warn("GeoIP database not available:", error);
}

export const createClickEvents = async ({
  linkId,
  referrer,
  userAgent,
  ip,
  utmCampaign,
  utmMedium,
  utmSource,
}: {
  linkId: string;
  referrer: string;
  userAgent: string;
  ip: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}) => {
  try {
    if (!linkId) {
      throw new Error("Link ID is required");
    }
    if (!userAgent) {
      throw new Error("User agent is required");
    }

    let deviceInfo;
    try {
      deviceInfo = getDeviceInfo(userAgent);
    } catch (error) {
      console.warn("Failed to parse user agent:", error);
      deviceInfo = {
        device: "unknown",
        browser: "unknown",
        os: "unknown",
      };
    }

    let geoData;
    try {
      const geo = geoReader.city(ip);
      geoData = {
        country: geo?.country || null,
        region: geo?.region || null,
        city: geo?.city || null,
        coordonate: geo?.ll || null,
        timezone: geo?.timezone || null,
      };
    } catch (error) {
      console.warn("Failed to lookup geo data for IP:", ip, error);
      geoData = {
        country: null,
        region: null,
        city: null,
        coordonate: null,
        timezone: null,
      };
    }

    let validatedGeoData;
    try {
      validatedGeoData = geoSchema.parse(geoData);
    } catch (error) {
      console.warn("Geo data validation failed:", error);
      validatedGeoData = {
        country: null,
        region: null,
        city: null,
        coordonate: null,
        timezone: null,
      };
    }

    const data = await prisma.clickEvent.create({
      data: {
        linkId,
        userAgent,
        device: deviceInfo.device || "unknown",
        geo: validatedGeoData, // Don't stringify - Prisma handles Json type
        browser: deviceInfo.browser || "unknown",
        os: deviceInfo.os || "unknown",
        referrer: referrer || null,
        utmCampaign,
        utmMedium,
        utmSource,
      },
    });

    await prisma.link.update({
      where: { id: linkId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error creating click event:", error);

    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Foreign key constraint")) {
        throw new Error("Invalid link ID - link does not exist");
      }
      if (error.message.includes("Invalid input")) {
        throw new Error("Invalid data provided for click event");
      }
    }

    // Re-throw the error for the caller to handle
    throw new Error(
      `Failed to create click event: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
