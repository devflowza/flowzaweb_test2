import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // `standalone` is used by the Dockerfile; OpenNext (Cloudflare) uses the default output.
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
  },
  async redirects() {
    return [
      // Legacy routes from the previous site — the Finance demo now lives on the flagship page.
      { source: "/finance", destination: "/products/finance", permanent: true },
      { source: "/finance-demo", destination: "/products/finance", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // String form keeps plugin config serializable for Turbopack.
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
