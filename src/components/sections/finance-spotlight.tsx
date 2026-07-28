import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FINANCE_SPOTLIGHT } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { ImageFrame } from "@/components/ui/image-frame";
import { TextButton } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

/**
 * Media/content split in the reference's rhythm: image on one side inside a mint
 * card, content on the other, with a hairline rule separating the capability list.
 */
export function FinanceSpotlight() {
  return (
    <Section tone="white">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <Reveal className="w-full lg:w-[52%]">
            <div className="rounded-card bg-surface-mint p-4 sm:p-6">
              <ImageFrame
                image={FINANCE_SPOTLIGHT.image}
                ratio="16/10"
                sizes="(max-width: 1024px) 92vw, 50vw"
                className="shadow-(--shadow-soft)"
              />
              <ul className="mt-6 flex flex-wrap justify-between gap-4 px-2">
                {FINANCE_SPOTLIGHT.kpis.map((kpi) => (
                  <li key={kpi.label}>
                    <span className="block text-h3 font-medium tracking-[-0.02em] text-accent-deep">
                      {kpi.value}
                    </span>
                    <span className="mt-1 block text-caption font-light uppercase tracking-[2px] text-gray">
                      {kpi.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="w-full lg:w-[44%]">
            <Reveal>
              <Eyebrow>{FINANCE_SPOTLIGHT.badge}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-h2 text-ink">{FINANCE_SPOTLIGHT.title}</h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-lede text-gray">{FINANCE_SPOTLIGHT.subtitle}</p>
            </Reveal>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {FINANCE_SPOTLIGHT.capabilities.map((cap, i) => (
                <li key={cap.title}>
                  <Reveal delay={0.2 + i * 0.08}>
                    <div className="flex gap-4 py-5">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-2.5 shrink-0 rounded-full bg-accent"
                      />
                      <div>
                        <h3 className="text-h5 text-ink">{cap.title}</h3>
                        <p className="mt-1.5 text-body font-light leading-relaxed text-gray">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.44}>
              <Link href={FINANCE_SPOTLIGHT.cta.href} className="group mt-8 inline-flex">
                <TextButton>
                  {FINANCE_SPOTLIGHT.cta.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 ease-(--ease-1) group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </TextButton>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
