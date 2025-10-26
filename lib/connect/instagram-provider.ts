import { OAuthProvider } from "@/types/oauth";
import {
  exchangeInstagramCode,
  getInstagramAuthUrl,
  getInstagramData,
  getInstagramUser,
  refreshInstagramToken,
} from "./instagram";

export const instagramProvider: OAuthProvider = {
  name: "instagram",
  defaultScopes: ["user-read-email", "user-read-private"],
  authUrl: getInstagramAuthUrl,
  exchangeCode: exchangeInstagramCode,
  refreshToken: refreshInstagramToken,
  getUser: getInstagramUser,
  getData: getInstagramData,
};
