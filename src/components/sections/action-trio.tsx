import Link from "next/link";
import type { Route } from "next";
import { ArrowUpRight } from "lucide-react";
import { ACTION_TRIO } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const TONES = {
  brand: "from-brand-600 to-brand-800",
  emerald: "from-emerald-500 to-emerald-700",
  violet: "from-violet-600 to-violet-800",
} as const;

export function ActionTrio() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          badge={ACTION_TRIO.badge}
          title={ACTION_TRIO.title}
          subtitle={ACTION_TRIO.subtitle}
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {ACTION_TRIO.cards.map((card, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm transition-transform duration-500 ease-(--ease-soft-spring) group-hover:scale-110">
                    <card.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-white/12 text-white/80 transition-all duration-500 ease-(--ease-soft-spring) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-white/25 group-hover:text-white">
                    <ArrowUpRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/80">
                  {card.description}
                </p>
                <span className="mt-6 inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/90">
                  {card.badge}
                </span>
              </>
            );
            const cardClasses = cn(
              "group flex h-full flex-col rounded-(--radius-shell) bg-gradient-to-br p-7",
              "[box-shadow:var(--shadow-soft),inset_0_1px_1px_rgb(255_255_255/0.25)]",
              "transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1.5 hover:shadow-lift",
              TONES[card.tone],
            );
            return (
              <li key={card.title} className="h-full">
                <Reveal delay={i * 0.1} className="h-full">
                  {card.external ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClasses}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={card.href as Route} className={cardClasses}>
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
