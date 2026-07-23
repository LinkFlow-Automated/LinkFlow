import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AbTestResult } from "@/lib/services/link-analitycs";

function VariantRow({
  label,
  name,
  clicks,
  share,
  leading,
}: {
  label: "A" | "B";
  name: string;
  clicks: number;
  share: number;
  leading: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs text-muted-foreground">{label}</span>
          <span className="truncate text-foreground/80">{name}</span>
          {leading && clicks > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Leading
            </Badge>
          )}
        </span>
        <span className="tabular-nums text-muted-foreground shrink-0 pl-2">
          {clicks.toLocaleString()} ({share}%)
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full", leading ? "bg-primary" : "bg-primary/50")}
          style={{ width: `${Math.min(100, share)}%` }}
        />
      </div>
    </div>
  );
}

export default function AbResultsCard({
  results,
}: {
  results: AbTestResult[];
}) {
  if (results.length === 0) return null;

  return (
    <Card className="p-4 flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-semibold text-foreground">A/B tests</h3>
        <p className="text-sm text-muted-foreground">
          Clicks by variant. Splits are sticky per visitor.
        </p>
      </div>
      {results.map((r) => {
        const aLeads = r.variantA.clicks >= r.variantB.clicks;
        return (
          <div key={r.linkId} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground truncate">
                {r.title}
              </span>
              <span className="text-xs text-muted-foreground shrink-0 pl-2">
                {r.total.toLocaleString()} clicks · {100 - r.trafficSplit}/
                {r.trafficSplit} split
              </span>
            </div>
            <VariantRow
              label="A"
              name={r.variantA.name}
              clicks={r.variantA.clicks}
              share={r.variantA.share}
              leading={aLeads}
            />
            <VariantRow
              label="B"
              name={r.variantB.name}
              clicks={r.variantB.clicks}
              share={r.variantB.share}
              leading={!aLeads}
            />
          </div>
        );
      })}
    </Card>
  );
}
