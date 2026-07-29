"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  ENTERPRISE_PLUS,
  PRICING_COPY,
  PRICING_PLANS,
  YEARLY_DISCOUNT_PERCENT,
  formatPrice,
  yearlyMonthlyEquivalent,
  yearlyTotal,
} from "@/content/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function PricingSection({ standalone = false }: { standalone?: boolean }) {
  const [yearly, setYearly] = React.useState(false);

  return (
    <Section id="pricing" tone="white" ghost="PLANS">
      <Container>
        <SectionHeading
          eyebrow={PRICING_COPY.badge}
          title={PRICING_COPY.title}
          subtitle={PRICING_COPY.subtitle}
          as={standalone ? "h1" : "h2"}
        />

        {/* Plan banner — only on /pricing; the homepage section already sits
            below a hero and doesn't need a second piece of artwork. */}
        {standalone ? (
          <Reveal immediate delay={0.24} className="mb-14">
            <ImageFrame
              image={PRICING_COPY.image}
              ratio="16/7"
              priority
              sizes="(max-width: 1600px) 92vw, 1500px"
              rounded="rounded-card lg:rounded-[0_10vh_0_10vh]"
            />
          </Reveal>
        ) : null}

        {/* Billing toggle */}
        <Reveal className="mb-12 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="relative inline-flex items-center rounded-full border border-line bg-surface-tint p-1 shadow-(--shadow-hairline)"
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-400 ease-(--ease-1)",
                !yearly ? "bg-ink text-white shadow-(--shadow-soft)" : "text-gray hover:text-ink",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-400 ease-(--ease-1)",
                yearly ? "bg-ink text-white shadow-(--shadow-soft)" : "text-gray hover:text-ink",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5  text-[0.65rem] font-semibold",
                  yearly ? "bg-emerald-400/20 text-emerald-300" : "bg-emerald-100 text-emerald-700",
                )}
              >
                −{YEARLY_DISCOUNT_PERCENT}%
              </span>
            </button>
          </div>
        </Reveal>

        {/* Plan cards */}
        <ul className="grid gap-5 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => {
            const price = yearly ? yearlyMonthlyEquivalent(plan.monthlyPrice) : plan.monthlyPrice;
            return (
              <li key={plan.id} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-card border bg-surface p-7 transition-all duration-600 ease-(--ease-1)",
                      plan.highlighted
                        ? "border-accent/40 shadow-(--shadow-lift) ring-4 ring-accent/10"
                        : "border-line shadow-(--shadow-hairline) hover:shadow-(--shadow-soft)",
                    )}
                  >
                    {plan.highlighted ? (
                      <span className="bg-accent-deep absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white shadow-(--shadow-soft)">
                        Most Popular
                      </span>
                    ) : null}

                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-xl",
                          plan.highlighted
                            ? "bg-accent-deep text-white"
                            : "bg-accent-mint text-accent-deep",
                        )}
                      >
                        <plan.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                    </div>

                    <p className="mt-4 text-sm text-gray">{plan.description}</p>

                    <p className="mt-5 flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight text-ink">
                        ${formatPrice(price)}
                      </span>
                      <span className="text-sm text-gray">/mo</span>
                    </p>
                    <p className="mt-1.5 min-h-5 text-[0.8125rem] text-gray">
                      {yearly
                        ? `Billed yearly — $${formatPrice(yearlyTotal(plan.monthlyPrice))} per year`
                        : "Billed monthly"}
                    </p>

                    <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-gray">
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-emerald-700"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 grid grid-cols-2 gap-2.5">
                      <Button
                        asChild
                        variant={plan.highlighted ? "filled" : "outlined"}
                        size="lg"
                        className="w-full"
                      >
                        <a href={plan.trialUrl} target="_blank" rel="noopener noreferrer">
                          Start Trial
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant={plan.highlighted ? "secondary" : "outlined"}
                        size="lg"
                        className={cn("w-full", !plan.highlighted && "border border-line")}
                      >
                        <a href={plan.buyUrl} target="_blank" rel="noopener noreferrer">
                          Buy Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* Enterprise Plus */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-card bg-ink px-8 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-white sm:justify-start">
                {ENTERPRISE_PLUS.name}
                <Badge variant="brand">Custom</Badge>
              </h3>
              <p className="mt-1.5 text-sm text-white/70">{ENTERPRISE_PLUS.description}</p>
            </div>
            <Button asChild variant="white" size="lg">
              <Link href="/contact?service=Sales%20Inquiry">
                {ENTERPRISE_PLUS.ctaLabel}
                <ArrowRight strokeWidth={2} />
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-8 text-center text-sm text-gray">{PRICING_COPY.note}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
