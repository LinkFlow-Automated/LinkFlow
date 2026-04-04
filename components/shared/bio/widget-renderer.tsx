"use client";

import { PreviewWidget } from "@/stores/preview-store";
import { NewSongCard } from "./card/spotify/new-song-card";
import { CurrentlyPlayingCard } from "./card/spotify/currently-playing-card";
import NewVideoCard from "./card/youtube/new-video-card";
import NewPostCard from "./card/intagram/new-post";
import SingleProductCard from "./card/product/single-product-card";

interface WidgetRendererProps {
  widget: PreviewWidget;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const config = widget.config as any;

  switch (widget.type) {
    case "spotify":
      if (config?.subtype === "track" || config?.subType === "track") {
        return <NewSongCard {...config} />;
      }
      return <CurrentlyPlayingCard {...config} />;
    case "youtube":
      return <NewVideoCard {...config} />;
    case "instagram":
      return <NewPostCard {...config} />;
    case "gumroad":
      return <SingleProductCard {...config} />;
    default:
      return null;
  }
}
