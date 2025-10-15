"use server";

import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

export async function getSpotifyAuthUrl(
  state: string,
  extraScopes: string[] = []
) {
  const { clientId, redirectUri } = await getProviderCredentials("spotify");
  const defaultScopes = ["user-read-email", "user-read-private"];
  const scopes = [...defaultScopes, ...extraScopes].join(" ");

  const q = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
    state,
  });
  return `https://accounts.spotify.com/authorize?${q.toString()}`;
}

export async function exchangeSpotifyCode(code: string) {
  const { clientId, clientSecret, redirectUri } = await getProviderCredentials(
    "spotify"
  );
  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    }
  );
  return {
    accessToken: resp.data.access_token,
    refreshToken: resp.data.refresh_token,
    expiresIn: resp.data.expires_in,
    scope: resp.data.scope,
  };
}

export async function refreshSpotifyToken(refreshToken: string) {
  const { clientId, clientSecret } = await getProviderCredentials("spotify");
  const resp = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      },
    }
  );
  return {
    accessToken: resp.data.access_token,
    expiresIn: resp.data.expires_in,
  };
}

export async function getSpotifyUser(accessToken: string) {
  const resp = await axios.get("https://api.spotify.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return {
    id: resp.data.id,
    email: resp.data.email,
    displayName: resp.data.display_name,
  };
}

async function createSpotifyClient(accessToken: string) {
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function getSpotifyData(
  accessToken: string,
  endpoint: string,
  id?: string
) {
  const client = await createSpotifyClient(accessToken);
  try {
    const resp = await client.get(endpoint, {
      params: id ? { id } : {},
    });
    return resp.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
