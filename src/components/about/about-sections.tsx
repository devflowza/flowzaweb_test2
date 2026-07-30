import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  CheckCircle2,
  ConciergeBell,
  DollarSign,
  Layers,
  LineChart,
  Package,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PLATFORM_NAV, type PlatformNav } from "@/content/platforms-nav";
import { ABOUT_HERO, ABOUT_MISSION, ABOUT_STATS, ABOUT_VALUES } from "@/content/about";
import { SITE } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * The three About sections, matched to the mockups in Photos/About Page:
 * hero (orbit panel + data-layer card + ecosystem strip + iconed stats),
 * mission (dark quote panel with vertical chips + floating badge), and values
 * (white cards over the forest backdrop). Each sits on its supplied background
 * photograph under a white wash heavy enough to keep text at AA contrast.
 */

function SectionBackdrop({ src, wash }: { src: string; wash: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className={cn("absolute inset-0", wash)} />
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Hero: copy + orbit panel + ecosystem strip + stats                        */
/* ------------------------------------------------------------------------- */

const ORBIT: ReadonlyArray<{ x: number; y: number }> = [
  { x: 50.0, y: 9.0 },
  { x: 76.0, y: 17.5 },
  { x: 90.5, y: 42.0 },
  { x: 85.5, y: 70.0 },
  { x: 64.0, y: 88.5 },
  { x: 36.0, y: 88.5 },
  { x: 14.5, y: 70.0 },
  { x: 9.5, y: 42.0 },
  { x: 24.0, y: 17.5 },
];

function OrbitNode({ platform, pos }: { platform: PlatformNav; pos: { x: number; y: number } }) {
  return (
    <Link
      href={`/products/${platform.slug}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <span className="relative flex w-[4.75rem] flex-col items-center gap-1 rounded-2xl bg-surface px-2 py-2.5 shadow-(--shadow-soft) transition-transform duration-500 ease-(--ease-btn) group-hover:-translate-y-0.5">
        <platform.icon
          className="size-5.5"
          strokeWidth={1.75}
          aria-hidden="true"
          style={{ color: platform.colorDeep }}
        />
        <span className="text-[0.66rem] font-semibold text-ink">{platform.shortName}</span>
        {platform.live ? (
          <span
            aria-hidden="true"
            className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent"
          />
        ) : null}
      </span>
      <span className="sr-only">{platform.live ? "— live today" : "— rolling out"}</span>
    </Link>
  );
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <SectionBackdrop
        src="/images/photos/about-hero-bg.webp"
        wash="bg-gradient-to-r from-white via-white/90 to-white/60"
      />
      <Container className="relative py-[clamp(2.5rem,5vw,5rem)]">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          {/* Copy + data-layer card */}
          <div>
            <Reveal>
              <Eyebrow>{ABOUT_HERO.badge}</Eyebrow>
              <h1 className="mt-5 text-h1 !leading-[1.12] text-ink sm:text-[2.6rem]">
                {ABOUT_HERO.title}
                <span className="block text-accent-deep">{ABOUT_HERO.titleHighlight}</span>
              </h1>
              <p className="mt-6 max-w-md text-lede text-gray">{ABOUT_HERO.subtitle}</p>
              <p className="mt-3 text-lede font-semibold text-ink">{ABOUT_HERO.subtitleBold}</p>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-9 max-w-md rounded-card border border-brand-100 bg-accent-mint/70 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-accent text-white shadow-(--shadow-soft)">
                    <Layers className="size-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[1.0625rem] font-semibold">
                      <span className="text-accent-deep">{ABOUT_HERO.dataLayerCard.lead} </span>
                      <span className="text-ink">{ABOUT_HERO.dataLayerCard.tail}</span>
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray">
                      {ABOUT_HERO.dataLayerCard.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Orbit panel */}
          <Reveal delay={0.1}>
            <div className="rounded-card bg-surface/95 p-4 shadow-(--shadow-soft) backdrop-blur-sm">
              <div className="relative mx-auto aspect-[16/10] sm:aspect-[16/9]">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="27"
                    ry="30"
                    fill="none"
                    stroke="var(--color-line)"
                    strokeWidth="0.18"
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="16"
                    ry="18"
                    fill="none"
                    stroke="var(--color-line)"
                    strokeWidth="0.18"
                  />
                  {ORBIT.map((pos, i) => (
                    <g key={i}>
                      <line
                        x1="50"
                        y1="50"
                        x2={pos.x}
                        y2={pos.y}
                        stroke="var(--color-accent)"
                        strokeOpacity="0.45"
                        strokeWidth="0.22"
                        strokeDasharray="0.9 1.6"
                      />
                      <circle cx={pos.x} cy={pos.y} r="0.55" fill="var(--color-accent)" />
                    </g>
                  ))}
                </svg>

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center gap-2.5">
                    <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-accent text-white shadow-(--shadow-chip) ring-8 ring-accent/10 sm:size-20">
                      <Layers className="size-7 sm:size-8" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                      One Data Layer
                    </span>
                  </div>
                </div>

                {PLATFORM_NAV.map((platform, i) => (
                  <OrbitNode key={platform.slug} platform={platform} pos={ORBIT[i] ?? ORBIT[0]!} />
                ))}
              </div>
            </div>

            {/* Ecosystem strip */}
            <div className="mt-4 flex items-start gap-3.5 rounded-card bg-surface/95 px-6 py-4.5 shadow-(--shadow-subtle) backdrop-blur-sm">
              <CheckCircle2
                className="mt-0.5 size-5.5 shrink-0 text-accent-deep"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-gray">
                {ABOUT_HERO.ecosystemStrip}{" "}
                <span className="font-semibold text-ink">
                  Green dot means <span className="text-accent-deep">live</span> today.
                </span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal delay={0.18}>
          <dl className="mt-10 grid grid-cols-2 overflow-hidden rounded-card bg-surface/95 shadow-(--shadow-soft) backdrop-blur-sm lg:grid-cols-4">
            {ABOUT_STATS.map((stat, i) => (
              <div key={stat.label} className="relative flex items-center gap-4 px-7 py-6">
                {i > 0 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-line lg:block"
                  />
                ) : null}
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-mint text-accent-deep">
                  <stat.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <dd
                    className={cn(
                      "order-1 text-[1.6rem] font-semibold leading-tight tracking-tight",
                      stat.tone === "green" ? "text-accent-deep" : "text-ink",
                    )}
                  >
                    {stat.value}
                  </dd>
                  <dt className="order-2 mt-0.5 text-[0.66rem] uppercase tracking-[0.14em] text-gray">
                    {stat.label}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/* Mission                                                                   */
/* ------------------------------------------------------------------------- */

const CHIP_ICONS: Record<string, LucideIcon> = {
  Finance: DollarSign,
  Logistics: Truck,
  Inventory: Package,
  Fleet: Car,
  Retail: ShoppingCart,
  Hospitality: ConciergeBell,
  Services: Wrench,
  POS: Receipt,
  Analytics: LineChart,
};

export function MissionSection() {
  return (
    <section className="relative overflow-hidden">
      <SectionBackdrop
        src="/images/photos/about-mission-bg.webp"
        wash="bg-gradient-to-r from-white via-white/85 to-white/55"
      />
      <Container className="relative py-[clamp(2.5rem,5vw,5.5rem)]">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>{ABOUT_MISSION.badge}</Eyebrow>
              <h2 className="mt-4 text-h2 text-ink">
                AI that works the way <span className="text-accent-deep">your business</span> does
              </h2>
              <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-accent" />
            </Reveal>
            {ABOUT_MISSION.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 + i * 0.08}>
                <p className="mt-5 max-w-xl text-lede text-gray">
                  {i === ABOUT_MISSION.paragraphs.length - 1 ? (
                    <>
                      <span className="font-semibold text-ink">Nine purpose-built platforms.</span>{" "}
                      {p.replace("Nine purpose-built platforms. ", "")}
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <ul className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-line rounded-card bg-surface/95 p-2 shadow-(--shadow-subtle) backdrop-blur-sm">
                {ABOUT_MISSION.miniFeatures.map((f) => (
                  <li key={f.title} className="flex flex-col gap-2.5 px-4 py-3.5">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-accent-mint text-accent-deep">
                      <f.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink">{f.title}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Dark quote panel */}
          <Reveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-[#06231b] to-[#0b3a2c] p-8 pb-10 shadow-(--shadow-mega) sm:p-10">
              {/* dotted wave texture */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-16 h-40 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(rgb(64 182 87 / 0.55) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                  maskImage: "linear-gradient(160deg, transparent 30%, black 60%, transparent 95%)",
                  WebkitMaskImage:
                    "linear-gradient(160deg, transparent 30%, black 60%, transparent 95%)",
                }}
              />
              <span aria-hidden="true" className="text-5xl font-bold leading-none text-accent">
                &ldquo;
              </span>
              <p className="relative mt-3 max-w-sm text-[1.75rem] font-medium leading-snug text-white">
                &lsquo;{SITE.positioning}&rdquo;
              </p>
              <ul className="relative mt-24 flex max-w-xl flex-wrap gap-2.5">
                {ABOUT_MISSION.verticalChips.map((chip) => {
                  const ChipIcon = CHIP_ICONS[chip];
                  return (
                    <li
                      key={chip}
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-white/90"
                    >
                      {ChipIcon ? (
                        <ChipIcon
                          className="size-3.5 text-accent"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      ) : null}
                      {chip}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-2 flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 shadow-(--shadow-lift) sm:-left-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-white">
                <CheckCircle2 className="size-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">
                  {ABOUT_MISSION.floatingBadge.title}
                </span>
                <span className="block text-[0.8125rem] text-gray">
                  {ABOUT_MISSION.floatingBadge.subtitle}
                </span>
              </span>
              <TrendingUp className="ml-1 size-5 text-accent" strokeWidth={2} aria-hidden="true" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------------- */
/* Values                                                                    */
/* ------------------------------------------------------------------------- */

export function ValuesSection() {
  return (
    <section className="relative overflow-hidden">
      <SectionBackdrop
        src="/images/photos/about-values-bg.webp"
        wash="bg-gradient-to-b from-white via-white/85 to-white/60"
      />
      <Container className="relative py-[clamp(2.5rem,5vw,5.5rem)]">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
            <div>
              <Eyebrow>Our Values</Eyebrow>
              <h2 className="mt-4 text-h2 text-ink">
                What We <span className="text-accent-deep">Stand For</span>
              </h2>
              <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-accent" />
            </div>
            <p className="max-w-md text-lede text-gray lg:justify-self-end lg:border-l lg:border-line-soft lg:pl-10">
              Six principles that shape every product decision, support conversation and line of
              code.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_VALUES.map((value, i) => (
            <li key={value.title} className="h-full">
              <Reveal delay={(i % 3) * 0.09} className="h-full">
                <div className="flex h-full flex-col rounded-card bg-surface p-7 shadow-(--shadow-soft) transition-all duration-600 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-lift)">
                  <span className="flex size-14 items-center justify-center rounded-full bg-accent-mint text-accent-deep">
                    <value.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold text-ink">{value.title}</h3>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-0.5 w-8 rounded-full bg-accent"
                  />
                  <p className="mt-3 text-sm leading-relaxed text-gray">{value.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
