"use client";

export type LayoutType =
  | "compact"
  | "detailed"
  | "minimal"
  | "media"
  | "statistic";

export const getLayoutConfig = (
  layout: LayoutType = "compact"
): {
  containerClass: string;
  titleClass: string;
  descriptionClass: string;
  metaClass: string;
  imageClass?: string;
  statsClass?: string;
} => {
  switch (layout) {
    case "compact":
      return {
        containerClass: "p-3 space-y-2",
        titleClass: "text-sm font-medium line-clamp-1",
        descriptionClass: "text-xs text-muted-foreground line-clamp-2",
        metaClass: "text-xs text-muted-foreground",
      };
    case "detailed":
      return {
        containerClass: "p-6 space-y-4",
        titleClass: "text-lg font-semibold",
        descriptionClass: "text-sm text-muted-foreground line-clamp-3",
        metaClass: "text-sm text-muted-foreground flex items-center gap-2",
      };
    case "minimal":
      return {
        containerClass: "p-4 space-y-1",
        titleClass: "text-base font-medium",
        descriptionClass: "hidden",
        metaClass: "text-xs text-muted-foreground",
      };
    case "media":
      return {
        containerClass: "overflow-hidden",
        titleClass: "text-base font-medium p-4 pb-2",
        descriptionClass: "text-sm text-muted-foreground px-4",
        metaClass: "text-xs text-muted-foreground p-4 pt-2",
        imageClass: "w-full h-32 object-cover",
      };
    case "statistic":
      return {
        containerClass: "p-4 text-center space-y-2",
        titleClass: "text-sm font-medium",
        descriptionClass: "text-xs text-muted-foreground",
        metaClass: "text-xs text-muted-foreground",
        statsClass: "text-2xl font-bold text-primary",
      };
    default:
      return {
        containerClass: "p-4 space-y-2",
        titleClass: "text-base font-medium",
        descriptionClass: "text-sm text-muted-foreground",
        metaClass: "text-sm text-muted-foreground",
      };
  }
};

// Layout metadata for the selector
export const layoutOptions = [
  {
    value: "compact",
    label: "Compact",
    description: "Dense layout with minimal spacing",
  },
  {
    value: "detailed",
    label: "Detailed",
    description: "Spacious layout with full descriptions",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Clean layout with essential info only",
  },
  {
    value: "media",
    label: "Media",
    description: "Image-focused layout with visual emphasis",
  },
  {
    value: "statistic",
    label: "Statistic",
    description: "Number-focused layout for data display",
  },
] as const;
