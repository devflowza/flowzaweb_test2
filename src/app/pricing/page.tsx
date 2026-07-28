import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_FAQS } from "@/content/faqs";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, offerCatalogNode, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Simple, Transparent Plans from $15/mo",
  description:
    "FlowZa Finance pricing: Starter $15/mo, Professional $40/mo, Enterprise $60/mo — save 25% with yearly billing. Free trial on every plan, no card required.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = HOME_FAQS.filter((f) =>
  [
    "Is there a free trial?",
    "Do you offer yearly billing discounts?",
    "How secure is my business data?",
    "Can the platforms work together?",
  ].includes(f.question),
);

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/pricing",
            "FlowZa Pricing",
            "Simple, transparent pricing for FlowZa Finance — from $15/mo, 25% off yearly.",
          ),
          offerCatalogNode(),
          // No FAQPage node here: these questions are already marked up on the
          // homepage, and Google treats duplicate FAQPage markup as ineligible.
          breadcrumbNode("/pricing", [{ label: "Pricing", href: "/pricing" }]),
        )}
      />
      <PricingSection standalone />
      <FaqSection faqs={PRICING_FAQS} />
      <CtaBand
        eyebrow="Get Started"
        title="Try FlowZa free — decide later."
        subtitle="Every plan starts as a free trial. No card required, guided onboarding included."
      >
        <Button asChild size="xl" variant="white">
          <Link href="/get-started">
            Start Free Trial
            <ArrowRight strokeWidth={2} />
          </Link>
        </Button>
        <Button asChild size="xl" variant="whatsapp">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4.5" />
            Talk to Us
          </a>
        </Button>
      </CtaBand>
    </>
  );
}
