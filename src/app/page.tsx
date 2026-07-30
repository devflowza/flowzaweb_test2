import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { PlatformsGrid } from "@/components/sections/platforms-grid";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyFlowza } from "@/components/sections/why-flowza";
import { FinanceSpotlight } from "@/components/sections/finance-spotlight";
import { PricingSection } from "@/components/sections/pricing-section";
import { Testimonials } from "@/components/sections/testimonials";
import { ActionTrio } from "@/components/sections/action-trio";
import { FaqSection } from "@/components/sections/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { faqNode, graph, webPageNode } from "@/lib/seo";
import { HOME_FAQS } from "@/content/faqs";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode("/", `${SITE.name} — ${SITE.tagline}`, SITE.description),
          faqNode("/", HOME_FAQS),
        )}
      />
      <Hero />
      <PlatformsGrid />
      <HowItWorks />
      <WhyFlowza />
      <FinanceSpotlight />
      <PricingSection />
      <Testimonials />
      <ActionTrio />
      <FaqSection />
    </>
  );
}
