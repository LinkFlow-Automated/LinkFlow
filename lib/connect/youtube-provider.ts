import { OAuthProvider } from "@/types/oauth";
import {
  exchangeYoutubeCode,
  getYoutubeAuthUrl,
  getYoutubeData,
  getYoutubeUser,
  refreshYoutubeToken,
} from "./youtube";

export const youtubeProvider: OAuthProvider = {
  name: "youtube",
  defaultScopes: ["https://www.googleapis.com/auth/youtube"],
  authUrl: getYoutubeAuthUrl,
  exchangeCode: exchangeYoutubeCode,
  refreshToken: refreshYoutubeToken,
  getUser: getYoutubeUser,
  getData: getYoutubeData,
};
