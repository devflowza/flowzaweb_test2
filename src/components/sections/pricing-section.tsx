import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { FINANCE_PRICING_TEASER, FINANCE_TIERS, formatPrice } from "@/content/pricing";
import { PLATFORM_NAV_MAP } from "@/content/platforms-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * Finance-only pricing teaser for the homepage and the Finance product page.
 *
 * Since /pricing became a nine-product page, this is deliberately just the
 * flagship's three paid tiers at monthly rates with a route through to the full
 * list — no billing toggle, so the section needs no client JS and there is one
 * canonical place where every platform's price is stated.
 */
export function PricingSection() {
  const platform = PLATFORM_NAV_MAP.finance;
  const tiers = FINANCE_TIERS.filter((tier) => typeof tier.monthly === "number");

  return (
    <Section id="pricing" tone="white">
      <Container>
        <SectionHeading
          eyebrow={FINANCE_PRICING_TEASER.badge}
          title={FINANCE_PRICING_TEASER.title}
          subtitle={FINANCE_PRICING_TEASER.subtitle}
        />

        <ul className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <li key={tier.id} className="h-full">
              <Reveal delay={i * 0.1} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-card border bg-surface p-7 transition-all duration-600 ease-(--ease-1)",
                    tier.highlighted
                      ? "border-accent/40 shadow-(--shadow-lift) ring-4 ring-accent/10"
                      : "border-line shadow-(--shadow-hairline) hover:shadow-(--shadow-soft)",
                  )}
                >
                  {tier.highlighted ? (
                    <span className="bg-accent-deep absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white shadow-(--shadow-soft)">
                      Most Popular
                    </span>
                  ) : null}

                  <h3 className="text-lg font-semibold text-ink">{tier.name}</h3>
                  <p className="mt-3 text-sm text-gray">{tier.description}</p>

                  <p className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight text-ink">
                      ${formatPrice(tier.monthly as number)}
                    </span>
                    <span className="text-sm text-gray">/mo</span>
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] text-gray">
                    ${formatPrice(tier.yearly as number)} billed yearly
                  </p>

                  <dl className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6 text-sm">
                    {tier.limits.map((limit) => (
                      <div key={limit.label} className="flex items-baseline justify-between gap-3">
                        <dt className="text-gray">{limit.label}</dt>
                        <dd className="font-medium text-ink">{limit.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <Button
                    asChild
                    variant={tier.highlighted ? "filled" : "outlined"}
                    size="lg"
                    className={cn("mt-7 w-full", !tier.highlighted && "border border-line")}
                  >
                    <a href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
                      {tier.ctaLabel}
                      <ArrowUpRight strokeWidth={2} />
                    </a>
                  </Button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Every plan carries the same capabilities — capacity is the variable */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col justify-between gap-6 rounded-card bg-ink px-8 py-7 lg:flex-row lg:items-center">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                Every {platform.shortName} plan, fully featured
                <Badge variant="brand">No feature gates</Badge>
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {[
                  "Accounting & banking",
                  "Inventory",
                  "Payroll & HR",
                  "Projects",
                  "Multi-currency",
                  "40+ reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-white/75">
                    <Check
                      className="size-3.5 text-accent-lime"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild variant="white" size="lg" className="shrink-0">
              <Link href="/pricing">
                {FINANCE_PRICING_TEASER.ctaLabel}
                <ArrowRight strokeWidth={2} />
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
