import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PopoverType {
  title: string;
  className?: string;
  children: ReactNode;
}
export default function PopoverWrapper({
  title,
  className,
  children,
}: PopoverType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {title}
          </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-80", className)}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
