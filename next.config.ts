import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   typedRoutes: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
