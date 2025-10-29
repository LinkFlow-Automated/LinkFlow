import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Layout = "compact" | "minimal" | "detailed";

interface LinkCardProps {
  name: string;
  icon: ReactNode;
  href: string;
  layout?: Layout;
  description?: string;
  category?: string;
  bgColor?: string;
}

export default function LinkCard({
  name,
  icon,
  href = "amherley.dev",
  layout = "compact",
  description,
  category,
  bgColor = "bg-card",
}: LinkCardProps) {

    const layoutConfig = {
    compact: {
      padding: "p-2",
      iconSize: "size-6",
      gap: "gap-2",
      textSize: "text-sm",
      showMore: false,
      showDescription: false,
      showCategory: false,
    },
    minimal: {
      padding: "p-3",
      iconSize: "size-8",
      gap: "gap-4",
      textSize: "text-lg",
      showMore: true,
      showDescription: false,
      showCategory: false,
    },
    detailed: {
      padding: "p-4",
      iconSize: "size-10",
      gap: "gap-4",
      textSize: "text-xl",
      showMore: true,
      showDescription: true,
      showCategory: true,
    },
  };

  const config = layoutConfig[layout];

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Card
        className={`${config.padding} ${bgColor} hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-border/50`}
      >
        <CardContent className="flex flex-row justify-between p-0 m-0 items-center">
          <div className={`flex flex-row ${config.gap} items-center`}>
            <div className={config.iconSize}>{icon}</div>
            <div className="flex flex-col gap-0.5">
              <span className={`leading-tight line-clamp-1 ${config.textSize} font-medium`}>
                {name}
              </span>
              {config.showCategory && category && (
                <span className="text-xs text-muted-foreground">
                  {category}
                </span>
              )}
              {config.showDescription && description && (
                <span className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {description}
                </span>
              )}
            </div>
          </div>
          {config.showMore ? (
            <ExternalLink className="size-4 text-muted-foreground" />
          ) : (
            <MoreVertical className="size-3 text-muted-foreground" />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
