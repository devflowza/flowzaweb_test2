import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FINANCE_SPOTLIGHT } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

export function FinanceSpotlight() {
  return (
    <Section tone="tint" ghost="LIVE">
      <Container>
        <SectionHeading
          badge={FINANCE_SPOTLIGHT.badge}
          title={FINANCE_SPOTLIGHT.title}
          subtitle={FINANCE_SPOTLIGHT.subtitle}
        />
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Screenshot with floating KPI chips */}
          <Reveal className="relative">
            <div className="bezel shadow-mega">
              <div className="overflow-hidden rounded-[calc(var(--radius-shell)-0.375rem)] border border-line bg-white">
                <Image
                  src={FINANCE_SPOTLIGHT.screenshot.src}
                  alt={FINANCE_SPOTLIGHT.screenshot.alt}
                  width={1510}
                  height={1013}
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-2.5 sm:gap-3">
              {FINANCE_SPOTLIGHT.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-2xl border border-line bg-white/95 px-3.5 py-2.5 text-center shadow-lift backdrop-blur-sm sm:px-5 sm:py-3"
                >
                  <p className="font-mono text-base font-semibold tracking-tight text-emerald-700 sm:text-lg">
                    {kpi.value}
                  </p>
                  <p className="mt-0.5 whitespace-nowrap font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted sm:text-[0.62rem]">
                    {kpi.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Capabilities */}
          <div className="flex flex-col gap-4">
            {FINANCE_SPOTLIGHT.capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.1}>
                <div className="group flex items-start gap-4 rounded-(--radius-shell) border border-line bg-white p-5 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-0.5 hover:shadow-soft">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cap.color }}
                  />
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-ink">{cap.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{cap.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.32}>
              <Link
                href={FINANCE_SPOTLIGHT.cta.href}
                className="group mt-2 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-brand-700 transition-colors hover:text-brand-800"
              >
                {FINANCE_SPOTLIGHT.cta.label}
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
