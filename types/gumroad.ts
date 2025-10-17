
/**
 * The shape of the response from the GET /v2/products/:id endpoint.
 */
export interface GumroadProductDetailsResponse {
  success: boolean;
  product: GumroadProduct;
}

/**
 * Defines the structure of the client returned by the gumroadHandler.
 * It contains all the methods for interacting with the Gumroad API.
 */
export interface GumroadApiClient {
  getProductList: () => Promise<GumroadResponse>;
  getProductDetails: (
    productId: string
  ) => Promise<GumroadProductDetailsResponse>;
  // Add types for any other methods you might add later
}


export interface GumroadResponse {
  success: boolean
  products: GumroadProduct[]
}

export interface GumroadProduct {
  custom_permalink: string | null
  custom_receipt: string | null
  custom_summary: string | null
  custom_fields: any[]
  customizable_price: number | null
  description: string
  deleted: boolean
  max_purchase_count: number | null
  name: string
  preview_url: string | null
  require_shipping: boolean
  subscription_duration: string | null
  published: boolean
  url: string
  id: string
  price: number
  purchasing_power_parity_prices: Record<string, number>
  currency: string
  short_url: string
  thumbnail_url: string
  tags: string[]
  formatted_price: string
  file_info: Record<string, unknown>
  sales_count?: string
  sales_usd_cents?: string
  is_tiered_membership: boolean
  recurrences: string[] | null
  variants: GumroadVariant[]
}

export interface GumroadVariant {
  title: string
  options: GumroadVariantOption[]
}

export interface GumroadVariantOption {
  name: string
  price_difference?: number
  purchasing_power_parity_prices?: Record<string, number>
  is_pay_what_you_want: boolean
  recurrence_prices?: Record<string, GumroadRecurrencePrice> | null
}

export interface GumroadRecurrencePrice {
  price_cents: number
  suggested_price_cents: number | null
  purchasing_power_parity_prices: Record<string, number>
}
