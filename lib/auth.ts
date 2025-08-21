import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin, apiKey, haveIBeenPwned, mcp, organization } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";
import { stripeClient } from "./stripe";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    haveIBeenPwned(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
      createCustomerOnSignUp: true,
    }),
    admin(),
    apiKey(),
    organization(),
    mcp({ loginPage: "/auth/login" }),
    nextCookies(),
  ],
});
