import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
  },
  // Optional: enable strict mode and future optimizations
  reactStrictMode: true,
  swcMinify: true,


};

export default nextConfig;
