import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { PLATFORM_NAV_MAP } from "@/content/platforms-nav";
import type { ProductPricing } from "@/content/pricing";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

/**
 * Products with no published list price.
 *
 * A card here is deliberately not a priced tier with the number blanked out —
 * these platforms are quoted per till, per vehicle, per club, and pretending
 * otherwise with a "$—" placeholder would read as an oversight.
 */
export function QuotePricingGrid({ products }: { products: ProductPricing[] }) {
  return (
    <Section id="custom-pricing" tone="tint" className="scroll-mt-28">
      <Container>
        <SectionHeading
          eyebrow="Quoted Per Operation"
          title="Priced On What You Run"
          subtitle="These platforms are scoped per site, vehicle or member rather than per seat, so the number comes from a short conversation. Same shared data layer, same SLA."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const platform = PLATFORM_NAV_MAP[product.slug];
            const tier = product.tiers[0];
            if (!tier) return null;
            return (
              <li key={product.slug} id={product.slug} className="h-full scroll-mt-28">
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <div
                    className="flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-(--shadow-hairline) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-soft)"
                    style={{ borderTopColor: platform.color, borderTopWidth: 3 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="flex size-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${platform.color}14`,
                          color: platform.colorDeep,
                        }}
                      >
                        <platform.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-ink">{platform.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray">
                      {tier.description}
                    </p>
                    <Link
                      href={tier.ctaHref as Route}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep"
                    >
                      {tier.ctaLabel}
                      <ArrowRight
                        className="size-3.5 transition-transform duration-500 ease-(--ease-btn) group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
