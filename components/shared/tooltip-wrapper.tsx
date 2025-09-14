import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipWrapperProps {
  children: ReactNode;
  content: string;
  className?: string;
}
export default function TooltipWrapper({
  children,
  content,
  className,
}: TooltipWrapperProps) {
  return (
    <Tooltip>
      <TooltipTrigger className={cn("cursor-pointer", className)}>
        {children}
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
}
