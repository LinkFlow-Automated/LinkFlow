"use server";
import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

export const getInstagramAuthUrl = async (
  state: string,
  extraScopes: string[] = []
) => {
  const { clientId, redirectUri } = await getProviderCredentials("instagram");
  const defaultScopes = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
  ];
  const scopes = [...defaultScopes, ...extraScopes].join(","); // Fixed: comma separator

  const q = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
    response_type: "code",
    state,
  });

  return `https://api.instagram.com/oauth/authorize?${q.toString()}`;
};

export async function exchangeInstagramCode(code: string) {
  const { clientId, clientSecret, redirectUri } = await getProviderCredentials(
    "instagram"
  );

  // Step 1: Exchange code for short-lived token
  const shortLivedResp = await axios.post(
    "https://api.instagram.com/oauth/access_token", // Fixed endpoint
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const shortLivedToken = shortLivedResp.data.access_token;
  const userId = shortLivedResp.data.user_id;

  // Step 2: Exchange for long-lived token (60 days)
  const longLivedResp = await axios.get(
    "https://graph.instagram.com/access_token",
    {
      params: {
        grant_type: "ig_exchange_token",
        client_secret: clientSecret,
        access_token: shortLivedToken,
      },
    }
  );

  return {
    accessToken: longLivedResp.data.access_token,
    expiresIn: longLivedResp.data.expires_in, // 5184000 seconds (60 days)
    tokenType: longLivedResp.data.token_type,
    userId,
  };
}

export async function refreshInstagramToken(accessToken: string) {
  const { clientSecret } = await getProviderCredentials("instagram");

  // Refresh long-lived token (extends by 60 days)
  const resp = await axios.get(
    "https://graph.instagram.com/refresh_access_token",
    {
      params: {
        grant_type: "ig_refresh_token",
        access_token: accessToken, // Use current token, not refresh token
      },
    }
  );

  return {
    accessToken: resp.data.access_token,
    expiresIn: resp.data.expires_in,
  };
}

export async function getInstagramUser(accessToken: string) {
  const resp = await axios.get("https://graph.instagram.com/me", {
    params: {
      fields: "id,username,account_type,media_count",
      access_token: accessToken,
    },
  });

  return {
    id: resp.data.id,
    username: resp.data.username,
    accountType: resp.data.account_type, // BUSINESS, MEDIA_CREATOR, or PERSONAL
    mediaCount: resp.data.media_count,
  };
}

async function createInstagramClient(accessToken: string) {
  return axios.create({
    baseURL: "https://graph.instagram.com",
    params: {
      access_token: accessToken, // Instagram uses query params, not headers
    },
  });
}

export async function getInstagramData(
  accessToken: string,
  endpoint: string,
  params?: Record<string, any>
) {
  const client = await createInstagramClient(accessToken);

  try {
    const resp = await client.get(endpoint, {
      params: params || {},
    });
    return resp.data;
  } catch (error) {
    console.error("Instagram API Error:", error);
    throw error;
  }
}

// Bonus: Common helper functions

export async function getInstagramMedia(
  accessToken: string,
  limit: number = 25
) {
  return getInstagramData(accessToken, "/me/media", {
    fields:
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username",
    limit,
  });
}

export async function getInstagramMediaById(
  accessToken: string,
  mediaId: string
) {
  return getInstagramData(accessToken, `/${mediaId}`, {
    fields:
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
  });
}

export async function getInstagramInsights(
  accessToken: string,
  mediaId: string
) {
  return getInstagramData(accessToken, `/${mediaId}/insights`, {
    metric: "engagement,impressions,reach,saved",
  });
}
