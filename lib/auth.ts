import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {
  admin,
  apiKey,
  haveIBeenPwned,
  mcp,
  organization,
} from "better-auth/plugins";
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
      subscription: {
        enabled: true,
        onSubscriptionComplete: async ({
          event,
          subscription,
          stripeSubscription,
          plan,
        }) => {
          // Called when a subscription is successfully created
          console.log(event, subscription, stripeSubscription, plan);
        },
        onSubscriptionUpdate: async ({ event, subscription }) => {
          // Called when a subscription is updated
          console.log(`Subscription ${subscription.id} updated`, event);
        },
        onSubscriptionCancel: async ({
          event,
          subscription,
          stripeSubscription,
          cancellationDetails,
        }) => {
          // Called when a subscription is canceled
          console.log(
            event,
            subscription,
            stripeSubscription,
            cancellationDetails
          );
        },
        onSubscriptionDeleted: async ({
          event,
          subscription,
          stripeSubscription,
        }) => {
          // Called when a subscription is deleted
          console.log(
            `Subscription ${subscription.id} deleted`,
            event,
            stripeSubscription
          );
        },
        plans: [],
      },
      onEvent: async (event) => {
        switch (event.type) {
          case "invoice.paid":
            break;
          case "payment_intent.succeeded":
            break;
        }
      },
    }),
    admin(),
    apiKey(),
    organization(),
    mcp({ loginPage: "/auth/login" }),
    nextCookies(),
  ],
});
