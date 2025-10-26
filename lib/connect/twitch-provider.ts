import { OAuthProvider } from "@/types/oauth";
import {
  exchangeTwitchCode,
  getTwitchAuthUrl,
  getTwitchData,
  getTwitchUser,
  refreshTwitchToken,
} from "./twitch";

export const tiktokProvider: OAuthProvider = {
  name: "twitch",
  defaultScopes: ["user:read:email", "channel:read:subscriptions"],
  authUrl: getTwitchAuthUrl,
  exchangeCode: exchangeTwitchCode,
  refreshToken: refreshTwitchToken,
  getUser: getTwitchUser,
  getData: getTwitchData,
};
