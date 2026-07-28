import { WHY_FLOWZA } from "@/content/home";
import { COMPANY_STATS, SITE } from "@/content/site";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp, Reveal } from "@/components/motion";

export function WhyFlowza() {
  return (
    <>
      <Section id="why-flowza" tone="white">
        <Container>
          <SectionHeading
            eyebrow={WHY_FLOWZA.badge}
            title={WHY_FLOWZA.title}
            subtitle={SITE.manifesto}
          />
          <ul className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
            {WHY_FLOWZA.cards.map((card, i) => (
              <li key={card.title} className="w-full sm:w-[49.4%] lg:w-[24.1%]">
                <Reveal delay={(i % 4) * 0.08} className="h-full">
                  <div className="flex h-full flex-col">
                    <span className="grid size-14 place-items-center rounded-chip border border-line bg-surface text-accent-deep shadow-(--shadow-subtle)">
                      <card.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-h5 text-ink">{card.title}</h3>
                    <p className="mt-3 text-body font-light leading-relaxed text-gray">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Solid accent band — the reference punctuates with full-bleed colour */}
      <Section tone="accent" flush ghost="IMPACT">
        <Container>
          <dl className="flex flex-wrap py-16 lg:py-20">
            {COMPANY_STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="relative w-1/2 px-4 py-6 text-center lg:w-1/4"
              >
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/25 lg:block"
                  />
                ) : null}
                <dt className="order-2 mt-2 text-caption font-light uppercase tracking-[2px] text-white/85">
                  {stat.label}
                </dt>
                <dd className="order-1 text-h1 font-medium tracking-[-0.03em] text-white">
                  <CountUp value={stat.value} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
