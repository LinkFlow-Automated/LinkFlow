import { cn } from "@/lib/utils";
import React from "react";

export default function Container({
  children,
  className,
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?:string
}) {
  return (
    <div id={id} className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 scroll-mt-14", className)}>
      {children}
    </div>
  );
}
