"use server"
import { OAuth2Client } from "google-auth-library";

// The instantiation now uses OAuth2Client directly
export const oauth2Client = new OAuth2Client(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);