import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { ABOUT_HERO, ABOUT_MISSION, ABOUT_STATS, ABOUT_VALUES } from "@/content/about";
import { CONTACT, SITE } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { CountUp, Reveal } from "@/components/motion";
import { CtaBand } from "@/components/sections/cta-band";
import { FabricDiagram } from "@/components/about/fabric-diagram";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us — Built to Transform Every Business",
  description:
    "FlowZa AI builds nine purpose-built AI business platforms for MEA & India, on the belief that powerful AI shouldn't be reserved for nine-figure budgets.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/about",
            "About FlowZa AI",
            "The story, mission and values behind FlowZa AI.",
            "AboutPage",
          ),
          breadcrumbNode("/about", [{ label: "About", href: "/about" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "About" }]}
        badge={ABOUT_HERO.badge}
        title={ABOUT_HERO.title}
        titleHighlight={ABOUT_HERO.titleHighlight}
        subtitle={ABOUT_HERO.subtitle}
      />

      {/* The operating fabric, drawn from the real platform registry */}
      <FabricDiagram />

      {/* Stats */}
      <Section tone="white" compact className="pt-(--spacing-section-sm)">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 overflow-hidden rounded-card border border-line bg-surface-tint shadow-(--shadow-hairline) lg:grid-cols-4">
              {ABOUT_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative flex flex-col items-center gap-1.5 px-4 py-8 text-center"
                >
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-line lg:block"
                    />
                  ) : null}
                  <dt className="order-2 text-[0.66rem] uppercase tracking-[0.14em] text-gray">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-3xl font-semibold tracking-tight text-ink">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Mission */}
      <Section tone="tint">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>{ABOUT_MISSION.badge}</Eyebrow>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 text-h2 text-ink">{ABOUT_MISSION.title}</h2>
              </Reveal>
              {ABOUT_MISSION.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.16 + i * 0.08}>
                  <p className="mt-5 text-lede text-gray">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.15} className="relative">
              <div className="shadow-(--shadow-soft)">
                <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-card bg-ink p-8">
                  <p className="relative max-w-xs text-h4 text-white">
                    &ldquo;{SITE.positioning}&rdquo;
                  </p>
                  <ul className="relative flex flex-wrap gap-2">
                    {[
                      "Finance",
                      "Logistics",
                      "Wellness",
                      "Fleet",
                      "QR",
                      "Retail",
                      "Clubs",
                      "Rentals",
                      "People",
                    ].map((v) => (
                      <li
                        key={v}
                        className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-white/75"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-(--shadow-lift) backdrop-blur-sm sm:-left-5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {ABOUT_MISSION.floatingBadge.title}
                  </span>
                  <span className="block text-[0.8125rem] text-gray">
                    {ABOUT_MISSION.floatingBadge.subtitle}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What We Stand For"
            subtitle="Six principles that shape every product decision, support conversation and line of code."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_VALUES.map((value, i) => (
              <li key={value.title} className="h-full">
                <Reveal delay={(i % 3) * 0.09} className="h-full">
                  <div className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-(--shadow-hairline) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-soft)">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent-mint text-accent-deep transition-transform duration-500 ease-(--ease-btn) group-hover:scale-110">
                      <value.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{value.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Join Us"
        title="Ready to transform your business?"
        subtitle="Join 100+ businesses already using FlowZa AI to work smarter."
      >
        <Button asChild size="xl" variant="white">
          <Link href="/get-started">
            Get Started
            <ArrowRight strokeWidth={2} />
          </Link>
        </Button>
        <Button asChild size="xl" variant="whatsapp">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4.5" />
            Get in Touch
          </a>
        </Button>
      </CtaBand>
    </>
  );
}
