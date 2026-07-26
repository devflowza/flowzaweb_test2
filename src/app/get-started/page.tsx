import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import { CONTACT, EXTERNAL_APPS } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Get Started — Pick Your Platform, Start in Minutes",
  description:
    "FlowZa Finance and FlowZa Club are live today with self-serve trials. Tell us which platform you need and we'll set you up first.",
  alternates: { canonical: "/get-started" },
};

const LIVE_TRIALS = [
  {
    slug: "finance",
    cta: "Start Free Trial",
    href: EXTERNAL_APPS.financeTrial,
    note: "No card required · guided migration from Zoho or spreadsheets",
  },
  {
    slug: "club",
    cta: "Start 14-Day Trial",
    href: EXTERNAL_APPS.clubApp,
    note: "14-day trial · six-step setup wizard, go live in hours",
  },
] as const;

export default function GetStartedPage() {
  const live = LIVE_TRIALS.map((t) => ({
    ...t,
    platform: PLATFORMS.find((p) => p.slug === t.slug)!,
  }));
  const comingSoon = PLATFORMS.filter((p) => !p.live);

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/get-started",
            "Get Started with FlowZa",
            "Start a free trial on a live FlowZa platform, or request early access.",
          ),
          breadcrumbNode("/get-started", [{ label: "Get Started", href: "/get-started" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Get Started" }]}
        badge="Get Started"
        title="Pick Your Platform."
        titleHighlight="Start in Minutes."
        subtitle="FlowZa Finance and FlowZa Club are live today with self-serve trials. The rest of the fabric is rolling out — tell us which one you need and we'll set you up first."
      />

      {/* Live trials */}
      <Section tone="white" className="pt-(--spacing-section-sm)" compact>
        <Container>
          <Reveal>
            <h2 className="mb-8 flex items-center gap-3 text-display-md text-ink">
              Live today
              <Badge variant="live">Self-serve</Badge>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {live.map(({ platform, cta, href, note }, i) => (
              <Reveal key={platform.slug} delay={i * 0.1} className="h-full">
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-(--radius-shell) border border-line bg-surface p-7 shadow-soft transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-lift"
                  style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex size-12 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${platform.color}14`,
                        color: platform.colorDeep,
                      }}
                    >
                      <platform.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
                        {platform.name}
                        <Badge variant="live">Live</Badge>
                      </h3>
                      <p className="text-sm text-muted">{platform.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-body">
                    {platform.cardDescription}
                  </p>
                  <div className="mt-6">
                    <Button
                      asChild
                      size="lg"
                      className="w-full border-0 sm:w-auto"
                      style={{
                        backgroundImage: `linear-gradient(100deg, color-mix(in oklab, ${platform.colorDeep}, black 22%), ${platform.colorDeep})`,
                        boxShadow: `0 14px 34px -12px ${platform.colorDeep}80, inset 0 1px 1px rgb(255 255 255 / 0.25)`,
                      }}
                    >
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {cta}
                        <ButtonIcon>
                          <ArrowUpRight strokeWidth={2} />
                        </ButtonIcon>
                      </a>
                    </Button>
                    <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted">
                      {note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Coming soon → tagged leads */}
      <Section tone="tint" compact>
        <Container>
          <Reveal>
            <h2 className="mb-3 text-display-md text-ink">Rolling out next</h2>
            <p className="mb-8 max-w-2xl text-[0.9375rem] text-body">
              These platforms are in controlled rollout. Request early access and we&rsquo;ll
              prioritize your onboarding.
            </p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((platform, i) => (
              <li key={platform.slug} className="h-full">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-0.5 hover:shadow-soft">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${platform.color}14`,
                          color: platform.colorDeep,
                        }}
                      >
                        <platform.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[0.9875rem] font-semibold text-ink">{platform.name}</h3>
                        <p className="text-[0.8125rem] text-muted">{platform.tagline}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                      <Badge>Coming Soon</Badge>
                      <Link
                        href={`/contact?service=${encodeURIComponent(platform.name)}`}
                        className="group flex items-center gap-1 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                      >
                        Get Early Access
                        <ArrowRight
                          className="size-3.5 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* WhatsApp fallback */}
      <Section tone="white" compact>
        <Container className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <h2 className="text-display-md text-ink">Not sure which platform fits?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-[0.9375rem] text-body">
              Chat with our team — we&rsquo;ll map your operation to the right platform and get you
              a personalized walkthrough.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <Button asChild variant="whatsapp" size="xl">
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4.5" />
                {CONTACT.whatsappDisplay}
              </a>
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
