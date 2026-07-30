import * as React from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { PLATFORM_NAV, type PlatformNav } from "@/content/platforms-nav";
import { Container, Section } from "@/components/layout/container";
import { Reveal } from "@/components/motion";

/**
 * The operating fabric, drawn from the real content layer.
 *
 * This replaces a generated illustration that depicted the same idea with
 * meaningless icons. Every node here is an actual platform — its own icon,
 * accent and live status — and links to its product page, so the diagram is
 * simultaneously the About page's hero visual and a working site map of the
 * product line. Server-rendered; the only motion is the existing Reveal.
 */

/** Node centres on an ellipse (percentages of the stage), twelve o'clock first. */
const ORBIT: ReadonlyArray<{ x: number; y: number }> = [
  { x: 50.0, y: 10.0 },
  { x: 77.0, y: 19.4 },
  { x: 91.4, y: 43.1 },
  { x: 86.4, y: 70.0 },
  { x: 64.4, y: 87.6 },
  { x: 35.6, y: 87.6 },
  { x: 13.6, y: 70.0 },
  { x: 8.6, y: 43.1 },
  { x: 23.0, y: 19.4 },
];

function OrbitNode({ platform, pos }: { platform: PlatformNav; pos: { x: number; y: number } }) {
  return (
    <Link
      href={`/products/${platform.slug}`}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <span className="flex flex-col items-center gap-1.5">
        <span
          className="relative flex size-13 items-center justify-center rounded-2xl border border-line bg-surface shadow-(--shadow-subtle) transition-all duration-500 ease-(--ease-btn) group-hover:-translate-y-0.5 group-hover:shadow-(--shadow-soft)"
          style={{ color: platform.colorDeep }}
        >
          <platform.icon className="size-5.5" strokeWidth={1.75} aria-hidden="true" />
          {platform.live ? (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 size-2.5 rounded-full border-2 border-surface bg-accent"
            />
          ) : null}
        </span>
        <span className="whitespace-nowrap rounded-full bg-surface/85 px-2 py-0.5 text-[0.7rem] font-medium text-ink backdrop-blur-sm transition-colors group-hover:text-accent-deep">
          {platform.shortName}
        </span>
      </span>
      <span className="sr-only">{platform.live ? " — live today" : " — rolling out"}</span>
    </Link>
  );
}

export function FabricDiagram() {
  return (
    <Section tone="white" compact>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-line bg-gradient-to-br from-[#f6fff8] to-surface-tint">
            {/* Desktop: the real orbit */}
            <div className="relative mx-auto hidden aspect-[21/9] max-w-5xl lg:block">
              {/* Data links, centre to every node */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {ORBIT.map((pos, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={pos.x}
                    y2={pos.y}
                    stroke="var(--color-accent-deep)"
                    strokeOpacity="0.18"
                    strokeWidth="0.22"
                    strokeDasharray="1.1 1.4"
                  />
                ))}
              </svg>

              {/* The shared core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-accent text-white shadow-(--shadow-chip) ring-8 ring-accent/10">
                    <Layers className="size-8" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-ink px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
                    One Data Layer
                  </span>
                </div>
              </div>

              {PLATFORM_NAV.map((platform, i) => (
                <OrbitNode key={platform.slug} platform={platform} pos={ORBIT[i] ?? ORBIT[0]!} />
              ))}
            </div>

            {/* Mobile: same nodes as a wrapping chip row around a compact core */}
            <div className="flex flex-col items-center gap-6 p-7 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-deep to-accent text-white shadow-(--shadow-soft)">
                  <Layers className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                  One Data Layer
                </span>
              </div>
              <ul className="flex flex-wrap justify-center gap-2">
                {PLATFORM_NAV.map((platform) => (
                  <li key={platform.slug}>
                    <Link
                      href={`/products/${platform.slug}`}
                      className="flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pl-2 pr-3.5 text-sm text-ink shadow-(--shadow-hairline)"
                    >
                      <span
                        className="flex size-7 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: `${platform.color}14`,
                          color: platform.colorDeep,
                        }}
                      >
                        <platform.icon className="size-3.5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      {platform.shortName}
                      {platform.live ? (
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <p className="border-t border-line bg-surface/60 px-7 py-4 text-center text-sm text-gray">
              Nine platforms, one shared data layer — customers, inventory and ledger entries move
              between them without re-entry. Green dot means live today.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
