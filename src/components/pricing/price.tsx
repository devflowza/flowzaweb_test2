import * as React from "react";
import {
  formatPrice,
  monthlyEquivalent,
  yearlySavingPercent,
  type PricingTier,
} from "@/content/pricing";

/**
 * Both billing periods, server-rendered. `BillingToggle` flips `data-billing` on
 * an ancestor and CSS hides the set that doesn't apply — so neither figure
 * depends on JavaScript to exist in the document.
 */
export function TierPrice({ tier }: { tier: PricingTier }) {
  if (tier.monthly === null) {
    return (
      <p className="mt-5">
        <span className="text-3xl font-semibold tracking-tight text-ink">Custom</span>
        <span className="mt-1.5 block text-[0.8125rem] text-gray">Quoted to your operation</span>
      </p>
    );
  }

  if (tier.free) {
    return (
      <p className="mt-5">
        <span className="text-4xl font-semibold tracking-tight text-ink">Free</span>
        <span className="mt-1.5 block text-[0.8125rem] text-gray">
          {tier.trialDays ? `${tier.trialDays}-day trial` : "No card required"}
        </span>
      </p>
    );
  }

  const equivalent = monthlyEquivalent(tier);
  const saving = yearlySavingPercent(tier);

  return (
    <>
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-4xl font-semibold tracking-tight text-ink">
          <span data-price="monthly">${formatPrice(tier.monthly)}</span>
          <span data-price="yearly">${formatPrice(equivalent ?? tier.monthly)}</span>
        </span>
        <span className="text-sm text-gray">/mo</span>
      </p>
      <p className="mt-1.5 min-h-5 text-[0.8125rem] text-gray">
        <span data-price="monthly">Billed monthly</span>
        <span data-price="yearly">
          ${formatPrice(tier.yearly ?? 0)} billed yearly
          {saving ? ` — save ${saving}%` : ""}
        </span>
      </p>
    </>
  );
}
