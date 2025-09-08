"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth-client";

type TopLink = {
  id: string;
  title: string | null;
  url: string;
  clicks: number;
  clickEvents: number;
};

type Stats = {
  totalClicks: number;
  uniqueClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topLinks: TopLink[];
  hourlyStats: { hour: string; clicks: number }[];
  dailyStats: { date: string; clicks: number }[];
};

export default function InsightPage() {
  const { data } = useSession();
  const userId = data?.user?.id;
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      if (!userId) return;
      setLoading(true);
      try {
        const params = new URLSearchParams({ userId });
        const res = await fetch(`/api/v1/click?${params.toString()}`, {
          method: "GET",
        });
        if (res.ok) {
          const json = await res.json();
          setStats(json);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [userId]);

  const weeklySummary = useMemo(() => {
    if (!stats) return null;
    return {
      thisWeek: stats.clicksThisWeek,
      today: stats.clicksToday,
      thisMonth: stats.clicksThisMonth,
      total: stats.totalClicks,
    };
  }, [stats]);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Analytics Insight</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your link performance.
        </p>
      </div>

      {loading && <div className="text-sm">Loading analytics…</div>}
      {!loading && stats && (
        <div className="space-y-8">
          {/* Weekly summaries */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Today" value={stats.clicksToday} />
            <StatCard label="This Week" value={stats.clicksThisWeek} />
            <StatCard label="This Month" value={stats.clicksThisMonth} />
            <StatCard label="Total" value={stats.totalClicks} />
          </div>

          {/* Click trends */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendCard title="Last 24 hours" data={stats.hourlyStats} xKey="hour" />
            <TrendCard title="Last 30 days" data={stats.dailyStats} xKey="date" />
          </div>

          {/* Top links */}
          <div className="space-y-3">
            <h2 className="text-lg font-medium">Top Links</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="py-2 pr-4">Title</th>
                    <th className="py-2 pr-4">URL</th>
                    <th className="py-2 pr-4">Clicks</th>
                    <th className="py-2 pr-4">Events</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topLinks.map((l) => (
                    <tr key={l.id} className="border-t">
                      <td className="py-2 pr-4">{l.title || "Untitled"}</td>
                      <td className="py-2 pr-4">
                        <a className="text-primary underline" href={l.url} target="_blank" rel="noreferrer">
                          {l.url}
                        </a>
                      </td>
                      <td className="py-2 pr-4">{l.clicks}</td>
                      <td className="py-2 pr-4">{l.clickEvents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function TrendCard({
  title,
  data,
  xKey,
}: {
  title: string;
  data: { [k: string]: string | number }[];
  xKey: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 text-sm font-medium">{title}</div>
      <div className="grid grid-cols-6 gap-2 items-end min-h-32">
        {data.map((d, i) => (
          <div key={`${d[xKey]}-${i}`} className="text-center">
            <div
              className="mx-auto w-3 bg-primary"
              style={{ height: `${Math.min(100, Number(d.clicks) || 0) + 8}px` }}
            />
            <div className="mt-1 text-xs text-muted-foreground truncate">
              {String(d[xKey])}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


