import type { NextConfig } from "next";

// For GitHub Pages the site is served from /<repo-name>/, so the deploy
// workflow sets NEXT_PUBLIC_BASE_PATH=/RoundReview. Local dev leaves it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // each route exports as <route>/index.html for static hosts
  basePath: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
