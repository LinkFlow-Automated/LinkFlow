import { OAuthProvider } from "@/types/oauth";
import { spotifyProvider } from "./spotify";
import { gumroadProvider } from "./gumraod";

export const providers: Record<string, OAuthProvider> = {
  spotify: spotifyProvider,
  gumroad: gumroadProvider
};
