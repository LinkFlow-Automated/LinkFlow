"use client";

import BioLinkItem, { type BioLinkItemData } from "./bio-link-item";

export type BioLink = BioLinkItemData & { id: string };

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
        <BioLinkItem key={link.id} data={link} />
      ))}
    </div>
  );
}
