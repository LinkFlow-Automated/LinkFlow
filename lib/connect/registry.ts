import { OAuthProvider } from "@/types/oauth";
import { spotifyProvider } from "./spotify-provider";
import { gumroadProvider } from "./gumroad-provider";

export const providers: Record<string, OAuthProvider> = {
  spotify: spotifyProvider,
  gumroad: gumroadProvider
};
