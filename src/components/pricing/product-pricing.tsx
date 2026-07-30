import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { PLATFORM_NAV_MAP } from "@/content/platforms-nav";
import { entryPrice, formatPrice, type ProductPricing } from "@/content/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";
import { TierPrice } from "./price";

/**
 * One product's tier row, themed with that platform's own accent so the page
 * reads as nine priced products rather than one table repeated nine times.
 */
export function ProductPricingSection({
  product,
  tone,
}: {
  product: ProductPricing;
  tone: "white" | "tint";
}) {
  const platform = PLATFORM_NAV_MAP[product.slug];
  const from = entryPrice(product);
  const cols = product.tiers.length;

  return (
    <Section id={product.slug} tone={tone} compact className="scroll-mt-28">
      <Container>
        {/* Product header */}
        <Reveal>
          <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${platform.color}14`, color: platform.colorDeep }}
              >
                <platform.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h2 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold text-ink">
                  {platform.name}
                  {platform.live ? <Badge variant="live">Live</Badge> : <Badge>Coming Soon</Badge>}
                </h2>
                <p className="mt-0.5 text-sm font-medium" style={{ color: platform.colorDeep }}>
                  {platform.cardTagline}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:justify-end">
              {from !== null ? (
                <p className="text-sm text-gray">
                  From{" "}
                  <span className="text-base font-semibold text-ink">${formatPrice(from)}</span>/mo
                </p>
              ) : null}
              <Link
                href={`/products/${product.slug}`}
                className="text-sm font-semibold text-accent-deep underline underline-offset-4"
              >
                What it does
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Everything-included strip, where the tiers differ only by capacity */}
        {product.includedInEvery ? (
          <Reveal delay={0.06}>
            <div className="mt-6 rounded-card border border-line bg-surface-mint p-5">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-gray">
                In every {platform.shortName} plan
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {product.includedInEvery.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-emerald-700"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        {/* Tiers */}
        <ul
          className={cn(
            "mt-6 grid gap-5",
            cols === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-4",
          )}
        >
          {product.tiers.map((tier, i) => (
            <li key={tier.id} className="h-full">
              <Reveal delay={Math.min(i * 0.08, 0.24)} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-card border bg-surface p-6 transition-all duration-600 ease-(--ease-1)",
                    tier.highlighted
                      ? "shadow-(--shadow-lift)"
                      : "border-line shadow-(--shadow-hairline) hover:shadow-(--shadow-soft)",
                  )}
                  style={
                    tier.highlighted
                      ? { borderColor: `${platform.color}66`, boxShadow: undefined }
                      : undefined
                  }
                >
                  {tier.highlighted ? (
                    <span
                      className="absolute -top-3 left-6 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white"
                      style={{ backgroundColor: platform.colorDeep }}
                    >
                      Most popular
                    </span>
                  ) : null}

                  <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray">{tier.description}</p>

                  <TierPrice tier={tier} />

                  {tier.limits.length ? (
                    <dl className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm">
                      {tier.limits.map((limit) => (
                        <div
                          key={limit.label}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <dt className="text-gray">{limit.label}</dt>
                          <dd className="font-medium text-ink">{limit.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <div className="mt-7 flex-1" />
                  <Button
                    asChild
                    size="lg"
                    variant={tier.highlighted ? "filled" : "outlined"}
                    className={cn("w-full", !tier.highlighted && "border border-line")}
                    style={
                      tier.highlighted
                        ? {
                            backgroundImage: `linear-gradient(100deg, color-mix(in oklab, ${platform.colorDeep}, black 22%), ${platform.colorDeep})`,
                            boxShadow: `0 14px 34px -12px ${platform.colorDeep}80, inset 0 1px 1px rgb(255 255 255 / 0.25)`,
                            border: "0",
                          }
                        : undefined
                    }
                  >
                    {tier.ctaHref.startsWith("http") ? (
                      <a href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
                        {tier.ctaLabel}
                        <ArrowUpRight strokeWidth={2} />
                      </a>
                    ) : (
                      <Link href={tier.ctaHref as Route}>{tier.ctaLabel}</Link>
                    )}
                  </Button>
                  {tier.trialDays && !tier.free ? (
                    <p className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.1em] text-gray">
                      {tier.trialDays}-day trial · no card
                    </p>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {product.note ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray">{product.note}</p>
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
