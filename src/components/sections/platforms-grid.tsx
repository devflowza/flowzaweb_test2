import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLATFORMS } from "@/content/products";
import { PLATFORMS_SECTION } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ImageFrame } from "@/components/ui/image-frame";
import { TextButton } from "@/components/ui/button";
import { Reveal } from "@/components/motion";

/**
 * The reference's signature card: the image *is* the card, with a frosted arrow
 * chip over it and the title plus a hover-revealed "Explore" beneath. Laid out
 * as a flex-wrap grid with 1.2% gutters.
 */
export function PlatformsGrid() {
  return (
    <Section id="platforms" tone="white">
      <Container>
        <SectionHeading
          eyebrow={PLATFORMS_SECTION.badge}
          title={PLATFORMS_SECTION.title}
          subtitle={PLATFORMS_SECTION.subtitle}
        />
        <ul className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
          {PLATFORMS.map((p, i) => (
            <li key={p.slug} className="w-full sm:w-[49.4%] lg:w-[32.53%]">
              <Reveal delay={(i % 3) * 0.09}>
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="relative">
                    <ImageFrame
                      image={p.image}
                      ratio="1/1"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 47vw, 31vw"
                      className="transition-shadow duration-300 ease-(--ease-1) group-hover:shadow-(--shadow-lift)"
                    />
                    {/* Green-cast scrim, deepening on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-card bg-gradient-to-t from-[#052005] via-transparent to-transparent opacity-30 transition-opacity duration-300 ease-(--ease-1) group-hover:opacity-70"
                    />
                    {/* Top scrim keeps the Live pill and index legible over any photo */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-card bg-gradient-to-b from-[#04180a]/55 to-transparent"
                    />
                    {/* Frosted arrow chip */}
                    <span
                      aria-hidden="true"
                      className="fx-arrow-chip absolute bottom-4 right-4 group-hover:scale-[1.3] group-hover:bg-accent-deep group-hover:before:opacity-0"
                    >
                      <ArrowRight className="relative size-5" strokeWidth={1.75} />
                    </span>
                    {p.live ? (
                      <span className="absolute left-4 top-4 rounded-pill bg-accent-deep px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[1px] text-white">
                        Live
                      </span>
                    ) : null}
                    {/* Its own frosted chip: the scrim alone cannot carry the
                        numeral over a blown-out sky or a white wall. */}
                    <span
                      aria-hidden="true"
                      className="fx-frost absolute right-4 top-4 rounded-pill px-2.5 py-0.5 text-caption text-white"
                    >
                      {p.index}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-h4 text-ink transition-colors duration-300 group-hover:text-accent-deep">
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-body text-gray">{p.cardTagline}</p>
                    <TextButton className="mt-3 opacity-0 transition-opacity duration-300 ease-(--ease-1) group-hover:opacity-100">
                      Explore
                      <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
                    </TextButton>
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
