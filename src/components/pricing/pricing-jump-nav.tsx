import * as React from "react";
import { PLATFORM_NAV_MAP } from "@/content/platforms-nav";
import { entryPrice, formatPrice, type ProductPricing } from "@/content/pricing";

/**
 * Anchor row across all nine products.
 *
 * Plain in-page anchors rather than tabs: every product's tiers stay in the
 * document at once, so the page is fully crawlable and Cmd-F finds any plan.
 * Sticky under the header, and horizontally scrollable on narrow screens.
 */
export function PricingJumpNav({ products }: { products: ProductPricing[] }) {
  return (
    <nav
      aria-label="Jump to a platform's pricing"
      className="sticky top-[var(--header-h,4.5rem)] z-30 -mx-(--spacing-section-x) border-y border-line bg-surface/85 backdrop-blur-md"
    >
      <ul className="flex gap-2 overflow-x-auto px-(--spacing-section-x) py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => {
          const platform = PLATFORM_NAV_MAP[product.slug];
          const from = entryPrice(product);
          return (
            <li key={product.slug} className="shrink-0">
              <a
                href={`#${product.slug}`}
                className="group flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-gray transition-all duration-300 ease-(--ease-1) hover:border-accent hover:text-ink"
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="font-medium text-ink">{platform.shortName}</span>
                <span className="text-[0.78rem] tabular-nums">
                  {from !== null ? `$${formatPrice(from)}` : "Quote"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
