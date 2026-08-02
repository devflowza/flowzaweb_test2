import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { STATUS_PAGE, STATUS_SERVICES } from "@/content/support";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";
import { Container, Section } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "System Status",
  description:
    "Current operational status of all FlowZa AI platforms and shared services, backed by a 99.9% uptime SLA.",
  alternates: { canonical: "/status" },
};

export default function StatusPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/status",
            "FlowZa System Status",
            "Operational status of all FlowZa platforms and services.",
          ),
          breadcrumbNode("/status", [{ label: "Status", href: "/status" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Status" }]}
        badge={STATUS_PAGE.badge}
        title={STATUS_PAGE.title}
        titleHighlight={STATUS_PAGE.titleHighlight}
        subtitle={STATUS_PAGE.subtitle}
      />

      <Section tone="white" className="pt-(--spacing-section-sm)">
        <Container className="max-w-4xl">
          {/* Overall banner */}
          <Reveal>
            <div className="mb-8 flex items-center gap-4 rounded-card border border-emerald-200 bg-emerald-50/70 px-6 py-5">
              <span className="relative flex size-3" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-500" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-[1.0625rem] font-semibold text-emerald-900">
                  All systems operational
                </p>
                <p className="text-sm text-emerald-800/80">{STATUS_PAGE.note}</p>
              </div>
            </div>
          </Reveal>

          {/* Services */}
          <ul className="overflow-hidden rounded-card border border-line bg-surface shadow-(--shadow-hairline)">
            {STATUS_SERVICES.map((service, i) => (
              <li
                key={service.name}
                className={`flex items-center justify-between gap-4 px-6 py-4 ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[0.9375rem] font-medium text-ink">{service.name}</p>
                  <p className="truncate text-[0.8125rem] text-gray">{service.description}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[0.8125rem] font-medium text-emerald-700">
                  <CheckCircle2 className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  Operational
                </span>
              </li>
            ))}
          </ul>

          {/* Incident contact */}
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-card border border-line bg-surface-tint px-6 py-5 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-gray">
                Seeing something we&rsquo;re not? Report it and we&rsquo;ll investigate immediately.
              </p>
              <Button asChild variant="whatsapp" size="md" className="shrink-0">
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Report an issue
                </a>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
