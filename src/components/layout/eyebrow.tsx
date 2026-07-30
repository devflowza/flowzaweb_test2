import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * The reference's `.mainLabel`: an inline-flex row-reverse label preceded by two
 * 10px dots — deep teal then accent green — with light-weight text beside them.
 */
export function Eyebrow({ children, className, dark = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex flex-row-reverse items-center gap-[5px] text-lede",
        dark ? "text-white" : "text-ink",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="flex items-center gap-[5px]">
        <span className="size-2.5 rounded-full bg-accent-deep" />
        <span className="size-2.5 rounded-full bg-accent" />
      </span>
    </span>
  );
}

interface KickerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The reference's uppercase micro-label: 14px, weight 500, 3px tracking, grey.
 */
export function Kicker({ children, className }: KickerProps) {
  return (
    <span
      className={cn("block text-caption font-medium uppercase tracking-[3px] text-gray", className)}
    >
      {children}
    </span>
  );
}
