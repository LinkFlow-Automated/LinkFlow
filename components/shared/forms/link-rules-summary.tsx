"use client";

import { Badge } from "@/components/ui/badge";
import {
  summarizeRules,
  type RuleCategory,
} from "@/lib/utils/rules-normalizer";
import { TiWorld } from "react-icons/ti";
import { PiDevicesFill } from "react-icons/pi";
import { HiOutlineCursorArrowRays } from "react-icons/hi2";
import { AiFillSchedule } from "react-icons/ai";
import { TbTestPipe } from "react-icons/tb";
import type { IconType } from "react-icons/lib";

const LABELS: Record<RuleCategory, { label: string; icon: IconType }> = {
  geo: { label: "Geo", icon: TiWorld },
  device: { label: "Device", icon: PiDevicesFill },
  limits: { label: "Limits", icon: HiOutlineCursorArrowRays },
  schedule: { label: "Schedule", icon: AiFillSchedule },
  abtest: { label: "A/B", icon: TbTestPipe },
};

export default function LinkRulesSummary({ rules }: { rules: unknown }) {
  const active = summarizeRules(rules);
  if (active.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs text-muted-foreground">Rules:</span>
      {active.map((cat) => {
        const { label, icon: Icon } = LABELS[cat];
        return (
          <Badge
            key={cat}
            variant="secondary"
            className="gap-1 px-1.5 py-0 text-[10px] font-medium"
          >
            <Icon className="size-3" />
            {label}
          </Badge>
        );
      })}
    </div>
  );
}
