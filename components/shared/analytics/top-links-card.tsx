import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TopLink = {
  id: string;
  title: string;
  url: string;
  clickEvents: number;
};

interface TopLinksCardProps {
  title?: string;
  links: TopLink[];
  className?: string;
}

export default function TopLinksCard({
  title = "Most clicked",
  links,
  className,
}: TopLinksCardProps) {
  return (
    <Card className={cn("p-4 flex flex-col gap-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4">
          No clicks recorded in this period.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {links.map((link, i) => (
            <li key={link.id} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground w-5 shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {link.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {link.url}
                </p>
              </div>
              <span className="text-sm font-semibold tabular-nums text-foreground shrink-0">
                {link.clickEvents.toLocaleString()}
              </span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
