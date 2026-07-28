"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "overflow-hidden rounded-pill border border-surface-tint bg-surface-tint transition-colors duration-300 ease-(--ease-1) data-[state=open]:rounded-card data-[state=open]:border-line",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-5 px-6 py-6 text-left text-h5 text-ink sm:px-8",
        "transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-accent-deep",
        "hover:text-accent-deep [&[data-state=open]>span]:rotate-180 [&[data-state=open]>span]:bg-accent-deep [&[data-state=open]>span]:text-white",
        className,
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-pill bg-line text-ink transition-all duration-300 ease-(--ease-1)"
      >
        <ChevronDown className="size-4" strokeWidth={2} />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "px-6 pb-7 pt-0 text-body font-light leading-relaxed text-gray sm:px-8",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
