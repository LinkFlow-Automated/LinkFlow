// src/types/gumroad.ts (or wherever you prefer)

/**
 * Represents a single Gumroad product based on their API.
 * NOTE: This is not an exhaustive list of all possible fields.
 */
export interface GumroadProduct {
  id: string;
  name: string;
  preview_url: string;
  description: string;
  customizable_price: boolean;
  published: boolean;
  price: number; // Price in cents
  short_url: string;
  // Add any other product fields you need
}

/**
 * The shape of the response from the GET /v2/products endpoint.
 */
export interface GumroadProductListResponse {
  success: boolean;
  products: GumroadProduct[];
}

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
  getProductList: () => Promise<GumroadProductListResponse>;
  getProductDetails: (
    productId: string
  ) => Promise<GumroadProductDetailsResponse>;
  // Add types for any other methods you might add later
}
