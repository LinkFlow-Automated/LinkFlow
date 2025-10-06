import { OAuthProvider } from "@/types/oauth";
import { gumroadProvider } from "./gumraod";
import { spotifyProvider } from "./spotify-provider";

export const providers: Record<string, OAuthProvider> = {
  spotify: spotifyProvider,
  gumroad: gumroadProvider
};
