import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getPlatform, PLATFORM_SLUGS } from "@/content/products";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { PlatformHero } from "@/components/platform/platform-hero";
import {
  PlatformFeatures,
  PlatformRelated,
  PlatformStats,
  PlatformSteps,
  PlatformTestimonial,
} from "@/components/platform/platform-sections";
import { FinanceShowcase } from "@/components/finance/showcase";
import {
  FinanceCompliance,
  FinanceIntegrations,
  FinanceModules,
  FinanceSecurity,
} from "@/components/finance/flagship-sections";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, softwareNode, webPageNode } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return PLATFORM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};
  return {
    title: `${platform.name} — ${platform.tagline}`,
    description: platform.description,
    alternates: { canonical: `/products/${platform.slug}` },
  };
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const isFinance = platform.slug === "finance";
  const path = `/products/${platform.slug}`;

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(path, `${platform.name} — ${platform.tagline}`, platform.description),
          softwareNode(platform),
          breadcrumbNode(path, [
            { label: "Platforms", href: "/products" },
            { label: platform.shortName },
          ]),
        )}
      />
      <PlatformHero platform={platform} />
      <PlatformStats platform={platform} />
      {isFinance ? <FinanceShowcase /> : null}
      <PlatformFeatures platform={platform} />
      {isFinance ? (
        <>
          <FinanceModules />
          <FinanceCompliance />
        </>
      ) : null}
      <PlatformSteps platform={platform} />
      {isFinance ? (
        <>
          <FinanceIntegrations />
          <FinanceSecurity />
        </>
      ) : null}
      <PlatformTestimonial platform={platform} />
      {isFinance ? <PricingSection /> : null}
      <PlatformRelated platform={platform} />
      <CtaBand
        eyebrow={platform.tagline}
        title={`Ready to run on ${platform.name}?`}
        subtitle={
          platform.live
            ? "Start your free trial today — no card required, guided onboarding included."
            : "Early access is rolling out — tell us about your operation and we'll set you up first."
        }
      >
        <Button asChild size="xl" variant="white">
          <a href={platform.appUrl} target="_blank" rel="noopener noreferrer">
            Launch {platform.shortName}
            <ArrowUpRight strokeWidth={2} />
          </a>
        </Button>
        <Button asChild size="xl" variant="whatsapp">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4.5" />
            Chat on WhatsApp
          </a>
        </Button>
      </CtaBand>
    </>
  );
}
