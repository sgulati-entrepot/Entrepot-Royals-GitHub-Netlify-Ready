import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/netlify-image-loader.ts",
    deviceSizes: [480, 640, 828, 1080, 1440, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
