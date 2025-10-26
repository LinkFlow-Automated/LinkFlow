import { OAuthProvider } from "@/types/oauth";
import { getUserData } from "../actions/user-actions";
import {
  exchangeTiktokCode,
  getTiktokAuthUrl,
  getTiktokData,
  getTiktokUser,
  refreshTiktokToken,
} from "./tiktok";

export const tiktokProvider: OAuthProvider = {
  name: "instagram",
  defaultScopes: ["user-read-email", "user-read-private"],
  authUrl: getTiktokAuthUrl,
  exchangeCode: exchangeTiktokCode,
  refreshToken: refreshTiktokToken,
  getUser: getTiktokUser,
  getData: getTiktokData,
};
