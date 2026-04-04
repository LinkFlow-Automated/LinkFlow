"use server";

// Import the specific YouTube client and your existing oauth2Client
import { youtube as getYoutubeClient } from "@googleapis/youtube";
import { oauth2Client } from "../youtube-client";

/**
 * Generates the Google OAuth2 URL for YouTube authentication.
 * @param state - A unique string to prevent CSRF attacks, which will be returned in the callback.
 * @param extraScopes - An array of any additional scopes you want to request.
 * @returns The generated authorization URL.
 */
export async function getYoutubeAuthUrl(
  state: string,
  extraScopes: string[] = []
) {
  const defaultScopes = ["https://www.googleapis.com/auth/youtube"];
  const scopes = [...new Set([...defaultScopes, ...extraScopes])];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: state,
  });
  return url;
}

/**
 * Exchanges an authorization code from the OAuth2 callback for access and refresh tokens.
 * @param code - The authorization code provided by Google in the redirect URI.
 * @returns An object containing the tokens and their expiry information.
 */
export async function exchangeYoutubeCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  if (!tokens.access_token) {
    throw new Error("Failed to get access token from YouTube");
  }

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token ?? undefined,
    expiresIn:
      typeof tokens.expiry_date === "number" ? tokens.expiry_date : undefined,
    scope: tokens.scope ?? undefined,
  };
}

/**
 * Refreshes an expired access token using a valid refresh token.
 * @param refreshToken - The refresh token obtained during the initial authorization.
 * @returns An object with the new access token and its expiry information.
 */
export async function refreshYoutubeToken(refreshToken: string) {
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });
  const { credentials } = await oauth2Client.refreshAccessToken();

  if (!credentials.access_token) {
    throw new Error("Failed to refresh YouTube access token");
  }

  return {
    accessToken: credentials.access_token,
    expiresIn:
      typeof credentials.expiry_date === "number"
        ? credentials.expiry_date
        : undefined,
  };
}

/**
 * Retrieves basic channel information for the currently authenticated user.
 * @param accessToken - The user's active access token.
 * @returns The user's YouTube channel ID and display name.
 */
export async function getYoutubeUser(accessToken: string) {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const youtube = getYoutubeClient({
    version: "v3",
    auth: oauth2Client,
  });

  const response = await youtube.channels.list({
    part: ["snippet", "id"],
    mine: true,
  });

  if (!response.data.items || response.data.items.length === 0) {
    throw new Error(
      "Could not find a YouTube channel for the authenticated user."
    );
  }

  const channel = response.data.items[0];

  if (!channel.id) {
    throw new Error("YouTube channel ID is missing");
  }

  return {
    id: channel.id,
    displayName: channel.snippet?.title ?? undefined,
  };
}

/**
 * Generic YouTube data fetcher for the provider interface.
 * @param accessToken - The user's active access token.
 * @param endpoint - The type of data to fetch: "videos", "playlists", or "channels".
 * @param id - Optional resource ID (unused for "mine" queries, kept for interface compat).
 * @param params - Optional extra parameters forwarded to the API call.
 * @returns The YouTube API response data.
 */
export async function getYoutubeData(
  accessToken: string,
  endpoint: string,
  id?: string,
  params?: Record<string, unknown>
) {
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = getYoutubeClient({ version: "v3", auth: oauth2Client });

  switch (endpoint) {
    case "videos": {
      // Search for the user's own uploaded videos
      const searchResp = await youtube.search.list({
        part: ["snippet"],
        forMine: true,
        type: ["video"],
        maxResults: 20,
        order: "date",
      });
      return searchResp.data;
    }
    case "playlists": {
      const resp = await youtube.playlists.list({
        part: ["snippet"],
        mine: true,
        maxResults: 20,
      });
      return resp.data;
    }
    case "channels": {
      const resp = await youtube.channels.list({
        part: ["snippet", "statistics"],
        mine: true,
      });
      return resp.data;
    }
    default:
      throw new Error(`Unknown YouTube endpoint: ${endpoint}`);
  }
}
