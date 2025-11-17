import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'www.zdnet.com',
      'www.pcworld.com',
      'www.techspot.com',
      'www.bleepingcomputer.com',
      'www.eweek.com',
      'www.techmeme.com',
      'www.analyticsvidhya.com',
      'techcrunch.com',
      'www.wired.com',
      'www.theverge.com',
      'www.engadget.com',
      'www.cnet.com',
      'www.techradar.com',
      'www.gizmodo.com',
      'bair.berkeley.edu'
    ],
  },

  // Optional: enable strict mode and future optimizations
  reactStrictMode: true,
};

export default nextConfig;
