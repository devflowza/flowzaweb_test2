import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import { SITE } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion";
import { ActionTrio } from "@/components/sections/action-trio";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbNode,
  graph,
  platformsCollectionNode,
  softwareNode,
  webPageNode,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Platforms — Seven Systems. One Operating Fabric.",
  description:
    "Explore the seven FlowZa AI platforms: Finance, LogisPro, Spa Master, Fleetza, QRForge, POS and Club — purpose-built systems that share one operating fabric.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/products",
            "FlowZa AI Platforms",
            "The seven FlowZa AI business platforms — one operating fabric.",
            "CollectionPage",
          ),
          platformsCollectionNode(),
          ...PLATFORMS.map(softwareNode),
          breadcrumbNode("/products", [{ label: "Platforms", href: "/products" }]),
        )}
      />
      <PageHeader
        crumbs={[{ label: "Platforms" }]}
        badge="Our Platforms"
        title="Seven Systems."
        titleHighlight="One Operating Fabric."
        subtitle={`Purpose-built AI platforms for every business vertical — each one deep enough to run your operation, all connected to the same fabric. ${SITE.manifesto}`}
      />

      <Section tone="tint" ghost="SYSTEMS" className="pt-(--spacing-section-sm)">
        <Container>
          <ul className="flex flex-col gap-5">
            {PLATFORMS.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group grid items-center gap-6 rounded-(--radius-shell) border border-line bg-surface p-5 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-lift sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <div className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="hidden font-mono text-sm tracking-widest text-faint sm:block"
                        >
                          {p.index}
                        </span>
                        <span
                          className="flex size-12 shrink-0 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: `${p.color}14`, color: p.colorDeep }}
                        >
                          <p.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold text-ink">
                          {p.name}
                          {p.live ? <Badge variant="live">Live</Badge> : null}
                        </h2>
                        <p className="mt-0.5 text-sm font-medium" style={{ color: p.colorDeep }}>
                          {p.tagline}
                        </p>
                        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-body">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.badges.map((b) => (
                            <Badge key={b} variant="chip">
                              {b}
                            </Badge>
                          ))}
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors group-hover:text-brand-800">
                          Explore {p.shortName}
                          <ArrowRight
                            className="size-4 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:translate-x-1"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="relative hidden h-44 overflow-hidden rounded-(--radius-card) border border-line bg-navy-950 lg:block">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="20rem"
                        className="object-cover object-left-top opacity-95 transition-transform duration-700 ease-(--ease-swift) group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ActionTrio />
    </>
  );
}
