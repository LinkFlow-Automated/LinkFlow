"use client";

import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface CardStatsProps {
  title: string;
  value: string;
  /** Chronological series driving the sparkline. */
  data: { label: string; value: number }[];
  /** Percentage change vs the previous period. */
  change?: number;
}

const chartConfig = {
  value: { label: "Clicks", color: "var(--chart-1)" },
} satisfies ChartConfig;

export default function CardStats({
  title,
  value,
  data,
  change,
}: CardStatsProps) {
  const hasTrend = typeof change === "number" && Number.isFinite(change);
  const up = (change ?? 0) >= 0;

  return (
    <Card className="flex flex-row p-3 w-full h-30">
      <div className="w-1/2 flex flex-col justify-between">
        <CardTitle className="text-sm text-pretty text-primary/50 line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="font-semibold text-xl text-primary">
          {value}
        </CardDescription>
        {hasTrend ? (
          <div className="text-sm flex items-center text-gray-500">
            <span
              className={cn(
                "mr-1 p-1 rounded-md flex items-center justify-center",
                up ? "bg-green-200" : "bg-red-200"
              )}
            >
              {up ? (
                <FaArrowTrendUp className="text-green-600 size-4" />
              ) : (
                <FaArrowTrendDown className="text-red-600 size-4" />
              )}
            </span>
            <p
              className={cn(
                "font-medium",
                up ? "text-green-600" : "text-red-600"
              )}
            >
              {up ? "+" : "-"}
              {Math.abs(change ?? 0).toFixed(0)}%
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-400">—</div>
        )}
      </div>
      <div className="w-1/2 h-full">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          >
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-value)"
              fillOpacity={0.1}
              stroke="var(--color-value)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
