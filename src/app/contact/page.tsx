import type { Metadata } from "next";

import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import { CONTACT, SOCIALS } from "@/content/site";
import { CONTACT_PAGE } from "@/content/contact";
import { OFFICES } from "@/content/locations";
import { Container, Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { WhatsAppIcon, socialIconFor } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to the FlowZa AI team — WhatsApp, email or the contact form. We respond within one business day. Ghala, Muscat, Oman.",
  alternates: { canonical: "/contact" },
};

const INFO_CARDS = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    line1: "Chat with us on WhatsApp",
    line2: CONTACT.whatsappDisplay,
    href: CONTACT.whatsappUrl,
    accent: "#047857",
  },
  {
    icon: MapPin,
    title: "Office Address",
    line1: CONTACT.address,
    line2: "Near Centara Hotel",
    accent: "#2563eb",
  },
  {
    icon: Clock,
    title: "Business Hours",
    line1: CONTACT.hours,
    line2: CONTACT.hoursClosed,
    accent: "#9333ea",
  },
  {
    icon: Mail,
    title: "Email",
    line1: CONTACT.email,
    line2: "Response within one business day",
    href: `mailto:${CONTACT.email}`,
    accent: "#0891b2",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/contact",
            "Contact FlowZa AI",
            "Reach the FlowZa team by WhatsApp, email or contact form.",
            "ContactPage",
          ),
          breadcrumbNode("/contact", [{ label: "Contact", href: "/contact" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        badge={CONTACT_PAGE.badge}
        title="Let's Build Something"
        titleHighlight="Together"
        subtitle={CONTACT_PAGE.subtitle}
      />

      <Section tone="white" className="pt-(--spacing-section-sm)">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            {/* Info column */}
            <div className="flex flex-col gap-4">
              {INFO_CARDS.map((card, i) => {
                const body = (
                  <>
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.accent}14`, color: card.accent }}
                    >
                      <card.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] font-semibold text-ink">
                        {card.title}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-gray">{card.line1}</span>
                      <span className="mt-0.5 block text-[0.8125rem] text-gray">{card.line2}</span>
                    </span>
                  </>
                );
                const classes =
                  "flex items-start gap-4 rounded-card border border-line bg-surface p-5 shadow-(--shadow-hairline) transition-all duration-500 ease-(--ease-1)";
                return (
                  <Reveal key={card.title} delay={i * 0.07}>
                    {"href" in card && card.href ? (
                      <a
                        href={card.href}
                        target={card.href.startsWith("http") ? "_blank" : undefined}
                        rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`${classes} hover:-translate-y-0.5 hover:shadow-(--shadow-soft)`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={classes}>{body}</div>
                    )}
                  </Reveal>
                );
              })}

              <Reveal delay={0.3}>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[0.7rem] uppercase tracking-[0.16em] text-gray">
                    Follow us
                  </span>
                  <ul className="flex gap-2.5">
                    {SOCIALS.map((s) => {
                      const Icon = socialIconFor(s.label);
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-gray transition-all duration-300 ease-(--ease-1) hover:border-accent hover:text-accent-deep"
                          >
                            <Icon className="size-4" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Form column */}
            <Reveal delay={0.12}>
              <div className="shadow-(--shadow-soft)">
                <div className="rounded-card border border-line bg-white p-6 sm:p-8">
                  <h2 className="text-h4 text-ink">{CONTACT_PAGE.formTitle}</h2>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Real offices, for people who prefer to walk in — full detail on /locations */}
      <Section tone="tint" compact>
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-h4 text-ink">Prefer to visit?</h2>
              <Link
                href="/locations"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep"
              >
                See all locations
                <ArrowRight
                  className="size-3.5 transition-transform duration-500 ease-(--ease-btn) group-hover:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {OFFICES.map((office, i) => (
              <li key={office.city} className="h-full">
                <Reveal delay={i * 0.08} className="h-full">
                  <div
                    className="flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-(--shadow-hairline)"
                    style={{ borderTopColor: office.accent, borderTopWidth: 3 }}
                  >
                    <span className="text-[0.66rem] uppercase tracking-[0.14em] text-gray">
                      {office.label}
                    </span>
                    <span className="mt-1.5 text-[1.0625rem] font-semibold text-ink">
                      {office.city}, {office.country}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-gray">
                      {office.addressLines.join(" ")}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
