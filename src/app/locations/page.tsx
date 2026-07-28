import type { Metadata } from "next";
import { Building2, Globe, MapPin } from "lucide-react";
import { LOCATIONS_PAGE, LOCATION_HIGHLIGHTS, OFFICES } from "@/content/locations";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Locations — Offices in India, Oman & UAE",
  description:
    "FlowZa AI operates from three hubs: Bengaluru (Head Office, CloudValley Solutions OPC Pvt Ltd), Muscat (Development Center, SoarTek LLC) and Dubai, UAE.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/locations",
            "FlowZa Locations",
            "FlowZa AI offices in Bengaluru, Muscat and Dubai.",
          ),
          breadcrumbNode("/locations", [{ label: "Locations", href: "/locations" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Locations" }]}
        badge={LOCATIONS_PAGE.badge}
        title={LOCATIONS_PAGE.title}
        titleHighlight={LOCATIONS_PAGE.titleHighlight}
        subtitle={LOCATIONS_PAGE.subtitle}
      />

      <Section tone="white" className="pt-(--spacing-section-sm)" ghost="GLOBAL">
        <Container>
          <ul className="grid gap-5 md:grid-cols-3">
            {OFFICES.map((office, i) => (
              <li key={office.city} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  <div
                    className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-(--shadow-hairline) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-soft)"
                    style={{ borderTopColor: office.accent, borderTopWidth: 3 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="flex size-11 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${office.accent}14`, color: office.accent }}
                      >
                        <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <Badge>{office.label}</Badge>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-ink">
                      {office.city}, {office.country}
                    </h2>
                    <address className="mt-3 flex-1 text-sm not-italic leading-relaxed text-gray">
                      {office.entity ? (
                        <span className="mb-1 flex items-center gap-1.5 font-semibold text-ink">
                          <Building2
                            className="size-3.5 text-gray"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          {office.entity}
                        </span>
                      ) : null}
                      {office.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="tint" compact>
        <Container>
          <SectionHeading
            eyebrow="One Team"
            title="Three Hubs, One Fabric"
            subtitle="Engineering, product and support work as a single distributed team across India and the Gulf."
          />
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {LOCATION_HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-(--shadow-hairline)">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-mint text-accent-deep">
                    <Globe className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.9875rem] font-semibold text-ink">{h.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray">
                      {h.description}
                    </span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Reach Us"
        title="Talk to the team nearest you"
        subtitle="Wherever you operate, we respond within one business day."
      >
        <Button asChild size="xl" variant="white">
          <a href={`mailto:${CONTACT.contactEmail}`}>Email {CONTACT.contactEmail}</a>
        </Button>
        <Button asChild size="xl" variant="whatsapp">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4.5" />
            WhatsApp Us
          </a>
        </Button>
      </CtaBand>
    </>
  );
}
