import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import { PLATFORMS_SECTION } from "@/content/home";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento of the seven platforms — the flagship (Finance) takes a
 * double-width tile; the 8th slot is the "not sure where to start" CTA.
 */
export function PlatformsGrid() {
  return (
    <Section id="platforms" tone="tint" ghost="FABRIC">
      <Container>
        <SectionHeading
          badge={PLATFORMS_SECTION.badge}
          title={PLATFORMS_SECTION.title}
          subtitle={PLATFORMS_SECTION.subtitle}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p, i) => (
            <li key={p.slug} className={cn("h-full", p.slug === "finance" && "sm:col-span-2")}>
              <Reveal delay={(i % 3) * 0.09} className="h-full">
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-(--radius-shell) border border-line bg-navy-950 shadow-soft transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-lift"
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes={
                      p.slug === "finance"
                        ? "(max-width: 640px) 92vw, (max-width: 1024px) 92vw, 62vw"
                        : "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    }
                    className="object-cover object-left-top opacity-90 transition-transform duration-700 ease-(--ease-swift) group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/10"
                  />

                  {/* Index numeral */}
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-3 font-mono text-sm tracking-widest text-white/40"
                  >
                    {p.index}
                  </span>

                  {/* Icon chip + live badge */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span
                      className="flex size-9 items-center justify-center rounded-xl border border-white/20 backdrop-blur-md"
                      style={{ backgroundColor: `${p.color}33`, color: "#fff" }}
                    >
                      <p.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {p.live ? <Badge variant="live">Live</Badge> : null}
                  </div>

                  {/* Caption */}
                  <div className="relative p-5">
                    <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                    <p className="mt-0.5 text-sm text-white/70">{p.cardTagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.cardBadges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.7rem] text-white/75 backdrop-blur-sm"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <span className="mt-3 flex items-center gap-1 text-sm font-medium text-accent-300 opacity-0 transition-all duration-500 ease-(--ease-swift) group-hover:opacity-100 motion-safe:translate-y-1.5 motion-safe:group-hover:translate-y-0">
                      Explore platform
                      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}

          {/* CTA tile */}
          <li className="h-full">
            <Reveal delay={0.18} className="h-full">
              <Link
                href={PLATFORMS_SECTION.ctaTile.href}
                className="group flex h-72 flex-col items-center justify-center gap-3 rounded-(--radius-shell) border-2 border-dashed border-line-strong bg-surface p-6 text-center transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:border-brand-400 hover:shadow-soft"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-500 ease-(--ease-soft-spring) group-hover:scale-110">
                  <ArrowUpRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-lg font-semibold text-ink">
                  {PLATFORMS_SECTION.ctaTile.title}
                </span>
                <span className="max-w-56 text-sm text-body">
                  {PLATFORMS_SECTION.ctaTile.description}
                </span>
              </Link>
            </Reveal>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
