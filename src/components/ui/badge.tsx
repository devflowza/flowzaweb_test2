import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full  uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        default: "border border-line bg-surface-tint px-3 py-1 text-[0.68rem] text-gray",
        brand: "border border-brand-200 bg-accent-mint px-3 py-1 text-[0.68rem] text-accent-deep",
        // Dark ink on a bright chip: 7.8:1 at this size, where white would be 2.5:1.
        live: "bg-emerald-400 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-950",
        dark: "border border-white/15 bg-white/8 px-3 py-1 text-[0.68rem] text-white/85",
        chip: "border border-line bg-surface px-2.5 py-1 text-[0.7rem] normal-case tracking-normal font-sans text-gray",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
