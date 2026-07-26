import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * The FlowZa kicker — two nodes joined by a hairline ("systems on one fabric"),
 * followed by mono uppercase micro-type.
 */
export function Eyebrow({ children, className, dark = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase",
        dark ? "text-white/70" : "text-muted",
        className,
      )}
    >
      <span aria-hidden="true" className="flex items-center">
        <span className="size-1.5 rounded-full bg-accent-400" />
        <span className="h-px w-4 bg-gradient-to-r from-accent-400 to-brand-600" />
        <span className="size-1.5 rounded-full bg-brand-600" />
      </span>
      {children}
    </span>
  );
}
