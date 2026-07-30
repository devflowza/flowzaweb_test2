import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PLATFORMS } from "@/content/products";

// Required by `output: "export"` — metadata routes must opt in to static generation.
export const dynamic = "force-static";

/**
 * Deliberately no lastModified: a build timestamp on every URL tells crawlers
 * nothing. Add real per-entity dates to the content layer if that changes.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/pricing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/get-started`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/locations`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/docs`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/help`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/status`, changeFrequency: "weekly", priority: 0.3 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const platforms: MetadataRoute.Sitemap = PLATFORMS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: p.slug === "finance" ? 0.95 : 0.85,
    images: [`${SITE.url}${p.image}`],
  }));

  return [...core, ...platforms];
}
