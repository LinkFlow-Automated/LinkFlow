"use server";

import { randomBytes } from "node:crypto";

/**
 * Generates an OAuth state string containing a CSRF token and the return URL.
 * Format: "csrfToken|returnUrl"
 */
export function generateOAuthState(returnUrl: string): string {
  const csrfToken = randomBytes(32).toString("hex");
  return `${csrfToken}|${returnUrl}`;
}

/**
 * Parses an OAuth state string back into its components.
 */
export function parseOAuthState(state: string): {
  csrfToken: string;
  returnUrl: string;
} {
  const [csrfToken, ...rest] = state.split("|");
  return { csrfToken, returnUrl: rest.join("|") || "/admin" };
}
