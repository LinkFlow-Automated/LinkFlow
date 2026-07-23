/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <> */

"use client";

import HeroSection from "./bio/hero/hero-section";
import BioLinkItem from "./bio/bio-link-item";
// import BioFooter from "./bio/footer/footer";
import { Iphone } from "@/components/ui/iphone";
import { usePreviewStore } from "@/stores/preview-store";
import { Link2 } from "lucide-react";
import { WidgetRenderer } from "./bio/widget-renderer";
import { socialPlatform } from "@/lib/social-platforms";

// Main Pixel Preview Component — uses the reusable Iphone frame
export const PixelPreview = () => {
  // Read from the Zustand preview store (selector-based for perf)
  const displayName = usePreviewStore((s) => s.displayName);
  const username = usePreviewStore((s) => s.username);
  const bio = usePreviewStore((s) => s.bio);
  const image = usePreviewStore((s) => s.image);
  const links = usePreviewStore((s) => s.links);
  const widgets = usePreviewStore((s) => s.widgets);
  const socials = usePreviewStore((s) => s.socials);

  const socialIcons = socials.flatMap((s) => {
    const platform = socialPlatform(s.platform);
    return platform
      ? [{ label: platform.label, icon: platform.icon, href: s.url }]
      : [];
  });

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
                socialIcons={socialIcons}
              />
            </div>

            {/* Links from store */}
            <div className="flex flex-col gap-2 px-4">
              {links.length > 0 ? (
                [...links]
                  .sort((a, b) => a.order - b.order)
                  .map((link) => (
                    <BioLinkItem
                      key={link.id}
                      data={{
                        title: link.title || "Untitled",
                        url: link.url || "#",
                        animation: link.animation,
                        thumbnail: link.thumbnail,
                        thumbnailType: link.thumbnailType,
                      }}
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
                {[...widgets]
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
