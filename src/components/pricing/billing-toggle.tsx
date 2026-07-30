"use client";

import * as React from "react";
import { HEADLINE_YEARLY_SAVING } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Monthly/yearly switch for the whole page.
 *
 * The prices themselves are **not** in this component. Every tier renders both
 * its monthly and its yearly figure server-side, and this toggle only flips
 * `data-billing` on the wrapper element; CSS in globals.css reveals the matching
 * set. That keeps nine products' worth of pricing in the static HTML — crawlable,
 * and readable with JS off — instead of shipping it all as client state.
 */
export function BillingToggle({ targetId }: { targetId: string }) {
  const [yearly, setYearly] = React.useState(false);

  React.useEffect(() => {
    const root = document.getElementById(targetId);
    if (root) root.dataset.billing = yearly ? "yearly" : "monthly";
  }, [yearly, targetId]);

  return (
    <div
      role="group"
      aria-label="Billing period"
      className="relative inline-flex items-center rounded-full border border-line bg-surface-tint p-1 shadow-(--shadow-hairline)"
    >
      <button
        type="button"
        onClick={() => setYearly(false)}
        aria-pressed={!yearly}
        className={cn(
          "rounded-full px-5 py-2 text-sm font-medium transition-all duration-400 ease-(--ease-1)",
          !yearly ? "bg-ink text-white shadow-(--shadow-soft)" : "text-gray hover:text-ink",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => setYearly(true)}
        aria-pressed={yearly}
        className={cn(
          "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-400 ease-(--ease-1)",
          yearly ? "bg-ink text-white shadow-(--shadow-soft)" : "text-gray hover:text-ink",
        )}
      >
        Yearly
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
            yearly ? "bg-emerald-400/20 text-emerald-300" : "bg-emerald-100 text-emerald-700",
          )}
        >
          save up to {HEADLINE_YEARLY_SAVING}%
        </span>
      </button>
    </div>
  );
}
