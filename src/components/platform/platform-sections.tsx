import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Platform } from "@/content/products";
import { PLATFORM_MAP } from "@/content/products";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { CountUp, Reveal } from "@/components/motion";
import { Stars } from "@/components/sections/testimonials";

export function PlatformStats({ platform }: { platform: Platform }) {
  return (
    <section
      aria-label={`${platform.shortName} in numbers`}
      className="relative overflow-hidden bg-navy-950"
    >
      {/* Per-product accent lives in the wash, not under the text — white on a
          bright accent (emerald/sky/amber) would fail contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(48rem 26rem at 8% 0%, ${platform.color}2e, transparent 62%), radial-gradient(52rem 30rem at 92% 100%, ${platform.colorSecondary}33, transparent 64%)`,
        }}
      />
      <Container className="relative">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {platform.stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="relative flex flex-col items-center gap-2 px-4 py-10 text-center lg:py-14"
            >
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent lg:block"
                />
              ) : null}
              <dt className="order-2 max-w-52 font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.14em] text-white/70">
                {stat.label}
              </dt>
              <dd className="order-1 font-mono text-[clamp(1.9rem,3vw,2.7rem)] font-semibold tracking-tight text-white">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function PlatformFeatures({ platform }: { platform: Platform }) {
  return (
    <Section tone="tint" ghost={platform.index}>
      <Container>
        <SectionHeading
          badge="Capabilities"
          title={`Everything ${platform.shortName} Does for You`}
          subtitle={platform.longDescription}
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {platform.features.map((feature, i) => (
            <li key={feature.title} className="h-full">
              <Reveal delay={(i % 3) * 0.09} className="h-full">
                <div className="group flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-soft">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl transition-transform duration-500 ease-(--ease-soft-spring) group-hover:scale-110"
                    style={{
                      backgroundColor: `${platform.color}14`,
                      color: platform.colorDeep,
                    }}
                  >
                    <feature.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{feature.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function PlatformSteps({ platform }: { platform: Platform }) {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading badge="How It Works" title="Up and Running in Three Steps" />
        <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-px lg:block"
            style={{
              background: `linear-gradient(90deg, ${platform.colorSecondary}40, ${platform.color}40)`,
            }}
          />
          {platform.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 0.12} className="flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full text-white [box-shadow:var(--shadow-lift),inset_0_1px_1px_rgb(255_255_255/0.3)]"
                  style={{
                    // colorDeep-based so the white numeral clears 4.5:1 on every product.
                    backgroundImage: `linear-gradient(135deg, color-mix(in oklab, ${platform.colorDeep}, black 22%), ${platform.colorDeep})`,
                  }}
                >
                  <span className="font-mono text-xl font-semibold">0{i + 1}</span>
                </span>
                <h3 className="mt-6 text-display-sm text-ink">{step.title}</h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-body">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function PlatformTestimonial({ platform }: { platform: Platform }) {
  return (
    <Section tone="tint" compact>
      <Container className="max-w-3xl">
        <Reveal>
          <figure className="flex flex-col items-center rounded-(--radius-shell) border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
            <Stars />
            <blockquote className="mt-6 text-display-sm font-normal leading-relaxed text-ink">
              &ldquo;{platform.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full font-mono text-sm font-semibold text-white"
                style={{ backgroundColor: platform.color }}
              >
                {platform.testimonial.initials}
              </span>
              <span className="text-left">
                <span className="block text-sm font-semibold text-ink">
                  {platform.testimonial.name}
                </span>
                <span className="block text-[0.8125rem] text-muted">
                  {platform.testimonial.role} · {platform.testimonial.company}
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
          badge="One Fabric"
          title="Works Better Together"
          subtitle="Every FlowZa platform shares the same operating fabric — customers, inventory and ledger data flow between systems without manual re-entry."
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {related.map((r, i) => (
            <li key={r.slug} className="h-full">
              <Reveal delay={i * 0.09} className="h-full">
                <Link
                  href={`/products/${r.slug}`}
                  className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-(--radius-shell) border border-line bg-navy-950 shadow-soft transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-lift"
                >
                  <Image
                    src={r.image}
                    alt={r.imageAlt}
                    fill
                    sizes="(max-width: 768px) 92vw, 30vw"
                    className="object-cover object-left-top opacity-90 transition-transform duration-700 ease-(--ease-swift) group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"
                  />
                  <div className="relative p-5">
                    <h3 className="font-semibold text-white">{r.name}</h3>
                    <p className="mt-0.5 text-[0.8125rem] text-white/70">{r.tagline}</p>
                    <span className="mt-2.5 flex items-center gap-1 text-sm font-medium text-accent-300 opacity-0 transition-all duration-500 ease-(--ease-swift) group-hover:opacity-100 motion-safe:translate-y-1.5 motion-safe:group-hover:translate-y-0">
                      Explore platform
                      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
