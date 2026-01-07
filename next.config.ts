import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Turbopack root config for Next.js 15+
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
