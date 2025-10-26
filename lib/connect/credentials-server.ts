"use server";

type ProviderCredentials = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  [key: string]: string; // Allow additional provider-specific credentials
};

const PROVIDER_ENV_MAPPING = {
  spotify: {
    clientId: "SPOTIFY_CLIENT_ID",
    clientSecret: "SPOTIFY_CLIENT_SECRET",
    redirectUri: "SPOTIFY_REDIRECT_URI",
  },
  gumroad: {
    clientId: "GUMROAD_CLIENT_ID",
    clientSecret: "GUMROAD_CLIENT_SECRET",
    redirectUri: "GUMROAD_REDIRECT_URI",
  },
  youtube: {
    clientId: "YOUTUBE_CLIENT_ID",
    clientSecret: "YOUTUBE_CLIENT_SECRET",
    redirectUri: "YOUTUBE_REDIRECT_URI",
  },
  instagram: {
    clientId: "INSTAGRAM_CLIENT_ID",
    clientSecret: "INSTAGRAM_CLIENT_SECRET",
    redirectUri: "INSTAGRAM_REDIRECT_URI",
  },
  twitter: {
    clientId: "TWITTER_CLIENT_ID",
    clientSecret: "TWITTER_CLIENT_SECRET",
    redirectUri: "TWITTER_REDIRECT_URI",
  },
  twitch: {
    clientId: "TWITCH_CLIENT_ID",
    clientSecret: "TWITCH_CLIENT_SECRET",
    redirectUri: "TWITCH_REDIRECT_URI",
  },
  tiktok: {
    clientId: "TIKTOK_CLIENT_ID",
    clientSecret: "TIKTOK_CLIENT_SECRET",
    redirectUri: "TIKTOK_REDIRECT_URI",
  },
} as const;

export async function getProviderCredentials(
  provider: keyof typeof PROVIDER_ENV_MAPPING
): Promise<ProviderCredentials> {
  const envMapping = PROVIDER_ENV_MAPPING[provider];

  const credentials: ProviderCredentials = {
    clientId: "",
    clientSecret: "",
    redirectUri: "",
  };

  // Get all credentials for the provider
  for (const [key, envKey] of Object.entries(envMapping)) {
    const value = process.env[envKey];
    if (!value) {
      throw new Error(
        `Missing required environment variable ${envKey} for ${provider} OAuth`
      );
    }
    credentials[key as keyof ProviderCredentials] = value;
  }

  return credentials;
}
