import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Turbopack root config for Next.js 15+
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

