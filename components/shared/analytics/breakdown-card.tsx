import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type BreakdownRow = {
  label: string;
  count: number;
  percentage: number;
};

interface BreakdownCardProps {
  title: string;
  rows: BreakdownRow[];
  /** Message shown when there are no rows. */
  emptyLabel?: string;
  className?: string;
}

export default function BreakdownCard({
  title,
  rows,
  emptyLabel = "No data yet",
  className,
}: BreakdownCardProps) {
  return (
    <Card className={cn("p-4 flex flex-col gap-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate text-foreground/80" title={row.label}>
                  {row.label}
                </span>
                <span className="tabular-nums text-muted-foreground shrink-0 pl-2">
                  {row.count.toLocaleString()} ({row.percentage}%)
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{ width: `${Math.min(100, row.percentage)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
