import { OAuthProvider } from "@/types/oauth";
import { spotifyProvider } from "./spotify-provider";
import { gumroadProvider } from "./gumroad-provider";
import { youtubeProvider } from "./youtube-provider";
import { instagramProvider } from "./instagram-provider";
import { tiktokProvider } from "./tiktok-provider";

export const providers: Record<string, OAuthProvider> = {
  spotify: spotifyProvider,
  gumroad: gumroadProvider,
  youtube: youtubeProvider,
  instagram: instagramProvider,
  tiktok: tiktokProvider,
};
