"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { FINANCE_SCREENSHOTS, FINANCE_SHOWCASE } from "@/content/finance";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;
const COUNT = FINANCE_SCREENSHOTS.length;

export function FinanceShowcase() {
  const [active, setActive] = React.useState(0);
  /** User intent — an explicit stop, required by WCAG 2.2.2. */
  const [playing, setPlaying] = React.useState(true);
  /** Transient pauses: pointer/keyboard focus inside, or section scrolled away. */
  const [hovered, setHovered] = React.useState(false);
  const [onScreen, setOnScreen] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Don't burn frames or fetch images while the section is off-screen.
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setOnScreen(entries[0]?.isIntersecting ?? false),
      {
        rootMargin: "200px 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplaying = playing && !hovered && !reduced && onScreen;

  React.useEffect(() => {
    if (!autoplaying) return;
    const id = setInterval(() => setActive((a) => (a + 1) % COUNT), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplaying]);

  const select = (index: number, focus = false) => {
    const next = (index + COUNT) % COUNT;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  /** ARIA tabs keyboard pattern — the list is vertical on desktop, horizontal below lg. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        select(active + 1, true);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        select(active - 1, true);
        break;
      case "Home":
        event.preventDefault();
        select(0, true);
        break;
      case "End":
        event.preventDefault();
        select(COUNT - 1, true);
        break;
    }
  };

  const current = FINANCE_SCREENSHOTS[active] ?? FINANCE_SCREENSHOTS[0]!;

  return (
    <Section tone="navy" className="fx-aurora-dark">
      <Container>
        <SectionHeading
          badge={FINANCE_SHOWCASE.badge}
          title={FINANCE_SHOWCASE.title}
          subtitle={FINANCE_SHOWCASE.subtitle}
          dark
        />

        <div
          ref={sectionRef}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,17rem)_1fr]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          {/* Module tabs */}
          <Reveal className="order-2 lg:order-1">
            <div
              role="tablist"
              aria-label="Finance modules"
              onKeyDown={onTabKeyDown}
              className="flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {FINANCE_SCREENSHOTS.map((shot, i) => (
                <button
                  key={shot.id}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`fin-tab-${shot.id}`}
                  aria-selected={i === active}
                  aria-controls={`fin-panel-${shot.id}`}
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => select(i)}
                  className={cn(
                    "relative shrink-0 snap-start overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-400 ease-(--ease-swift)",
                    i === active
                      ? "border-accent-400/40 bg-white/10"
                      : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]",
                  )}
                >
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      i === active ? "text-white" : "text-white/80",
                    )}
                  >
                    {shot.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.66rem] uppercase tracking-[0.1em] text-white/65">
                    {shot.sub}
                  </span>
                  {i === active && autoplaying ? (
                    <span
                      key={`${active}-${autoplaying}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent-400 to-brand-500"
                      style={{ animation: `fin-progress ${AUTOPLAY_MS}ms linear forwards` }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Device frame */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="bezel-dark shadow-mega">
              <div className="overflow-hidden rounded-[calc(var(--radius-shell)-0.375rem)] border border-white/10 bg-navy-900">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
                  <span aria-hidden="true" className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-400/70" />
                    <span className="size-2.5 rounded-full bg-amber-400/70" />
                    <span className="size-2.5 rounded-full bg-emerald-400/70" />
                  </span>
                  <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-1 font-mono text-[0.7rem] text-white/65">
                    {FINANCE_SHOWCASE.urlBar} · {current.label}
                  </span>
                </div>
                {/* Screens — only the active panel and its neighbours are mounted. */}
                <div className="relative aspect-[1510/1013]">
                  {FINANCE_SCREENSHOTS.map((shot, i) => {
                    const distance = Math.min(Math.abs(i - active), COUNT - Math.abs(i - active));
                    if (distance > 1) return null;
                    return (
                      <div
                        key={shot.id}
                        id={`fin-panel-${shot.id}`}
                        role="tabpanel"
                        aria-labelledby={`fin-tab-${shot.id}`}
                        aria-hidden={i !== active}
                        tabIndex={i === active ? 0 : -1}
                        className={cn(
                          "absolute inset-0 transition-opacity duration-700 ease-(--ease-swift)",
                          i === active ? "opacity-100" : "pointer-events-none opacity-0",
                        )}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.description}
                          fill
                          sizes="(max-width: 1024px) 92vw, 62vw"
                          loading={i === 0 ? undefined : "lazy"}
                          className="object-cover object-left-top"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Caption + controls */}
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p aria-live="polite" className="text-sm font-medium text-white">
                  {current.description}
                </p>
                <ul className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 sm:flex">
                  {current.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/65"
                    >
                      <span aria-hidden="true" className="size-1 rounded-full bg-accent-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  aria-label={playing ? "Pause automatic slideshow" : "Resume automatic slideshow"}
                  onClick={() => setPlaying((p) => !p)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all duration-300 ease-(--ease-swift) hover:border-white/35 hover:text-white"
                >
                  {playing ? (
                    <Pause className="size-4" strokeWidth={1.75} />
                  ) : (
                    <Play className="size-4" strokeWidth={1.75} />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Previous screen"
                  onClick={() => select(active - 1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all duration-300 ease-(--ease-swift) hover:border-white/35 hover:text-white"
                >
                  <ChevronLeft className="size-4.5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Next screen"
                  onClick={() => select(active + 1)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all duration-300 ease-(--ease-swift) hover:border-white/35 hover:text-white"
                >
                  <ChevronRight className="size-4.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <style>{`@keyframes fin-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </Section>
  );
}
