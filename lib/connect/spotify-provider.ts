import { OAuthProvider } from "@/types/oauth";
import { getSpotifyAuthUrl, exchangeSpotifyCode, refreshSpotifyToken, getSpotifyUser } from "./spotify";

export const spotifyProvider: OAuthProvider = {
  name: "spotify",
  defaultScopes: ["user-read-email", "user-read-private"],
  authUrl: getSpotifyAuthUrl,
  exchangeCode: exchangeSpotifyCode,
  refreshToken: refreshSpotifyToken,
  getUser: getSpotifyUser,
};