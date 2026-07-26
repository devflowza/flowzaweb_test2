"use client";

import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  once?: boolean;
  /**
   * Above-the-fold content: play a pure-CSS entrance immediately instead of
   * waiting for hydration + IntersectionObserver. Required for anything in the
   * first viewport so first paint and LCP never depend on JS.
   */
  immediate?: boolean;
}

/**
 * Scroll-reveal entrance. The hidden/visible states live in globals.css so the
 * server and client render identical markup (no hydration mismatch) and so
 * no-JS visitors always see content.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  immediate = false,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-inview");
            if (once) io.disconnect();
          } else if (!once) {
            el.classList.remove("is-inview");
          }
        }
      },
      { rootMargin: "-72px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, immediate]);

  const attrs = immediate ? { "data-reveal-now": "" } : { "data-reveal": "" };

  return (
    <div
      ref={ref}
      {...attrs}
      className={className}
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
