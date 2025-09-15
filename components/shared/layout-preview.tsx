"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye } from "lucide-react";
import { getLayoutConfig, LayoutType } from "@/lib/utils/card-layout";

interface LayoutPreviewProps {
  layout: LayoutType;
  isSelected: boolean;
}

export function LayoutPreview({ layout, isSelected }: LayoutPreviewProps) {
  const config = getLayoutConfig(layout);

  return (
    <div className="border rounded-lg bg-background/50 p-2">
      <Card className="w-full max-w-xs mx-auto">
        <CardContent className={config.containerClass}>
          {/* Media layout shows image first */}
          {layout === "media" && config.imageClass && (
            <div
              className={`bg-gradient-to-br from-primary/20 to-primary/5 ${config.imageClass} rounded-md flex items-center justify-center`}
            >
              <Eye className="size-6 text-primary/60" />
            </div>
          )}

          {/* Statistic layout shows big number */}
          {layout === "statistic" && config.statsClass && (
            <div className={config.statsClass}>42.5K</div>
          )}

          <h3 className={config.titleClass}>Sample Card Title</h3>

          <p className={config.descriptionClass}>
            This is a sample description that shows how the layout will look
            with your content.
          </p>

          <div className={config.metaClass}>
            {layout === "detailed" ? (
              <>
                <Calendar className="size-3" />
                <span>Dec 15, 2024</span>
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              </>
            ) : (
              <span>Dec 15, 2024</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
