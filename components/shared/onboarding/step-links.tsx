"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Link2, GripVertical } from "lucide-react";

export function StepLinks({
  links,
  onAddLink,
  onRemoveLink,
  onUpdateLink,
}: {
  links: { title: string; url: string }[];
  onAddLink: () => void;
  onRemoveLink: (index: number) => void;
  onUpdateLink: (index: number, field: "title" | "url", value: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Add your first links
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Share up to 5 links on your profile. You can always add more later.
        </p>
      </div>

      <div className="space-y-3">
        {links.map((link, index) => (
          <div
            key={index}
            className="group relative flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex h-9 w-6 shrink-0 items-center justify-center text-muted-foreground/40">
              <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Link title"
                value={link.title}
                onChange={(e) => onUpdateLink(index, "title", e.target.value)}
                className="h-9 rounded-lg border-border bg-background text-sm font-medium transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
              <Input
                placeholder="https://"
                value={link.url}
                onChange={(e) => onUpdateLink(index, "url", e.target.value)}
                className="h-9 rounded-lg border-border bg-background text-xs text-muted-foreground transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveLink(index)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground/50 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {links.length < 5 && (
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full gap-2 rounded-xl border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground bg-transparent"
            onClick={onAddLink}
          >
            <Plus className="h-4 w-4" />
            Add a link
          </Button>
        )}

        {links.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Link2 className="h-5 w-5 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">
              No links yet. Add one above or skip this step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
