export interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number; // seconds
  scope?: string;
}
export interface OAuthProvider {
  name: string;
  defaultScopes?: string[];
  authUrl: (state: string, extraScopes?: string[]) => Promise<string>;
  exchangeCode: (code: string) => Promise<OAuthTokens>;
  refreshToken?: (
    refreshToken: string
  ) => Promise<Pick<OAuthTokens, "accessToken" | "expiresIn">>;
  getUser?: (
    accessToken: string
  ) => Promise<{ id: string; email?: string; displayName?: string }>;
}
