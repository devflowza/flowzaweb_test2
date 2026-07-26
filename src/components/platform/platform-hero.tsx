import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Platform } from "@/content/products";
import { CONTACT } from "@/content/site";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

export function PlatformHero({ platform }: { platform: Platform }) {
  const firstStat = platform.stats[0];
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="fx-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(42rem 24rem at 85% 0%, ${platform.color}14, transparent 62%), radial-gradient(36rem 22rem at 8% 12%, ${platform.colorSecondary}10, transparent 60%)`,
        }}
      />

      <Container className="relative grid items-center gap-14 pb-(--spacing-section) pt-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-2xl">
          <Reveal immediate>
            <Breadcrumbs
              items={[{ label: "Platforms", href: "/products" }, { label: platform.shortName }]}
            />
          </Reveal>

          <Reveal delay={0.06} immediate>
            <p
              className="mt-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium shadow-hairline"
              style={{
                borderColor: `${platform.color}45`,
                backgroundColor: `${platform.color}0d`,
                color: platform.colorDeep,
              }}
            >
              <platform.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
              {platform.tagline}
              {platform.live ? <Badge variant="live">Live</Badge> : null}
            </p>
          </Reveal>

          <Reveal delay={0.12} immediate>
            <h1 className="mt-5 text-display-xl text-ink">{platform.name}</h1>
          </Reveal>

          <Reveal delay={0.18} immediate>
            <p className="mt-5 max-w-xl text-lede text-body">{platform.description}</p>
          </Reveal>

          <Reveal delay={0.24} immediate>
            <ul className="mt-6 flex flex-wrap gap-2">
              {platform.badges.map((badge) => (
                <li
                  key={badge}
                  className="flex items-center gap-2 rounded-full border border-line bg-white/75 px-3.5 py-1.5 text-[0.8125rem] font-medium text-body shadow-hairline backdrop-blur-sm"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: platform.color }}
                  />
                  {badge}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.32} immediate>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="xl"
                className="border-0"
                style={{
                  // colorDeep so the white label clears 4.5:1 on light accents too.
                  backgroundImage: `linear-gradient(100deg, color-mix(in oklab, ${platform.colorDeep}, black 22%), ${platform.colorDeep})`,
                  boxShadow: `0 14px 34px -12px ${platform.colorDeep}80, inset 0 1px 1px rgb(255 255 255 / 0.25)`,
                }}
              >
                <a href={platform.appUrl} target="_blank" rel="noopener noreferrer">
                  Launch {platform.shortName}
                  <ButtonIcon>
                    <ArrowUpRight strokeWidth={2} />
                  </ButtonIcon>
                </a>
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4.5" />
                  Ask on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link href={`/contact?service=${encodeURIComponent(platform.name)}`}>
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.22}
          y={36}
          immediate
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="bezel shadow-mega">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-shell)-0.375rem)] border border-line bg-navy-950">
              <Image
                src={platform.image}
                alt={platform.imageAlt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 36rem, 44vw"
                className="object-cover object-left-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent px-5 pb-4 pt-16"
              />
              <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                <p className="text-sm font-semibold text-white">{platform.name}</p>
                <p className="mt-0.5 text-[0.8125rem] text-white/70">{platform.tagline}</p>
              </div>
            </div>
          </div>
          {firstStat ? (
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-lift backdrop-blur-sm sm:-right-5">
              <p
                className="font-mono text-xl font-semibold tracking-tight"
                style={{ color: platform.colorDeep }}
              >
                {firstStat.value}
              </p>
              <p className="mt-0.5 max-w-40 font-mono text-[0.6rem] uppercase leading-snug tracking-[0.1em] text-muted">
                {firstStat.label}
              </p>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
