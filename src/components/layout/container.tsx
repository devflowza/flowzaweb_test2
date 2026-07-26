import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[90rem] px-(--spacing-gutter)", className)}
      {...props}
    />
  );
}

type SectionTone = "white" | "tint" | "wash" | "navy";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-surface",
  tint: "bg-surface-tint",
  wash: "bg-surface-wash",
  navy: "bg-navy-950 text-white",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  /** Ghost watermark text rendered behind the section content. */
  ghost?: string;
  /** Use the tighter vertical rhythm. */
  compact?: boolean;
}

export function Section({
  tone = "white",
  ghost,
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
        compact ? "py-(--spacing-section-sm)" : "py-(--spacing-section)",
        className,
      )}
      {...props}
    >
      {ghost ? (
        <span
          aria-hidden="true"
          className={cn(
            "fx-ghost-text absolute -top-6 right-0 select-none text-[16vw] leading-none tracking-tighter",
            tone === "navy" && "text-white opacity-[0.045]",
          )}
        >
          {ghost}
        </span>
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}
