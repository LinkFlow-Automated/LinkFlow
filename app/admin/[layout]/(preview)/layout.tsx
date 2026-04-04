"use client";

import { PixelPreview } from "@/components/shared/pixel-preview";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Smartphone } from "lucide-react";
import { ReactNode } from "react";

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row h-screen max-h-screen min-h-screen relative">
      {/* Editor panel */}
      <div className="w-full md:w-2/3 h-full overflow-y-auto">{children}</div>

      {/* Desktop preview — always visible on md+ */}
      <div className="hidden md:w-1/3 md:flex items-center justify-center h-full border-l bg-muted/20">
        <PixelPreview />
      </div>

      {/* Mobile preview toggle — visible only on small screens */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg"
            >
              <Smartphone className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
            <SheetTitle className="sr-only">Preview</SheetTitle>
            <div className="flex items-start justify-center h-full overflow-y-auto pt-2">
              <PixelPreview />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
