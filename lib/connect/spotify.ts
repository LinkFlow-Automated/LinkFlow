import { OAuthProvider } from "@/types/oauth";
import axios from "axios";

const CLIENT = process.env.SPOTIFY_CLIENT_ID!;
const SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT = process.env.SPOTIFY_REDIRECT_URI!;

export const spotifyProvider: OAuthProvider = {
  name: "spotify",
  defaultScopes: ["user-read-email", "user-read-private"],
  authUrl(state, extraScopes = []) {
    const scopes = [...(this.defaultScopes ?? []), ...extraScopes].join(" ");
    const q = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT,
      redirect_uri: REDIRECT,
      scope: scopes,
      state,
    });
    return `https://accounts.spotify.com/authorize?${q.toString()}`;
  },
  async exchangeCode(code) {
    const resp = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic" + Buffer.from(`${CLIENT}:${SECRET}`).toString("base64"),
        },
      }
    );
    return {
      accessToken: resp.data.access_token,
      refreshToken: resp.data.refresh_token,
      expiresIn: resp.data.expires_in,
      scope: resp.data.scope,
    };
  },
  async refreshToken(refreshToken) {
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
            "Basic " + Buffer.from(`${CLIENT}:${SECRET}`).toString("base64"),
        },
      }
    );
    return {
      accessToken: resp.data.access_token,
      expiresIn: resp.data.expires_in,
    };
  },
  async getUser(accessToken) {
    const resp = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return {
      id: resp.data.id,
      email: resp.data.email,
      displayName: resp.data.display_name,
    };
  },
};
