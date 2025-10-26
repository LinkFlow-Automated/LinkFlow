import { OAuthProvider } from "@/types/oauth";
import { getUserData } from "../actions/user-actions";
import {
  exchangeInstagramCode,
  getInstagramAuthUrl,
  getInstagramUser,
  refreshInstagramToken,
} from "./instagram";

export const spotifyProvider: OAuthProvider = {
  name: "instagram",
  defaultScopes: ["user-read-email", "user-read-private"],
  authUrl: getInstagramAuthUrl,
  exchangeCode: exchangeInstagramCode,
  refreshToken: refreshInstagramToken,
  getUser: getInstagramUser,
  getData: getUserData,
};
