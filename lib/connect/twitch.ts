"use server";
import axios from "axios";
import { getProviderCredentials } from "./credentials-server";

export const getTwitchAuthUrl = async (
  state: string,
  extraScopes: string[] = []
) => {
  const { clientId, redirectUri } = await getProviderCredentials("twitch");

  const defaultScopes = [
    "user:read:email",
    "channel:read:subscriptions",
    "chat:read",
    "chat:edit",
  ];

  // FIXED: Twitch uses space-separated scopes, not comma
  const scopes = [...defaultScopes, ...extraScopes].join(" ");

  const q = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes,
    state: state,
  });

  return `https://id.twitch.tv/oauth2/authorize?${q.toString()}`;
};

export async function exchangeTwitchCode(code: string) {
  const { clientId, clientSecret, redirectUri } = await getProviderCredentials(
    "twitch"
  );

  // FIXED: Correct token endpoint
  const resp = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    accessToken: resp.data.access_token,
    refreshToken: resp.data.refresh_token, // Added: Twitch provides refresh tokens
    expiresIn: resp.data.expires_in,
    scope: resp.data.scope,
    tokenType: resp.data.token_type,
  };
}

export async function refreshTwitchToken(refreshToken: string) {
  const { clientId, clientSecret } = await getProviderCredentials("twitch");

  const resp = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
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
    scope: resp.data.scope,
  };
}

// Revoke token (logout)
export async function revokeTwitchToken(accessToken: string) {
  const { clientId } = await getProviderCredentials("twitch");

  await axios.post(
    "https://id.twitch.tv/oauth2/revoke",
    new URLSearchParams({
      client_id: clientId,
      token: accessToken,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
}

// Validate token
export async function validateTwitchToken(accessToken: string) {
  const resp = await axios.get("https://id.twitch.tv/oauth2/validate", {
    headers: {
      Authorization: `OAuth ${accessToken}`,
    },
  });

  return {
    clientId: resp.data.client_id,
    login: resp.data.login,
    scopes: resp.data.scopes,
    userId: resp.data.user_id,
    expiresIn: resp.data.expires_in,
  };
}

// Get Twitch user info
export async function getTwitchUser(accessToken: string) {
  const { clientId } = await getProviderCredentials("twitch");

  const resp = await axios.get("https://api.twitch.tv/helix/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId, // Required for Helix API
    },
  });

  const user = resp.data.data[0];

  return {
    id: user.id,
    login: user.login,
    displayName: user.display_name,
    email: user.email,
    profileImageUrl: user.profile_image_url,
    broadcasterType: user.broadcaster_type,
    description: user.description,
    createdAt: user.created_at,
  };
}

// Create Twitch API client
async function createTwitchClient(accessToken: string) {
  const { clientId } = await getProviderCredentials("twitch");

  return axios.create({
    baseURL: "https://api.twitch.tv/helix",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": clientId, // REQUIRED for all Helix API calls
    },
  });
}

// Generic Twitch data fetcher
export async function getTwitchData(
  accessToken: string,
  endpoint: string,
  id?: string,
  params?: Record<string, any>
) {
  const client = await createTwitchClient(accessToken);

  try {
    const resp = await client.get(endpoint, { params });
    return resp.data;
  } catch (error) {
    console.error("Twitch API Error:", error);
    throw error;
  }
}

// Get channel info
// export async function getTwitchChannel(
//   accessToken: string,
//   broadcasterId: string
// ) {
//   return getTwitchData(accessToken, "/channels", {
//     broadcaster_id: broadcasterId,
//   });
// }

// // Get user's videos
// export async function getTwitchVideos(accessToken: string, userId: string) {
//   return getTwitchData(accessToken, "/videos", {
//     user_id: userId,
//     first: 20,
//   });
// }

// // Get channel's followers
// export async function getTwitchFollowers(
//   accessToken: string,
//   broadcasterId: string
// ) {
//   return getTwitchData(accessToken, "/channels/followers", {
//     broadcaster_id: broadcasterId,
//   });
// }
