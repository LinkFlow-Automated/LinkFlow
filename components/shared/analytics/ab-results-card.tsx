import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AbTestResult, AbVariantResult } from "@/lib/services/link-analitycs";

function pct(rate: number) {
  return `${(rate * 100).toFixed(1)}%`;
}

function VariantRow({
  label,
  variant,
  leading,
}: {
  label: "A" | "B";
  variant: AbVariantResult;
  leading: boolean;
}) {
  const barWidth = Math.min(100, variant.conversionRate * 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs text-muted-foreground">{label}</span>
          <span className="truncate text-foreground/80">{variant.name}</span>
          {leading && variant.exposures > 0 && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              Leading
            </Badge>
          )}
        </span>
        <span className="tabular-nums text-muted-foreground shrink-0 pl-2">
          {pct(variant.conversionRate)} CVR
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className={cn("h-full rounded-full", leading ? "bg-primary" : "bg-primary/50")}
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">
        {variant.clicks.toLocaleString()} clicks /{" "}
        {variant.exposures.toLocaleString()} views
      </span>
    </div>
  );
}

function Verdict({ r }: { r: AbTestResult }) {
  const { significance: s } = r;
  if (!s.enoughData) {
    return (
      <p className="text-xs text-muted-foreground">
        Collecting data — need at least 30 views per variant to test
        significance ({r.totalExposures.toLocaleString()} so far).
      </p>
    );
  }
  if (s.significant && s.leader) {
    const name = s.leader === "A" ? r.variantA.name : r.variantB.name;
    return (
      <p className="text-xs">
        <span className="font-medium text-green-600">
          {name} wins
        </span>{" "}
        <span className="text-muted-foreground">
          at {s.confidence.toFixed(1)}% confidence
          {s.uplift != null && s.leader === "B"
            ? ` · ${s.uplift >= 0 ? "+" : ""}${s.uplift.toFixed(0)}% vs A`
            : ""}
        </span>
      </p>
    );
  }
  return (
    <p className="text-xs text-muted-foreground">
      No significant difference yet ({s.confidence.toFixed(1)}% confidence).
    </p>
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
          Conversion rate = clicks ÷ views. Splits are sticky per visitor.
        </p>
      </div>
      {results.map((r) => {
        const aLeads = r.significance.leader !== "B";
        return (
          <div key={r.linkId} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground truncate">
                {r.title}
              </span>
              <span className="text-xs text-muted-foreground shrink-0 pl-2 tabular-nums">
                {r.totalExposures.toLocaleString()} views ·{" "}
                {100 - r.trafficSplit}/{r.trafficSplit} split
              </span>
            </div>
            <VariantRow label="A" variant={r.variantA} leading={aLeads} />
            <VariantRow label="B" variant={r.variantB} leading={!aLeads} />
            <Verdict r={r} />
          </div>
        );
      })}
    </Card>
  );
}
