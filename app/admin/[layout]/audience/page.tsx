import { redirect } from "next/navigation";
import { getProfileLinkStats } from "@/lib/services/link-analitycs";
import { getActiveProfile } from "@/lib/analytics/dashboard";
import BreakdownCard from "@/components/shared/analytics/breakdown-card";
import NoData from "@/components/shared/analytics/no-data";

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const { layout } = await params;
  const profile = await getActiveProfile(layout);
  if (!profile) {
    redirect("/login");
  }

  const stats = await getProfileLinkStats(profile.id);

  if (stats.totalClicks === 0) {
    return (
      <div className="pt-8 flex flex-col gap-8 md:px-4">
        <h1 className="text-2xl font-bold text-foreground">Audience</h1>
        <NoData
          title="No audience data yet"
          description="Geography, devices, and traffic sources appear here once your links start getting clicks."
          ctaLabel="View your public page"
          ctaHref={`/${profile.username}`}
        />
      </div>
    );
  }

  return (
    <div className="pt-8 flex flex-col gap-8 md:px-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audience</h1>
        <p className="text-sm text-muted-foreground">
          Based on {stats.totalClicks.toLocaleString()} clicks in the last 30
          days.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BreakdownCard
          title="Countries"
          rows={stats.geoStats.map((g) => ({
            label: g.country,
            count: g.count,
            percentage: g.percentage,
          }))}
        />
        <BreakdownCard
          title="Devices"
          rows={stats.deviceStats.map((d) => ({
            label: d.device,
            count: d.count,
            percentage: d.percentage,
          }))}
        />
        <BreakdownCard
          title="Browsers"
          rows={stats.browserStats.map((b) => ({
            label: b.browser,
            count: b.count,
            percentage: b.percentage,
          }))}
        />
        <BreakdownCard
          title="Operating systems"
          rows={stats.osStats.map((o) => ({
            label: o.os,
            count: o.count,
            percentage: o.percentage,
          }))}
        />
        <BreakdownCard
          title="Referrers"
          rows={stats.referrerStats.map((r) => ({
            label: r.referrer,
            count: r.count,
            percentage: r.percentage,
          }))}
        />
        <BreakdownCard
          title="UTM sources"
          rows={stats.utmStats.sources.map((s) => ({
            label: s.source,
            count: s.count,
            percentage: s.percentage,
          }))}
        />
      </div>
    </div>
  );
}
