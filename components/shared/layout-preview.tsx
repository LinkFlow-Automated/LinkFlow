"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Eye } from "lucide-react"
import { getLayoutConfig, LayoutType } from "@/lib/utils/card-layout"

interface LayoutPreviewProps {
  layout: LayoutType
  isSelected: boolean
}

export function LayoutPreview({ layout, isSelected }: LayoutPreviewProps) {
  const config = getLayoutConfig(layout)

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
            <div className={config.statsClass}>
              <Skeleton className="h-8 w-16" />
            </div>
          )}

          <div className={config.titleClass}>
            <Skeleton className="h-5 w-32" />
          </div>

          <div className={config.descriptionClass}>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className={config.metaClass}>
            {layout === "detailed" ? (
              <>
                <Calendar className="size-3" />
                <Skeleton className="h-3 w-20" />
                <Badge variant="secondary" className="text-xs">
                  <Skeleton className="h-3 w-6" />
                </Badge>
              </>
            ) : (
              <Skeleton className="h-3 w-20" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
