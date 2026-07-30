import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button system ported from the reference: pill radius, 0.5px tracking, weight
 * 500, filled variants carry an inset white top bevel, and hover brightens
 * rather than shifting colour.
 */
const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill",
    "font-medium tracking-[0.5px]",
    "transition-[transform,background-color,box-shadow,filter,border-color] duration-500 ease-(--ease-btn)",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-deep",
    "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        filled:
          "border border-accent-deep bg-accent-deep text-white shadow-(--shadow-bevel) hover:brightness-110 active:brightness-105",
        secondary:
          "border border-accent-deep bg-accent-deep text-white shadow-(--shadow-bevel) hover:brightness-110",
        outlined: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        "outlined-white":
          "border border-white/70 bg-transparent text-white hover:bg-white hover:text-ink",
        white: "border border-white bg-white text-ink shadow-(--shadow-soft) hover:brightness-95",
        whatsapp:
          "border border-whatsapp bg-whatsapp text-emerald-950 shadow-(--shadow-bevel) hover:brightness-105",
        ghost: "text-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-9 px-4 text-caption",
        md: "h-11 px-5 text-caption",
        lg: "h-12 px-6 text-body",
        xl: "h-14 px-8 text-body",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

/**
 * The reference's `.textBtn`: a light-weight tracked accent link, revealed on
 * card hover.
 */
export function TextButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-body tracking-[1px] text-accent-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}

export { buttonVariants };
