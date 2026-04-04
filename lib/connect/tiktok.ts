"use server";
import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

export const getTiktokAuthUrl = async (
  state: string,
  extraScopes: string[] = []
) => {
  const { clientId, redirectUri } = await getProviderCredentials("tiktok");

  const defaultScopes = ["user.info.basic", "video.list"];
  const scopes = [...defaultScopes, ...extraScopes].join(",");

  const q = new URLSearchParams({
    client_key: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    state,
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${q.toString()}`;
};

export async function exchangeTiktokCode(code: string) {
  const { clientId, clientSecret, redirectUri } = await getProviderCredentials(
    "tiktok"
  );

  // FIXED: Wrong endpoint - should be /token not /authorize/
  const resp = await axios.post(
    "https://open.tiktokapis.com/v2/oauth/token/",
    {
      client_key: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    accessToken: resp.data.access_token,
    refreshToken: resp.data.refresh_token,
    expiresIn: resp.data.expires_in,
    openId: resp.data.open_id, // TikTok user ID
    scope: resp.data.scope,
    tokenType: resp.data.token_type,
  };
}

export async function refreshTiktokToken(refreshToken: string) {
  const { clientId, clientSecret } = await getProviderCredentials("tiktok");

  const resp = await axios.post(
    "https://open.tiktokapis.com/v2/oauth/token/",
    {
      client_key: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    accessToken: resp.data.access_token,
    refreshToken: resp.data.refresh_token,
    expiresIn: resp.data.expires_in,
    openId: resp.data.open_id,
  };
}

// Get TikTok user info
export async function getTiktokUser(accessToken: string) {
  const resp = await axios.get("https://open.tiktokapis.com/v2/user/info/", {
    params: {
      fields: "open_id,union_id,avatar_url,display_name,username",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return {
    id: resp.data.data.user.open_id,
    username: resp.data.data.user.username,
    displayName: resp.data.data.user.display_name,
    avatarUrl: resp.data.data.user.avatar_url,
  };
}

// Create TikTok API client
async function createTiktokClient(accessToken: string) {
  return axios.create({
    baseURL: "https://open.tiktokapis.com/v2",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

// Generic TikTok data fetcher
export async function getTiktokData(
  accessToken: string,
  endpoint: string,
  id?: string,
  params?: any
) {
  const client = await createTiktokClient(accessToken);

  try {
    const resp = await client.post(endpoint, params || {});
    return resp.data;
  } catch (error) {
    console.error("TikTok API Error:", error);
    throw error;
  }
}

// Get user's videos
export async function getTiktokVideos(
  accessToken: string,
  maxCount: number = 20
) {
  return getTiktokData(accessToken, "/video/list/", undefined, {
    max_count: maxCount,
  });
}
