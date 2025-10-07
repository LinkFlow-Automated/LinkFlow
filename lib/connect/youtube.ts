"use server";

import { google } from "googleapis";
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

  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expiry_date,
    scope: tokens.scope,
  };
}

/**
 * Refreshes an expired access token using a valid refresh token.
 * Note: The google-auth-library can often handle this automatically if credentials are set.
 * @param refreshToken - The refresh token obtained during the initial authorization.
 * @returns An object with the new access token and its expiry information.
 */
export async function refreshYoutubeToken(refreshToken: string) {
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();

  return {
    accessToken: credentials.access_token,
    expiresIn: credentials.expiry_date,
    scope: credentials.scope,
  };
}

/**
 * Retrieves basic channel information for the currently authenticated user.
 * @param accessToken - The user's active access token.
 * @param refreshToken - Optional. The user's refresh token. The library can use this to refresh the access token if it's expired.
 * @returns The user's YouTube channel ID, display name, and thumbnail URL.
 */
export async function getYoutubeUser(
  accessToken: string,
  refreshToken?: string
) {
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client, // youtube api will be hereeee
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

  return {
    id: channel.id,
    displayName: channel.snippet?.title,
    thumbnail: channel.snippet?.thumbnails?.default?.url,
  };
}
