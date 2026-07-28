import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Content well. The reference doesn't use a fixed-width centred container — it
 * pads with a clamp() formula so gutters grow until content hits
 * --section-max-width, then auto-centre. `section-x` implements that.
 */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("section-x w-full", className)} {...props} />;
}

type SectionTone = "white" | "tint" | "mint" | "accent" | "ink";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-surface",
  tint: "bg-surface-tint",
  mint: "bg-surface-mint",
  /** Solid accent full-bleed band — a signature of the reference. */
  accent: "bg-accent-deep text-white",
  ink: "bg-ink text-white",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  /** Ghost watermark word behind the section. */
  ghost?: string;
  /** Drop the vertical rhythm (for full-bleed bands that pad internally). */
  flush?: boolean;
  /** Tighter vertical rhythm for secondary sections. */
  compact?: boolean;
}

export function Section({
  tone = "white",
  ghost,
  flush = false,
  compact = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        toneClasses[tone],
        !flush && (compact ? "py-[clamp(2rem,3vw,4.5rem)]" : "section-y"),
        className,
      )}
      {...props}
    >
      {ghost ? (
        <span
          aria-hidden="true"
          className={cn(
            "fx-ghost absolute -top-4 right-0 select-none text-[10vw] leading-none",
            (tone === "accent" || tone === "ink") && "text-white opacity-[0.08]",
          )}
        >
          {ghost}
        </span>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
