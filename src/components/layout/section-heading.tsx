import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion";

interface SectionHeadingProps {
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
  /** Heading level — pages must keep a sane document outline. */
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex max-w-3xl flex-col gap-4 sm:mb-16",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {badge ? <Eyebrow dark={dark}>{badge}</Eyebrow> : null}
      <Heading className={cn("text-display-lg", dark ? "text-white" : "text-ink")}>{title}</Heading>
      {subtitle ? (
        <p className={cn("text-lede", dark ? "text-white/70" : "text-body")}>{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
