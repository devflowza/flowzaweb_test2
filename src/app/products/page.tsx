import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import { SITE } from "@/content/site";
import { Badge } from "@/components/ui/badge";
import { ImageFrame } from "@/components/ui/image-frame";
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
  title: "Platforms — Nine Systems. One Operating Fabric.",
  description:
    "Explore the nine FlowZa AI platforms: Finance, LogisPro, Spa Master, Fleetza, QRForge, POS, Club, RentFlow and PMS — purpose-built systems that share one operating fabric.",
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
            "The nine FlowZa AI business platforms — one operating fabric.",
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
        title="Nine Systems."
        titleHighlight="One Operating Fabric."
        subtitle={`Purpose-built AI platforms for every business vertical — each one deep enough to run your operation, all connected to the same fabric. ${SITE.manifesto}`}
        /* Brand-level banner: the whole platform range, not one product */
        image={{
          src: "/images/photos/brand-expo.webp",
          alt: "A hand holding a phone to scan a QR code at a FlowZa stand, below a wall headline reading One Platform. All Possibilities. Visitors talk in the background.",
          focal: "left center",
        }}
      />

      <Section tone="tint" className="pt-(--spacing-section-sm)">
        <Container>
          <ul className="flex flex-col gap-5">
            {PLATFORMS.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={Math.min(i * 0.05, 0.2)}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group grid items-center gap-6 rounded-card border border-line bg-surface p-5 shadow-(--shadow-hairline) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-lift) sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                      <div className="flex items-start gap-4">
                        <span
                          aria-hidden="true"
                          className="hidden text-sm tracking-widest text-gray-soft sm:block"
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
                        </h2>
                        <p className="mt-0.5 text-sm font-medium" style={{ color: p.colorDeep }}>
                          {p.tagline}
                        </p>
                        <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-gray">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.badges.map((b) => (
                            <Badge key={b} variant="chip">
                              {b}
                            </Badge>
                          ))}
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep transition-colors group-hover:text-accent-deep">
                          Explore {p.shortName}
                          <ArrowRight
                            className="size-4 transition-transform duration-500 ease-(--ease-btn) group-hover:translate-x-1"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                    <div className="hidden w-80 shrink-0 lg:block">
                      <ImageFrame image={p.image} ratio="4/3" sizes="20rem" />
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
