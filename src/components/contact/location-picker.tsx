import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Globe, MapPin } from "lucide-react";
import { OFFICES } from "@/content/locations";
import { Container, Section } from "@/components/layout/container";
import { ImageFrame } from "@/components/ui/image-frame";
import { Reveal } from "@/components/motion";

/**
 * "Where would you like to go?" — office picker matching the provided mockup:
 * photo cards with an accent top edge, a circular icon badge overlapping the
 * image, an accent-tinted "Explore location" button, and the dotted world map
 * (an existing asset, pins already in each office's accent) behind the heading.
 */
export function LocationPicker() {
  return (
    <Section tone="tint" compact className="relative overflow-hidden">
      {/* Dotted world map, upper right — decorative, fades out on small screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 hidden h-80 w-[58%] opacity-60 lg:block"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent)",
        }}
      >
        <Image
          src="/images/pages/locations.webp"
          alt=""
          fill
          sizes="60vw"
          className="object-cover object-right-top"
        />
      </div>

      <Container className="relative">
        <Reveal>
          <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-accent-deep">
            <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
            Choose Your Location
          </p>
          <h2 className="mt-4 max-w-md text-h2 text-ink">Where would you like to go?</h2>
          <p className="mt-4 max-w-md text-body text-gray">
            Select a location to explore offices, development centers, and other global
            destinations.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFICES.map((office, i) => {
            const BadgeIcon = office.label === "Other Locations" ? Globe : Building2;
            return (
              <li key={office.city} className="h-full">
                <Reveal delay={i * 0.09} className="h-full">
                  <div
                    className="flex h-full flex-col rounded-card border border-line bg-surface p-2.5 shadow-(--shadow-subtle) transition-all duration-500 ease-(--ease-1) hover:-translate-y-1 hover:shadow-(--shadow-soft)"
                    style={{ borderTopColor: office.accent, borderTopWidth: 3 }}
                  >
                    <div className="relative">
                      <ImageFrame
                        image={office.image}
                        ratio="16/8"
                        rounded="rounded-[calc(var(--radius-card)-0.625rem)]"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      />
                      <span
                        className="absolute -bottom-6 left-4 flex size-13 items-center justify-center rounded-full text-white ring-4 ring-surface"
                        style={{ backgroundColor: office.accent }}
                      >
                        <BadgeIcon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col px-3.5 pb-4 pt-9">
                      <span
                        className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: office.accent }}
                      >
                        {office.label}
                      </span>
                      <h3 className="mt-1.5 text-[1.1875rem] font-semibold text-ink">
                        {office.city}, {office.country}
                      </h3>
                      <p className="mt-2.5 flex items-start gap-2 text-sm leading-relaxed text-gray">
                        <MapPin
                          className="mt-0.5 size-4 shrink-0 text-gray"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span>{office.addressLines.join(" ")}</span>
                      </p>

                      <div className="mt-5 flex-1" />
                      <Link
                        href="/locations"
                        className="group inline-flex w-fit items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-(--ease-1) hover:gap-3"
                        style={{ backgroundColor: `${office.accent}14`, color: office.accent }}
                      >
                        Explore location
                        <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
                        <span className="sr-only">— {office.city}</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.28}>
          <div className="mt-9 flex justify-center">
            <Link
              href="/locations"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-accent-deep shadow-(--shadow-hairline) transition-all duration-300 ease-(--ease-1) hover:border-accent hover:shadow-(--shadow-soft)"
            >
              <Globe className="size-4" strokeWidth={1.75} aria-hidden="true" />
              See all locations
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-(--ease-btn) group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
