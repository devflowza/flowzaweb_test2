import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { ACTION_TRIO } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * Three routes into the product. Rendered as light mint cards with an accent
 * chip, matching the reference's "boxCard" treatment.
 */
export function ActionTrio() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow={ACTION_TRIO.badge}
          title={ACTION_TRIO.title}
          subtitle={ACTION_TRIO.subtitle}
        />
        <ul className="flex flex-wrap gap-y-8 sm:gap-x-[1.2%]">
          {ACTION_TRIO.cards.map((card, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-14 place-items-center rounded-chip bg-accent-deep text-white shadow-(--shadow-subtle)">
                    <card.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="grid size-10 place-items-center rounded-pill border border-line bg-surface text-accent-deep transition-all duration-300 ease-(--ease-1) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-accent-deep group-hover:text-white">
                    <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-h4 text-ink">{card.title}</h3>
                <p className="mt-3 flex-1 text-body font-light leading-relaxed text-gray">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex w-fit rounded-pill border border-brand-200 bg-surface px-4 py-1.5 text-caption font-light text-accent-deep">
                  {card.badge}
                </span>
              </>
            );
            const classes =
              "group flex h-full flex-col rounded-card border border-line bg-surface-mint p-8 transition-all duration-500 ease-(--ease-1) hover:border-accent hover:shadow-(--shadow-lift)";
            return (
              <li key={card.title} className="w-full lg:w-[32.53%]">
                <Reveal delay={i * 0.1} className="h-full">
                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(classes)}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={card.href as Route} className={cn(classes)}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
