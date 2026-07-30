import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Static export for Cloudflare Pages is the default; `standalone` remains for
  // the Dockerfile. Every route prerenders, so export costs nothing — the one
  // former server dependency (the contact action) now runs client-side.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : "export",
  typedRoutes: true,
  // No request-time optimizer in an export. The photos are pre-optimized webps
  // (~60–120KB), so browsers just skip the resize step.
  images: { unoptimized: true },
  // Legacy-route redirects live in public/_redirects (Cloudflare Pages format):
  // `redirects()` needs a server, which a static export doesn't have.
};

const withMDX = createMDX({
  options: {
    // String form keeps plugin config serializable for Turbopack.
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
