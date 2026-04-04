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
  defaultScopes: ["instagram_business_basic", "instagram_business_manage_messages"],
  authUrl: getInstagramAuthUrl,
  exchangeCode: exchangeInstagramCode,
  refreshToken: refreshInstagramToken,
  getUser: getInstagramUser,
  getData: getInstagramData,
};
