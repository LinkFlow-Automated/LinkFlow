import Link from "next/link";
import { redirect } from "next/navigation";
import { getProfileLinkStats } from "@/lib/services/link-analitycs";
import { getActiveProfile, formatCompact } from "@/lib/analytics/dashboard";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TopLinksCard from "@/components/shared/analytics/top-links-card";
import { ArrowRight, ExternalLink } from "lucide-react";

export default async function AdminHomePage({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const { layout } = await params;
  const profile = await getActiveProfile(layout);
  if (!profile) {
    redirect("/login");
  }

  const [stats, linkCount] = await Promise.all([
    getProfileLinkStats(profile.id),
    prisma.link.count({ where: { profileId: profile.id, isArchived: false } }),
  ]);

  const overview = [
    { label: "Profile views", value: formatCompact(profile.views) },
    { label: "Total clicks", value: formatCompact(stats.totalClicks) },
    { label: "Clicks today", value: formatCompact(stats.clicksToday) },
    { label: "Active links", value: formatCompact(linkCount) },
  ];

  return (
    <div className="pt-8 flex flex-col gap-8 md:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {profile.displayName || profile.username}
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your @{profile.username} page
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${profile.username}`} target="_blank">
            View public page <ExternalLink className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overview.map((item) => (
          <Card key={item.label} className="p-4 flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-2xl font-semibold text-foreground">
              {item.value}
            </span>
          </Card>
        ))}
      </div>

      {/* Top links + quick links */}
      <div className="flex flex-col md:flex-row gap-4">
        <TopLinksCard className="w-full md:w-1/2" links={stats.topLinks} />

        <Card className="w-full md:w-1/2 p-4 flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-foreground">Explore</h3>
          <Button asChild variant="ghost" className="justify-between">
            <Link href={`/admin/${profile.username}/insight`}>
              Insights <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-between">
            <Link href={`/admin/${profile.username}/audience`}>
              Audience <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
