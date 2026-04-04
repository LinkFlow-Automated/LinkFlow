import { OAuthProvider } from "@/types/oauth";
import {
  exchangeTiktokCode,
  getTiktokAuthUrl,
  getTiktokData,
  getTiktokUser,
  refreshTiktokToken,
} from "./tiktok";

export const tiktokProvider: OAuthProvider = {
  name: "tiktok",
  defaultScopes: ["user.info.basic", "video.list"],
  authUrl: getTiktokAuthUrl,
  exchangeCode: exchangeTiktokCode,
  refreshToken: refreshTiktokToken,
  getUser: getTiktokUser,
  getData: getTiktokData,
};
