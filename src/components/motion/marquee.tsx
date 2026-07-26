import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** Loop duration, e.g. "42s". */
  duration?: string;
  /** Fade the edges into the background. */
  fade?: boolean;
}

/**
 * Pure-CSS infinite marquee. Content is duplicated once (the second copy is
 * aria-hidden) and the track translates -50%.
 *
 * Motion stops entirely under prefers-reduced-motion, and pauses on hover or
 * keyboard focus anywhere inside the strip (WCAG 2.2.2) — pair with a visible
 * control when the marquee is the only way to read the content.
 */
export function Marquee({ children, className, duration = "42s", fade = true }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="marquee-track group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
