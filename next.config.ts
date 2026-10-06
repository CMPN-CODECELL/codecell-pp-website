import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next build` writes plain HTML/CSS/JS files to `out/` – host them on S3 +
  // CloudFront (see README.md) or any static host.
  output: "export",
  // No image optimisation server in a static export; the site uses plain <img>.
  images: { unoptimized: true },
  reactStrictMode: true,
  // Hides the round Next.js badge shown at the bottom-left while running `npm run dev`.
  devIndicators: false,
};

export default nextConfig;
