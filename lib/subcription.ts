import Stripe from "stripe";

export default async function handleSubscription(payload: Stripe.Event) {
  const { type, data } = payload;

  switch (type) {
    case "invoice.paid":
      break;

    case "checkout.session.completed":
      break;

    case "customer.subscription.updated":
      break;

    case "customer.subscription.deleted":
      break;
  }
}
