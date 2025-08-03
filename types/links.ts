export interface LinkStats {
  totalClicks: number;
  uniqueClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topLinks: Array<{
    id: string;
    title: string;
    url: string;
    clicks: number;
    clickEvents: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  browserStats: Array<{
    browser: string;
    count: number;
    percentage: number;
  }>;
  osStats: Array<{
    os: string;
    count: number;
    percentage: number;
  }>;
  hourlyStats: Array<{
    hour: string;
    clicks: number;
  }>;
  dailyStats: Array<{
    date: string;
    clicks: number;
  }>;
  referrerStats: Array<{
    referrer: string;
    count: number;
    percentage: number;
  }>;
  utmStats: {
    sources: Array<{ source: string; count: number; percentage: number }>;
    mediums: Array<{ medium: string; count: number; percentage: number }>;
    campaigns: Array<{ campaign: string; count: number; percentage: number }>;
  };
  geoStats: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}
