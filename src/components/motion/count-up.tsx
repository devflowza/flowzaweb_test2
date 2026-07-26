"use client";

import * as React from "react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

interface CountUpProps {
  /** Display value, e.g. "94%", "10M+", "<0.3s", "2-way". Values without digits render statically. */
  value: string;
  className?: string;
  /** Seconds. */
  duration?: number;
}

/**
 * Counts a stat numeral up when it scrolls into view.
 *
 * The server renders the final value (correct for SEO and for no-JS visitors);
 * the effect then rewinds to zero and tweens `textContent` directly, so a 60fps
 * animation costs no React renders. Reduced-motion users keep the static value.
 */
export function CountUp({ value, className, duration = 1.4 }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = /^([^0-9]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(value);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix = "", digits = "0", suffix = ""] = match;
    const target = Number(digits.replaceAll(",", ""));
    const decimals = (digits.split(".")[1] ?? "").length;
    const useGrouping = digits.includes(",");

    const render = (n: number) => {
      el.textContent = `${prefix}${n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping,
      })}${suffix}`;
    };

    render(0);

    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      const progress = Math.min((now - start) / (duration * 1000), 1);
      render(target * easeOutExpo(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          frame = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "-64px 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
