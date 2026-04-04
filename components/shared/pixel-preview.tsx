/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <> */

"use client";

import HeroSection from "./bio/hero/hero-section";
import LinkCard from "./bio/card/link/link-card";
// import BioFooter from "./bio/footer/footer";
import { Iphone } from "@/components/ui/iphone";
import { usePreviewStore } from "@/stores/preview-store";
import { Link2 } from "lucide-react";
import { WidgetRenderer } from "./bio/widget-renderer";

// Main Pixel Preview Component — uses the reusable Iphone frame
export const PixelPreview = () => {
  // Read from the Zustand preview store (selector-based for perf)
  const displayName = usePreviewStore((s) => s.displayName);
  const username = usePreviewStore((s) => s.username);
  const bio = usePreviewStore((s) => s.bio);
  const image = usePreviewStore((s) => s.image);
  const links = usePreviewStore((s) => s.links);
  const widgets = usePreviewStore((s) => s.widgets);

  // Design values from store
  const backgroundColor = usePreviewStore((s) => s.backgroundColor);
  const textColor = usePreviewStore((s) => s.textColor);
  const fontFamily = usePreviewStore((s) => s.fontFamily);

  return (
    <div className="relative mx-auto w-full max-w-[380px] p-6">
      <Iphone>
        <div
          className="relative w-full h-full flex flex-col"
          style={{
            backgroundColor,
            color: textColor,
            fontFamily,
          }}
        >
          {/* App Content Area */}
          <div className="flex-grow p-0 overflow-y-auto flex flex-col gap-4 w-full pb-8">
            <div>
              <HeroSection
                name={displayName || "Your Name"}
                bio={bio}
                avatar={image}
              />
            </div>

            {/* Links from store */}
            <div className="flex flex-col gap-2 px-4">
              {links.length > 0 ? (
                links
                  .sort((a, b) => a.order - b.order)
                  .map((link) => (
                    <LinkCard
                      key={link.id}
                      name={link.title || "Untitled"}
                      icon={<Link2 className="size-4" />}
                      href={link.url || "#"}
                    />
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Link2 className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No links yet
                  </p>
                </div>
              )}
            </div>

            {/* Widgets from store */}
            {widgets.length > 0 && (
              <div className="flex flex-col gap-2 px-4">
                {widgets
                  .sort((a, b) => a.position - b.position)
                  .map((widget) => (
                    <WidgetRenderer key={widget.id} widget={widget} />
                  ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {/* <BioFooter user={{ name: username || "..." }} /> */}
        </div>
      </Iphone>
    </div>
  );
};
