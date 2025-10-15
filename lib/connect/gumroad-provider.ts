import { OAuthProvider } from "@/types/oauth";
import {
  getGumroadAuthUrl,
  exchangeGumroadCode,
  refreshGumroadToken,
  getGumroadUser,
  getGumroadData,
} from "./gumraod";

export const gumroadProvider: OAuthProvider = {
  name: "gumroad",
  defaultScopes: [
    "view_profile",
    "edit_products",
    "view_sales",
    "view_payouts",
    "mark_sales_as_shipped",
    "edit_sales",
  ],
  authUrl: getGumroadAuthUrl,
  exchangeCode: exchangeGumroadCode,
  refreshToken: refreshGumroadToken,
  getUser: getGumroadUser,
  getData: getGumroadData,
};
