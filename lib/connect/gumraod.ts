// providers/gumroad.ts
import { OAuthProvider } from "@/types/oauth";
import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

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
  async authUrl(state, extraScopes = []) {
    const { CLIENT, REDIRECT } = await getProviderCredentials("gumroad");
    const scopes = [...(this.defaultScopes ?? []), ...extraScopes].join(" ");
    const q = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT,
      redirect_uri: REDIRECT,
      scope: scopes,
      state,
    });
    return `https://gumroad.com/oauth/authorize?${q.toString()}`;
  },
  async exchangeCode(code) {
    const { CLIENT, REDIRECT, SECRET } = await getProviderCredentials(
      "gumroad"
    );
    const resp = await axios.post(
      "https://gumroad.com/oauth/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT,
        client_id: CLIENT,
        client_secret: SECRET,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return {
      accessToken: resp.data.access_token,
      refreshToken: resp.data.refresh_token,
      expiresIn: resp.data.expires_in,
      scope: resp.data.scope,
    };
  },
  async refreshToken(refreshToken) {
    const { CLIENT, SECRET } = await getProviderCredentials("gumroad");
    const resp = await axios.post(
      "https://gumroad.com/oauth/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: CLIENT,
        client_secret: SECRET,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return {
      accessToken: resp.data.access_token,
      expiresIn: resp.data.expires_in,
    };
  },
  async getUser(accessToken) {
    const resp = await axios.get("https://api.gumroad.com/v2/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const user = resp.data.user;
    return {
      id: String(user.id),
      email: user.email,
      displayName: user.name,
    };
  },
};
