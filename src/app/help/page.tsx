import type { Metadata } from "next";
import { HELP_FAQS, HELP_PAGE, HELP_TOPICS, SUPPORT_CHANNELS } from "@/content/support";
import { CONTACT } from "@/content/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, faqNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Help Center — Support & FAQs",
  description:
    "Get help with FlowZa AI platforms: onboarding, billing, security, data export and team management — plus WhatsApp and email support channels.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/help",
            "FlowZa Help Center",
            "Support answers and direct channels for FlowZa AI customers.",
          ),
          faqNode("/help", HELP_FAQS),
          breadcrumbNode("/help", [{ label: "Help Center", href: "/help" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Help Center" }]}
        badge={HELP_PAGE.badge}
        title={HELP_PAGE.title}
        titleHighlight={HELP_PAGE.titleHighlight}
        subtitle={HELP_PAGE.subtitle}
        image={HELP_PAGE.image}
      />

      {/* Topics */}
      <Section tone="white" className="pt-(--spacing-section-sm)" compact>
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_TOPICS.map((topic, i) => (
              <li key={topic.title} className="h-full">
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <div className="flex h-full items-start gap-4 rounded-card border border-line bg-surface p-5 shadow-(--shadow-hairline) transition-all duration-600 ease-(--ease-1) hover:-translate-y-0.5 hover:shadow-(--shadow-soft)">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-mint text-accent-deep">
                      <topic.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.9875rem] font-semibold text-ink">
                        {topic.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-gray">{topic.description}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQs */}
      <Section tone="tint" ghost="FAQ">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Common Questions"
            subtitle="Everything from onboarding speed to security and data export."
          />
          <Reveal>
            <Accordion type="single" collapsible className="space-y-3">
              {HELP_FAQS.map((faq, i) => (
                <AccordionItem key={faq.question} value={`help-faq-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </Section>

      {/* Channels */}
      <Section tone="white" compact>
        <Container>
          <SectionHeading
            eyebrow="Talk to a Human"
            title="Still Need a Hand?"
            subtitle="Two direct channels — no ticket queues, no bots."
          />
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {SUPPORT_CHANNELS.map((channel, i) => {
              const isWhatsApp = channel.title === "WhatsApp";
              return (
                <Reveal key={channel.title} delay={i * 0.08} className="h-full">
                  <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6 text-center shadow-(--shadow-hairline)">
                    <span
                      className={`mx-auto flex size-12 items-center justify-center rounded-2xl ${
                        isWhatsApp
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-accent-mint text-accent-deep"
                      }`}
                    >
                      <channel.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-[1.0625rem] font-semibold text-ink">
                      {channel.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">
                      {channel.description}
                    </p>
                    <div className="mt-5">
                      {isWhatsApp ? (
                        <Button asChild variant="whatsapp" size="md" className="w-full">
                          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <WhatsAppIcon className="size-4" />
                            {channel.ctaLabel}
                          </a>
                        </Button>
                      ) : (
                        <Button asChild variant="outlined" size="md" className="w-full">
                          <a href={`mailto:${CONTACT.supportEmail}`}>{channel.ctaLabel}</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
