"use server";

import { randomBytes } from "node:crypto";

/**
 * Generates an OAuth state string containing a CSRF token and the return URL.
 * Format: "csrfToken|returnUrl"
 */
export async function generateOAuthState(returnUrl: string): Promise<string> {
  const csrfToken = randomBytes(32).toString("hex");
  return `${csrfToken}|${returnUrl}`;
}

/**
 * Parses an OAuth state string back into its components.
 */
export async function parseOAuthState(state: string): Promise<{
  csrfToken: string;
  returnUrl: string;
}> {
  const [csrfToken, ...rest] = await state.split("|");
  return { csrfToken, returnUrl: rest.join("|") || "/admin" };
}
