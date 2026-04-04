"use server";

import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

const defaultScopes = [
  "view_profile",
  "edit_products",
  "view_sales",
  "view_payouts",
  "mark_sales_as_shipped",
  "edit_sales",
];

export async function getGumroadAuthUrl(
  state: string,
  extraScopes: string[] = []
) {
  const { clientId, redirectUri } = await getProviderCredentials("gumroad");
  const scopes = [...defaultScopes, ...extraScopes].join(" ");
  const q = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
    state,
  });
  return `https://gumroad.com/oauth/authorize?${q.toString()}`;
}

export async function exchangeGumroadCode(code: string) {
  const { clientId, redirectUri, clientSecret } = await getProviderCredentials(
    "gumroad"
  );
  const resp = await axios.post(
    "https://gumroad.com/oauth/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return {
    accessToken: resp.data.access_token,
    refreshToken: resp.data.refresh_token,
    expiresIn: resp.data.expires_in,
    scope: resp.data.scope,
  };
}

export async function refreshGumroadToken(refreshToken: string) {
  const { clientId, clientSecret } = await getProviderCredentials("gumroad");
  const resp = await axios.post(
    "https://gumroad.com/oauth/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return {
    accessToken: resp.data.access_token,
    expiresIn: resp.data.expires_in,
  };
}

export async function getGumroadUser(accessToken: string) {
  const resp = await axios.get("https://api.gumroad.com/v2/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = resp.data.user;
  return {
    id: String(user.id),
    email: user.email,
    displayName: user.name,
  };
}

async function createGumroadClient(accessToken: string) {
  return axios.create({
    baseURL: "https://api.gumroad.com/v2",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getGumroadData(
  accessToken: string,
  endpoint: string,
  id?: string
) {
  try {
    const apiClient = await createGumroadClient(accessToken);
    const response = await apiClient.get(endpoint, {
      params: id ? { product_id: id } : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Gumroad products:", error);
    throw error;
  }
}
