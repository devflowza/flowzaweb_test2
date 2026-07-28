import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** The reference's default is a two-column title/lede split on wide screens. */
  layout?: "split" | "stacked" | "center";
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Optional trailing action (the reference puts a button here on sliders). */
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  layout = "split",
  dark = false,
  className,
  as: Heading = "h2",
  action,
}: SectionHeadingProps) {
  const heading = (
    <Heading className={cn("text-h2", dark ? "text-white" : "text-ink")}>{title}</Heading>
  );
  const lede = subtitle ? (
    <p className={cn("text-lede", dark ? "text-white/80" : "text-gray")}>{subtitle}</p>
  ) : null;

  if (layout === "center") {
    return (
      <Reveal
        className={cn(
          "mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center",
          className,
        )}
      >
        {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
        {heading}
        {lede}
      </Reveal>
    );
  }

  if (layout === "stacked") {
    return (
      <Reveal className={cn("mb-12 flex max-w-3xl flex-col gap-4", className)}>
        {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
        {heading}
        {lede}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className="flex max-w-xl flex-col gap-4">
        {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
        {heading}
      </div>
      {lede || action ? (
        <div
          className={cn(
            "flex max-w-xl flex-col items-start gap-5",
            !dark && "lg:border-l lg:border-line lg:pl-12",
            dark && "lg:border-l lg:border-white/20 lg:pl-12",
          )}
        >
          {lede}
          {action}
        </div>
      ) : null}
    </Reveal>
  );
}
