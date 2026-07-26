import { CONTACT, SITE, SOCIALS } from "@/content/site";
import { PLATFORMS, type Platform } from "@/content/products";
import { PRICING_PLANS, YEARLY_DISCOUNT_PERCENT } from "@/content/pricing";
import type { Faq } from "@/content/faqs";
import type { Crumb } from "@/components/layout/breadcrumbs";

/**
 * Typed schema.org builders. Each page composes a @graph from these and renders
 * it via <JsonLd />. IDs are stable so entities interlink across pages.
 */

type JsonLdNode = Record<string, unknown>;

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
    sameAs: SOCIALS.filter((s) => s.label !== "WhatsApp").map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      telephone: CONTACT.whatsappDisplay.replaceAll(" ", ""),
      availableLanguage: ["en"],
      areaServed: ["OM", "AE", "SA", "QA", "IN", "EG"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Muscat",
      streetAddress: "Ghala",
      addressCountry: "OM",
    },
  };
}

export function webSiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function webPageNode(
  path: string,
  name: string,
  description: string,
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" = "WebPage",
): JsonLdNode {
  return {
    "@type": type,
    "@id": `${SITE.url}${path}#webpage`,
    url: `${SITE.url}${path}`,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function breadcrumbNode(path: string, crumbs: Crumb[]): JsonLdNode {
  const items = [{ label: "Home", href: "/" as const }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}${path}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href
        ? { item: `${SITE.url}${item.href === "/" ? "" : item.href}` || SITE.url }
        : {}),
    })),
  };
}

export function faqNode(path: string, faqs: readonly Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}${path}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function softwareNode(platform: Platform): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/products/${platform.slug}#software`,
    name: platform.name,
    alternateName: platform.tagline,
    description: platform.description,
    url: `${SITE.url}/products/${platform.slug}`,
    image: `${SITE.url}${platform.image}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: { "@id": ORG_ID },
    featureList: platform.features.map((f) => f.title).join(", "),
  };
  if (platform.slug === "finance") {
    node.offers = PRICING_PLANS.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} plan`,
      price: plan.monthlyPrice,
      priceCurrency: "USD",
      description: `${plan.description}. Yearly billing saves ${YEARLY_DISCOUNT_PERCENT}%.`,
      url: `${SITE.url}/pricing`,
      availability: "https://schema.org/InStock",
    }));
  }
  return node;
}

export function platformsCollectionNode(): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${SITE.url}/products#platforms`,
    name: "FlowZa AI Platforms",
    numberOfItems: PLATFORMS.length,
    itemListElement: PLATFORMS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${SITE.url}/products/${p.slug}#software` },
    })),
  };
}

export function offerCatalogNode(): JsonLdNode {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE.url}/pricing#catalog`,
    name: "FlowZa Finance Plans",
    itemListElement: PRICING_PLANS.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} plan`,
      price: plan.monthlyPrice,
      priceCurrency: "USD",
      description: plan.description,
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
    })),
  };
}

export function graph(...nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
