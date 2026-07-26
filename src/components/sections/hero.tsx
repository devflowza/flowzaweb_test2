import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { HERO } from "@/content/home";
import { CONTACT } from "@/content/site";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      {/* Backdrop: blueprint grid + cyan/blue aurora */}
      <div aria-hidden="true" className="fx-grid absolute inset-0" />
      <div aria-hidden="true" className="fx-aurora absolute inset-0" />

      <Container className="relative grid items-center gap-14 pb-(--spacing-section) pt-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy column */}
        <div className="max-w-2xl">
          <Reveal immediate>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-1.5 pl-2.5 pr-4 text-[0.8125rem] font-medium text-body shadow-hairline backdrop-blur-sm">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-500" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {HERO.badge}
            </p>
          </Reveal>

          <Reveal delay={0.08} immediate>
            <h1 className="mt-6 text-display-2xl text-ink">
              {HERO.headline[0]}
              <br />
              <span className="fx-gradient-text">{HERO.headline[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16} immediate>
            <p className="mt-5 border-l-2 border-brand-600 pl-4 font-mono text-[0.8125rem] uppercase tracking-[0.14em] text-brand-700">
              {HERO.verticals}
            </p>
          </Reveal>

          <Reveal delay={0.22} immediate>
            <p className="mt-6 max-w-xl text-lede text-body">{HERO.subhead}</p>
          </Reveal>

          <Reveal delay={0.3} immediate>
            <ul className="mt-6 flex flex-wrap gap-2">
              {HERO.pills.map((pill) => (
                <li
                  key={pill}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[0.8125rem] font-medium text-body shadow-hairline backdrop-blur-sm"
                >
                  <Check className="size-3.5 text-emerald-600" strokeWidth={2} aria-hidden="true" />
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.38} immediate>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="whatsapp" size="xl">
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4.5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="xl">
                <Link href="/get-started">
                  Start Free Trial
                  <ButtonIcon>
                    <ArrowRight strokeWidth={2} />
                  </ButtonIcon>
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#platforms">Explore Platforms</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.46} immediate>
            <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-muted">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                Trusted across industries:
              </span>
              <ul className="flex flex-wrap gap-2">
                {HERO.industries.map((industry) => (
                  <li
                    key={industry}
                    className="rounded-full bg-slate-900/5 px-3 py-1 font-medium text-body"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Visual column */}
        <Reveal
          delay={0.25}
          y={36}
          immediate
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="relative">
            {/* Double-bezel screenshot card */}
            <div className="bezel shadow-mega">
              <div className="relative overflow-hidden rounded-[calc(var(--radius-shell)-0.375rem)] border border-line bg-white">
                <Image
                  src={HERO.screenshot.src}
                  alt={HERO.screenshot.alt}
                  width={1510}
                  height={1013}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 36rem, 44vw"
                  className="h-auto w-full object-cover"
                />
                {/* Live badge */}
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy-950/85 py-1.5 pl-2.5 pr-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-400" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {HERO.screenshot.badge}
                </span>
                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/55 to-transparent px-5 pb-4 pt-14">
                  <p className="text-sm font-semibold text-white">{HERO.screenshot.caption}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-white/70">
                    {HERO.screenshot.subcaption}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat chips */}
            <div className="absolute -right-3 -top-5 rounded-2xl border border-line bg-white/92 px-4 py-3 shadow-lift backdrop-blur-sm sm:-right-5">
              <p className="font-mono text-xl font-semibold tracking-tight text-ink">
                {HERO.floatingStats[0].value}
              </p>
              <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                {HERO.floatingStats[0].label}
              </p>
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-line bg-white/92 px-4 py-3 shadow-lift backdrop-blur-sm sm:-left-5">
              <p className="font-mono text-xl font-semibold tracking-tight text-emerald-600">
                {HERO.floatingStats[1].value}
              </p>
              <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                {HERO.floatingStats[1].label}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
