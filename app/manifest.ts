import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-static";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Web app manifest so the site installs to a phone home screen and runs
 * standalone — the "mobile app" distribution path without an app store.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — Debate Season Tracker`,
    short_name: BRAND.name,
    description:
      "Track tournaments, save judge feedback, analyze your debate performance, and prepare with checklists and a debate timer.",
    start_url: `${base}/dashboard/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#f7f6f1",
    theme_color: "#191817",
    icons: [
      {
        src: `${base}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
