import type { Metadata } from "next";

import { ChevronRight, Clock, Mail, MapPin, Send } from "lucide-react";
import { CONTACT, SOCIALS } from "@/content/site";
import { CONTACT_PAGE } from "@/content/contact";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { SectionBackdrop } from "@/components/layout/section-backdrop";
import { WhatsAppIcon, socialIconFor } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationPicker } from "@/components/contact/location-picker";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to the FlowZa AI team — WhatsApp, email or the contact form. We respond within one business day. Ghala, Muscat, Oman.",
  alternates: { canonical: "/contact" },
};

/* All-green channel cards, as in the mockup. */
const INFO_CARDS = [
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    line1: "Chat with us on WhatsApp",
    line2: CONTACT.whatsappDisplay,
    line2Accent: true,
    href: CONTACT.whatsappUrl,
  },
  {
    icon: MapPin,
    title: "Office Address",
    line1: CONTACT.address,
    line2: "Near Centara Hotel",
  },
  {
    icon: Clock,
    title: "Business Hours",
    line1: CONTACT.hours,
    line2: CONTACT.hoursClosed,
  },
  {
    icon: Mail,
    title: "Email",
    line1: CONTACT.email,
    line2: "Response within one business day",
    href: `mailto:${CONTACT.email}`,
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

      <section className="relative overflow-hidden">
        <SectionBackdrop
          src="/images/photos/contact-hero-bg.webp"
          wash="bg-gradient-to-b from-white via-white/85 to-white/45"
        />
        <Container className="relative py-[clamp(2.5rem,5vw,5rem)]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            {/* Heading + channels */}
            <div>
              <Reveal>
                <Eyebrow>{CONTACT_PAGE.badge}</Eyebrow>
                <h1 className="mt-5 text-h1 !leading-[1.12] text-ink sm:text-[2.6rem]">
                  Let&rsquo;s Build Something
                  <span className="block text-accent-deep">Together</span>
                </h1>
                <p className="mt-5 max-w-md text-lede text-gray">{CONTACT_PAGE.subtitle}</p>
              </Reveal>

              <div className="mt-8 flex flex-col gap-4">
                {INFO_CARDS.map((card, i) => {
                  const body = (
                    <>
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-accent-deep shadow-(--shadow-subtle)">
                        <card.icon className="size-5.5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9375rem] font-semibold text-ink">
                          {card.title}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-gray">
                          {card.line1}
                        </span>
                        <span
                          className={
                            "line2Accent" in card && card.line2Accent
                              ? "mt-0.5 block text-sm font-semibold text-accent-deep"
                              : "mt-0.5 block text-[0.8125rem] text-gray"
                          }
                        >
                          {card.line2}
                        </span>
                      </span>
                      <ChevronRight
                        className="size-4.5 shrink-0 self-center text-gray-soft"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </>
                  );
                  const classes =
                    "flex items-start gap-4 rounded-2xl bg-white/85 p-5 shadow-(--shadow-subtle) backdrop-blur-sm transition-all duration-500 ease-(--ease-1)";
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
              </div>

              <Reveal delay={0.3}>
                <div className="mt-7 flex items-center gap-4">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gray">
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
                            className="flex size-10 items-center justify-center rounded-full bg-white text-gray shadow-(--shadow-subtle) transition-all duration-300 ease-(--ease-1) hover:text-accent-deep hover:shadow-(--shadow-soft)"
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

            {/* Form card */}
            <Reveal delay={0.12}>
              <div className="rounded-card bg-white p-6 shadow-(--shadow-lift) sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-accent-mint text-accent-deep">
                    <Send className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-h4 text-ink">{CONTACT_PAGE.formTitle}</h2>
                    <p className="mt-0.5 text-sm text-gray">{CONTACT_PAGE.formSubtitle}</p>
                  </div>
                </div>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <LocationPicker />
    </>
  );
}
