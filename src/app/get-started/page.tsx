import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import type { PlatformSlug } from "@/content/products";
import { CONTACT, EXTERNAL_APPS } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

/**
 * Bespoke trial copy for specific platforms. Anything absent here falls back to
 * a generic CTA pointed at its `appUrl`, so every platform appears whether or
 * not it has hand-written copy.
 */
const LIVE_TRIAL_OVERRIDES: Partial<
  Record<PlatformSlug, { cta: string; href: string; note: string }>
> = {
  finance: {
    cta: "Start Free Trial",
    href: EXTERNAL_APPS.financeTrial,
    note: "No card required · guided migration from Zoho or spreadsheets",
  },
  club: {
    cta: "Start 14-Day Trial",
    href: EXTERNAL_APPS.clubApp,
    note: "14-day trial · six-step setup wizard, go live in hours",
  },
};

export const metadata: Metadata = {
  title: "Get Started — Pick Your Platform, Start in Minutes",
  description:
    "Start a free trial on any of the nine FlowZa platforms — no card required, guided onboarding included.",
  alternates: { canonical: "/get-started" },
};

export default function GetStartedPage() {
  const trials = PLATFORMS.map((platform) => ({
    platform,
    ...(LIVE_TRIAL_OVERRIDES[platform.slug] ?? {
      cta: "Start Free Trial",
      href: platform.appUrl,
      note: "No card required",
    }),
  }));

  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/get-started",
            "Get Started with FlowZa",
            "Start a free trial on any FlowZa platform.",
          ),
          breadcrumbNode("/get-started", [{ label: "Get Started", href: "/get-started" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Get Started" }]}
        badge="Get Started"
        title="Pick Your Platform."
        titleHighlight="Start in Minutes."
        subtitle="Every FlowZa platform is available today with a self-serve trial. Pick the one that runs your operation — or tell us what you need and we'll point you to the right fit."
      />

      {/* Live trials */}
      <Section tone="white" className="pt-(--spacing-section-sm)" compact>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trials.map(({ platform, cta, href, note }, i) => (
              <Reveal key={platform.slug} delay={i * 0.1} className="h-full">
                <div
                  className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-7 shadow-(--shadow-soft) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-lift)"
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
                      </h3>
                      <p className="text-sm text-gray">{platform.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray">
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
                        <ArrowUpRight strokeWidth={2} />
                      </a>
                    </Button>
                    <p className="mt-3 text-[0.7rem] uppercase tracking-[0.1em] text-gray">
                      {note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* WhatsApp fallback */}
      <Section tone="white" compact>
        <Container className="flex flex-col items-center gap-5 text-center">
          <Reveal>
            <h2 className="text-h3 text-ink">Not sure which platform fits?</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-xl text-[0.9375rem] text-gray">
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
