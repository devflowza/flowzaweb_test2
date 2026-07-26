import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LifeBuoy, Mail } from "lucide-react";
import { DOCS_GETTING_STARTED, DOCS_PAGE } from "@/content/support";
import { PLATFORMS } from "@/content/products";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Documentation — Guides & Onboarding Resources",
  description:
    "Platform guides and onboarding resources for all seven FlowZa AI platforms — from account creation and data migration to going live.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/docs",
            "FlowZa Documentation",
            "Platform guides and onboarding resources for FlowZa AI.",
          ),
          breadcrumbNode("/docs", [{ label: "Documentation", href: "/docs" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Documentation" }]}
        badge={DOCS_PAGE.badge}
        title={DOCS_PAGE.title}
        titleHighlight={DOCS_PAGE.titleHighlight}
        subtitle={DOCS_PAGE.subtitle}
      />

      {/* Browse by product */}
      <Section tone="white" className="pt-(--spacing-section-sm)" compact>
        <Container>
          <Reveal>
            <h2 className="mb-8 text-display-md text-ink">Browse by product</h2>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORMS.map((p, i) => (
              <li key={p.slug} className="h-full">
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex h-full items-start gap-4 rounded-(--radius-shell) border border-line bg-surface p-5 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${p.color}14`, color: p.colorDeep }}
                    >
                      <p.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9875rem] font-semibold text-ink">
                        {p.name}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-body">
                        {p.cardDescription}
                      </span>
                      <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-brand-700 transition-colors group-hover:text-brand-800">
                        Platform overview
                        <ArrowRight
                          className="size-3.5 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Getting started */}
      <Section tone="tint" ghost="START">
        <Container className="max-w-4xl">
          <SectionHeading
            badge="Getting Started"
            title="From Zero to Live in Five Steps"
            subtitle="The onboarding path every FlowZa customer follows — assisted by our team at every step."
          />
          <ol className="space-y-3">
            {DOCS_GETTING_STARTED.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.06}>
                  <div className="flex items-start gap-4 rounded-(--radius-card) border border-line bg-surface p-5 shadow-hairline">
                    <span className="fx-gradient flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[0.9875rem] font-semibold text-ink">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-body">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Support handoff */}
      <Section tone="white" compact>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="h-full">
              <Link
                href="/help"
                className="group flex h-full items-start gap-4 rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <LifeBuoy className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[1.0625rem] font-semibold text-ink">Help Center</span>
                  <span className="mt-1 block text-sm text-body">
                    Answers to the questions we hear most, plus direct support channels.
                  </span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <div className="flex h-full flex-col justify-between gap-4 rounded-(--radius-shell) border border-line bg-navy-950 p-6 sm:flex-row sm:items-center">
                <span className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-300">
                    <Mail className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[1.0625rem] font-semibold text-white">
                      Need something specific?
                    </span>
                    <span className="mt-1 block text-sm text-white/70">
                      Our team answers on WhatsApp within minutes during business hours.
                    </span>
                  </span>
                </span>
                <Button asChild variant="whatsapp" size="md" className="shrink-0">
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
