import { redirect } from "next/navigation";
import {
  getProfileLinkStats,
  getAbResults,
} from "@/lib/services/link-analitycs";
import {
  getActiveProfile,
  weekOverWeekChange,
  formatCompact,
} from "@/lib/analytics/dashboard";
import CardStats from "./_components/card-stats";
import TopLinksCard from "@/components/shared/analytics/top-links-card";
import BreakdownCard from "@/components/shared/analytics/breakdown-card";
import AbResultsCard from "@/components/shared/analytics/ab-results-card";
import NoData from "@/components/shared/analytics/no-data";

export default async function InsightPage({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const { layout } = await params;
  const profile = await getActiveProfile(layout);
  if (!profile) {
    redirect("/login");
  }

  const [stats, abResults] = await Promise.all([
    getProfileLinkStats(profile.id),
    getAbResults(profile.id),
  ]);
  const spark = stats.dailyStats.map((d) => ({
    label: d.date,
    value: d.clicks,
  }));
  const clicksChange = weekOverWeekChange(stats.dailyStats);

  const cards = [
    {
      title: "Total Clicks",
      value: formatCompact(stats.totalClicks),
      change: clicksChange,
    },
    {
      title: "Unique Clicks",
      value: formatCompact(stats.uniqueClicks),
    },
    {
      title: "Clicks Today",
      value: formatCompact(stats.clicksToday),
    },
    {
      title: "This Week",
      value: formatCompact(stats.clicksThisWeek),
      change: clicksChange,
    },
    {
      title: "This Month",
      value: formatCompact(stats.clicksThisMonth),
    },
  ];

  return (
    <div className="pt-8 flex flex-col gap-8 md:px-4 h-full">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {cards.map((card) => (
          <CardStats
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            data={spark}
          />
        ))}
      </div>

      {stats.totalClicks === 0 ? (
        <NoData
          ctaLabel="View your public page"
          ctaHref={`/${profile.username}`}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <TopLinksCard className="w-full md:w-1/2" links={stats.topLinks} />
          <BreakdownCard
            className="w-full md:w-1/2"
            title="Top referrers"
            rows={stats.referrerStats.map((r) => ({
              label: r.referrer,
              count: r.count,
              percentage: r.percentage,
            }))}
          />
        </div>
      )}

      <AbResultsCard results={abResults} />
    </div>
  );
}
