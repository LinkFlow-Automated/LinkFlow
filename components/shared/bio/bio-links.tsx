"use client";

import BioLinkItem from "./bio-link-item";
import { trackClick } from "@/lib/utils/track-click";

export type BioLink = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  category?: string | null;
  layout?: "compact" | "minimal" | "detailed";
  animation?: string | null;
  thumbnail?: string | null;
  thumbnailType?: string | null;
};

export default function BioLinks({ links }: { links: BioLink[] }) {
  if (links.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground py-8">
        No links to show yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <BioLinkItem
          key={link.id}
          data={link}
          // Fire-and-forget click tracking before the anchor navigates.
          onClick={() => trackClick({ linkId: link.id })}
        />
      ))}
    </div>
  );
}
