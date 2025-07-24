import { apiKeyClient, adminClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    apiKeyClient(),
    adminClient(),
    stripeClient({
      subscription: true,
    }),
  ],
});

export const { signIn, signUp, useSession } = createAuthClient();
