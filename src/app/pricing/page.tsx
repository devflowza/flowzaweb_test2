import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_FAQS } from "@/content/faqs";
import { CONTACT } from "@/content/site";
import {
  PRICING_PAGE,
  PRODUCT_PRICING,
  QUOTE_PRICING,
  SELF_SERVE_PRICING,
} from "@/content/pricing";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { BillingToggle } from "@/components/pricing/billing-toggle";
import { PricingJumpNav } from "@/components/pricing/pricing-jump-nav";
import { ProductPricingSection } from "@/components/pricing/product-pricing";
import { QuotePricingGrid } from "@/components/pricing/quote-pricing-grid";
import { FaqSection } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, offerCatalogNode, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing — Nine Platforms, Priced Independently",
  description:
    "Per-platform FlowZa pricing: Finance from $16/mo, QRForge from $9/mo, PMS from $49/mo, LogisPro from $299/mo, plus quoted pricing for Club, RentFlow, Spa Master, POS and Fleetza. Free trial on every paid plan.",
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

/** Alternating band tones keep the stacked product sections from reading as one wall. */
const toneFor = (i: number): "white" | "tint" => (i % 2 === 0 ? "white" : "tint");

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/pricing",
            "FlowZa Pricing",
            "Per-platform pricing for all nine FlowZa AI platforms.",
          ),
          offerCatalogNode(),
          // No FAQPage node here: these questions are already marked up on the
          // homepage, and Google treats duplicate FAQPage markup as ineligible.
          breadcrumbNode("/pricing", [{ label: "Pricing", href: "/pricing" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Pricing" }]}
        badge={PRICING_PAGE.badge}
        title={PRICING_PAGE.title}
        titleHighlight={PRICING_PAGE.titleHighlight}
        subtitle={PRICING_PAGE.subtitle}
        image={PRICING_PAGE.image}
      />

      {/*
        `data-billing` is the switch the whole page hangs off: every tier renders
        both figures and CSS reveals one, so all nine products' prices sit in the
        static HTML rather than in client state.
      */}
      <div id="pricing-root" data-billing="monthly">
        <Section tone="white" compact className="pt-[clamp(1.5rem,3vw,2.5rem)]">
          <Container>
            <Reveal className="flex flex-col items-center gap-5 text-center">
              <BillingToggle targetId="pricing-root" />
              <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-gray">
                {PRICING_PAGE.note}
              </p>
            </Reveal>
          </Container>
          <Container className="mt-8">
            <PricingJumpNav products={PRODUCT_PRICING} />
          </Container>
        </Section>

        {SELF_SERVE_PRICING.map((product, i) => (
          <ProductPricingSection key={product.slug} product={product} tone={toneFor(i)} />
        ))}
      </div>

      <QuotePricingGrid products={QUOTE_PRICING} />

      {/* Bundling — why a nine-product price list isn't nine invoices */}
      <Section tone="white" compact>
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-card bg-ink px-8 py-8 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <h2 className="text-h4 text-white">Running more than one platform?</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Platforms share a common data layer, so customers, inventory and ledger entries
                  move between them without re-entry. Tell us which ones you need and we&rsquo;ll
                  quote them as one subscription on a single invoice.
                </p>
              </div>
              <Button asChild variant="white" size="lg" className="shrink-0">
                <Link href="/contact?service=Sales%20Inquiry">
                  Price a bundle
                  <ArrowRight strokeWidth={2} />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FaqSection faqs={PRICING_FAQS} />

      <CtaBand
        eyebrow="Get Started"
        title="Try FlowZa free — decide later."
        subtitle="Every paid plan starts as a free trial. No card required, guided onboarding included."
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
