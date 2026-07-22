"use client";

import LinkCard from "./card/link/link-card";
import { trackClick } from "@/lib/utils/track-click";
import { FiLink } from "react-icons/fi";

export type BioLink = {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  category?: string | null;
  layout?: "compact" | "minimal" | "detailed";
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
        <LinkCard
          key={link.id}
          name={link.title}
          href={link.url}
          description={link.description ?? undefined}
          category={link.category ?? undefined}
          layout={link.layout ?? "minimal"}
          icon={<FiLink className="size-full" />}
          // Fire-and-forget click tracking before the anchor navigates.
          onClick={() => trackClick({ linkId: link.id })}
        />
      ))}
    </div>
  );
}
