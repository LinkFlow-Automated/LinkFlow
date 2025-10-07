import { OAuthProvider } from "@/types/oauth";
import {
  exchangeYoutubeCode,
  getYoutubeAuthUrl,
  getYoutubeUser,
  refreshYoutubeToken,
} from "./youtube";

export const youtubeProvider: OAuthProvider = {
  name: "youtube",
  defaultScopes: [
    "view_profile",
    "edit_products",
    "view_sales",
    "view_payouts",
    "mark_sales_as_shipped",
    "edit_sales",
  ],
  authUrl: getYoutubeAuthUrl,
  exchangeCode: exchangeYoutubeCode,
  refreshToken: refreshYoutubeToken,
  getUser: getYoutubeUser,
};
