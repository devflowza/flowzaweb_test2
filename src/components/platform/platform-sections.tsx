import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Platform } from "@/content/products";
import { PLATFORM_MAP } from "@/content/products";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { TextButton } from "@/components/ui/button";
import { CountUp, Reveal } from "@/components/motion";
import { Stars } from "@/components/sections/testimonials";

/** Solid accent band of headline numbers — the reference's `highlights` strip. */
export function PlatformStats({ platform }: { platform: Platform }) {
  return (
    <Section tone="accent" flush aria-label={`${platform.shortName} in numbers`}>
      <Container>
        <dl className="flex flex-wrap py-14 lg:py-16">
          {platform.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="relative w-1/2 px-4 py-5 text-center lg:w-1/4"
            >
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/25 lg:block"
                />
              ) : null}
              <dt className="order-2 mx-auto mt-2 max-w-[14rem] text-caption font-light uppercase leading-relaxed tracking-[2px] text-white/85">
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
  );
}

export function PlatformFeatures({ platform }: { platform: Platform }) {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title={`Everything ${platform.shortName} Does for You`}
          subtitle={platform.longDescription}
        />
        <ul className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
          {platform.features.map((feature, i) => (
            <li key={feature.title} className="w-full sm:w-[49.4%] lg:w-[32.53%]">
              <Reveal delay={(i % 3) * 0.09} className="h-full">
                <div className="flex h-full flex-col">
                  <span className="grid size-14 place-items-center rounded-chip border border-line bg-surface text-accent-deep shadow-(--shadow-subtle)">
                    <feature.icon className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-h5 text-ink">{feature.title}</h3>
                  <p className="mt-3 text-body font-light leading-relaxed text-gray">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

const STEP_COUNT_WORD: Record<number, string> = { 2: "Two", 3: "Three", 4: "Four", 5: "Five" };

export function PlatformSteps({ platform }: { platform: Platform }) {
  return (
    <Section tone="tint">
      <Container>
        {/* Derived, not hardcoded: PMS runs a four-step loop, the rest are three. */}
        <SectionHeading
          eyebrow="How It Works"
          title={`Up and Running in ${STEP_COUNT_WORD[platform.steps.length] ?? platform.steps.length} Steps`}
        />
        <ol className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
          {platform.steps.map((step, i) => (
            <li key={step.title} className="w-full lg:w-[32.53%]">
              <Reveal delay={i * 0.1}>
                <div className="flex flex-col gap-5">
                  <span className="grid size-[50px] shrink-0 place-items-center rounded-chip border border-line bg-surface text-h4 font-medium text-accent-deep shadow-(--shadow-chip)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h4 text-ink">{step.title}</h3>
                    <p className="mt-3 text-body font-light leading-relaxed text-gray">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function PlatformTestimonial({ platform }: { platform: Platform }) {
  const t = platform.testimonial;
  if (!t) return null;
  return (
    <Section tone="white" compact>
      <Container>
        <Reveal>
          <figure className="mx-auto flex max-w-4xl flex-col items-center rounded-card bg-surface-mint p-10 text-center sm:p-14">
            <Stars />
            <blockquote className="mt-7 text-h3 font-normal leading-relaxed text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-9 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="grid size-12 place-items-center rounded-pill bg-accent-deep text-body font-medium text-white"
              >
                {t.initials}
              </span>
              <span className="text-left">
                <span className="block text-body font-medium text-ink">{t.name}</span>
                <span className="block text-caption font-light text-gray">
                  {t.role} · {t.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}

export function PlatformRelated({ platform }: { platform: Platform }) {
  const related = platform.related.map((slug) => PLATFORM_MAP[slug]);
  return (
    <Section tone="white">
      <Container>
        <SectionHeading
          eyebrow="One Fabric"
          title="Works Better Together"
          subtitle="Every FlowZa platform shares the same operating fabric — customers, inventory and ledger data flow between systems without manual re-entry."
        />
        <ul className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
          {related.map((r, i) => (
            <li key={r.slug} className="w-full lg:w-[32.53%]">
              <Reveal delay={i * 0.09}>
                <Link href={`/products/${r.slug}`} className="group block">
                  <div className="relative">
                    <ImageFrame
                      image={r.image}
                      ratio="4/3"
                      sizes="(max-width: 1024px) 92vw, 31vw"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-[#052005] via-transparent to-transparent opacity-25 transition-opacity duration-300 group-hover:opacity-60"
                    />
                    <span
                      aria-hidden="true"
                      className="fx-arrow-chip absolute bottom-4 right-4 group-hover:scale-[1.3] group-hover:bg-accent-deep group-hover:before:opacity-0"
                    >
                      <ArrowRight className="relative size-5" strokeWidth={1.75} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-h5 text-ink transition-colors duration-300 group-hover:text-accent-deep">
                    {r.name}
                  </h3>
                  <p className="mt-1.5 text-body font-light text-gray">{r.cardTagline}</p>
                  <TextButton className="mt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore
                    <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
                  </TextButton>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
