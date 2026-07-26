import { WHY_FLOWZA } from "@/content/home";
import { COMPANY_STATS, SITE } from "@/content/site";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp, Reveal } from "@/components/motion";

export function WhyFlowza() {
  return (
    <Section id="why-flowza" tone="white" className="pb-0">
      <Container>
        <SectionHeading
          badge={WHY_FLOWZA.badge}
          title={WHY_FLOWZA.title}
          subtitle={SITE.manifesto}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_FLOWZA.cards.map((card, i) => (
            <li key={card.title}>
              <Reveal delay={i * 0.09} className="h-full">
                <div className="group flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:scale-110">
                    <card.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{card.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      {/* Stats band */}
      <div className="fx-aurora-dark mt-(--spacing-section-sm) bg-navy-950">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {COMPANY_STATS.map((stat, i) => (
              // Reveal renders the single div that groups each dt/dd pair, and the
              // label precedes its value in the DOM — order-* only flips it visually.
              <Reveal
                key={stat.label}
                delay={i * 0.08}
                className="relative flex flex-col items-center gap-2 px-4 py-12 text-center lg:py-16"
              >
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent lg:block"
                  />
                ) : null}
                <dt className="order-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/70">
                  {stat.label}
                </dt>
                <dd className="order-1 font-mono text-[clamp(2rem,3.2vw,2.9rem)] font-semibold tracking-tight text-white">
                  <CountUp value={stat.value} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </div>
    </Section>
  );
}
