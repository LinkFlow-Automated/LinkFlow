import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

interface NoDataProps {
  title?: string;
  description?: string;
  /** Optional CTA (e.g. link to the public bio page or link editor). */
  ctaLabel?: string;
  ctaHref?: string;
}

export default function NoData({
  title = "No analytics yet",
  description = "Once visitors start clicking your links, their activity will show up here.",
  ctaLabel,
  ctaHref,
}: NoDataProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 p-10 text-center">
      <div className="rounded-full bg-secondary p-3">
        <BarChart3 className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {ctaLabel && ctaHref ? (
        <Button asChild className="mt-2">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </Card>
  );
}
