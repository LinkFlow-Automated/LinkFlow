import { Link } from "../generated/prisma";
import { GumroadProduct } from "../../types/gumroad";

type ProviderData =
  | { provider: "gumroad"; data: GumroadProduct }
  | { provider: "instagram"; data: { name: string; description: string } }; // Placeholder for Instagram data

export const transformProviderData = ({
  provider,
  data,
}: ProviderData): Partial<Link> | undefined => {
  switch (provider) {
    case "gumroad":
      return {
        title: data.name,
        description: data.description,
        url: data.short_url,
        thumbnail: data.preview_url,
        type: "image",
        platform: "gumroad",
        clicks: 0,
        autoSyncId: data.id,
        metadata: {
          provider: "gumroad",
          subType: "product",
          data: {
            id: data.id,
            name: data.name,
            description: data.description,
            preview_url: data.preview_url,
            short_url: data.short_url,
            price: data.price,
            currency: data.currency,
            // variants: data.variants.map((variant) => ({
            //   options: variant.options.map((option) => ({
            //     id: option.name,
            //     name: option.name,
            //     price_difference: option.price_difference,
            //     purchasing_power_parity_prices:
            //       option.purchasing_power_parity_prices,
            //     is_pay_what_you_want: option.is_pay_what_you_want,
            //     recurrence_prices: option.recurrence_prices,
            //   })),
            // })),
          },
        },
      };
    case "instagram":
      return {
        title: data.name,
        description: data.description,
      };
    default:
      return undefined;
  }
};
