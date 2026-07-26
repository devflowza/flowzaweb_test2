import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-[transform,box-shadow,background-color,border-color,filter] duration-500 ease-(--ease-swift)",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-600",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary:
          "fx-gradient text-white shadow-glow-brand [box-shadow:var(--shadow-glow-brand),inset_0_1px_1px_rgb(255_255_255/0.25)] hover:brightness-110",
        whatsapp:
          "bg-whatsapp text-emerald-950 shadow-glow-whatsapp [box-shadow:var(--shadow-glow-whatsapp),inset_0_1px_1px_rgb(255_255_255/0.35)] hover:brightness-105",
        outline:
          "border border-line-strong bg-surface text-ink shadow-hairline hover:border-faint hover:bg-surface-tint",
        "outline-dark":
          "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/10",
        dark: "bg-navy-950 text-white [box-shadow:inset_0_1px_1px_rgb(255_255_255/0.14)] hover:bg-navy-900",
        white: "bg-white text-ink shadow-lift hover:bg-slate-50",
        ghost: "text-body hover:bg-slate-900/5 hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.9375rem]",
        xl: "h-14 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Trailing icon nested in its own circular island — place as the last child of a Button.
 */
export function ButtonIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "-mr-2 flex size-7 items-center justify-center rounded-full bg-black/10",
        "transition-transform duration-500 ease-(--ease-soft-spring)",
        "group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105",
        "[&_svg]:size-3.5",
        className,
      )}
    >
      {children}
    </span>
  );
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

export { buttonVariants };
