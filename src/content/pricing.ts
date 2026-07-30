import { PLATFORM_NAV_MAP, type PlatformSlug } from "./platforms-nav";
import { EXTERNAL_APPS } from "./site";

/**
 * Per-product pricing.
 *
 * Every figure below was read out of that product's own billing table — the same
 * row the app charges against — not transcribed from a deck. The `source` field
 * on each entry records exactly which project and table it came from so the next
 * person to touch this file can re-verify instead of re-guessing.
 *
 * Two rules this file exists to enforce:
 *
 * 1. **Yearly totals are stored, never computed.** The old version derived yearly
 *    from monthly with a flat 25% formula. That was wrong for at least one plan:
 *    Finance Enterprise is $66/mo and $600/yr, where the formula predicts $594.
 *    A marketing page must quote the number the invoice will show.
 *
 * 2. **No price without a source.** A product whose price isn't recorded anywhere
 *    gets `mode: "quote"` and a contact CTA. Inventing a number here would put
 *    false commercial terms on a public page.
 */

export interface PricingLimit {
  label: string;
  /** Pre-formatted — "Unlimited", "10 GB", "50 / month". */
  value: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  /** Monthly list price, USD. `null` means quote-only. */
  monthly: number | null;
  /** Yearly total as billed, USD — stored, not derived. `null` means quote-only. */
  yearly: number | null;
  /** Free-forever or trial-only tier: rendered without a billing period. */
  free?: boolean;
  highlighted?: boolean;
  trialDays?: number;
  /** What separates this tier from the one below it. */
  limits: PricingLimit[];
  ctaLabel: string;
  ctaHref: string;
}

export interface ProductPricing {
  slug: PlatformSlug;
  /** "self-serve" publishes prices; "quote" routes to sales. */
  mode: "self-serve" | "quote";
  /** Provenance of the numbers — project and table, or why there are none. */
  source: string;
  /** Shown once above the tiers: what every plan on this product includes. */
  includedInEvery?: string[];
  tiers: PricingTier[];
  /** Caveat rendered under the tier row. */
  note?: string;
}

const CONTACT = (service: string) => `/contact?service=${encodeURIComponent(service)}`;

/* ------------------------------------------------------------------------- */
/* Self-serve products                                                       */
/* ------------------------------------------------------------------------- */

/**
 * Flowza_Finance_PRD · public.plans (is_active = true).
 *
 * Every paid tier carries an identical feature set in the database — all the
 * has_* flags are true on Starter, Professional and Enterprise alike. What
 * separates them is capacity, so the tiers lead with limits and the shared
 * capability list is stated once above them. The inactive `free` row is omitted.
 */
const FINANCE: ProductPricing = {
  slug: "finance",
  mode: "self-serve",
  source: "Flowza_Finance_PRD · public.plans",
  includedInEvery: [
    "Double-entry accounting & banking",
    "Purchases, quotes & sales orders",
    "Perpetual inventory with auto-COGS",
    "Payroll & full HR suite",
    "Projects & budgets",
    "Multi-currency",
    "Recurring invoices, bills & expenses",
    "40+ reports",
  ],
  tiers: [
    {
      id: "starter",
      name: "Starter",
      description: "For small businesses ready to streamline their finances",
      monthly: 16,
      yearly: 144,
      trialDays: 14,
      limits: [
        { label: "Users", value: "2" },
        { label: "Companies", value: "1" },
        { label: "Invoices", value: "50 / month" },
        { label: "Contacts", value: "1,000" },
        { label: "Storage", value: "10 GB" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: EXTERNAL_APPS.financeTrial,
    },
    {
      id: "professional",
      name: "Professional",
      description: "For growing businesses that need the full toolkit",
      monthly: 44,
      yearly: 396,
      trialDays: 14,
      highlighted: true,
      limits: [
        { label: "Users", value: "5" },
        { label: "Companies", value: "3" },
        { label: "Invoices", value: "125 / month" },
        { label: "Contacts", value: "3,000" },
        { label: "Storage", value: "25 GB" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: EXTERNAL_APPS.financeTrial,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For established businesses with advanced requirements",
      monthly: 66,
      yearly: 600,
      trialDays: 14,
      limits: [
        { label: "Users", value: "10" },
        { label: "Companies", value: "5" },
        { label: "Invoices", value: "Unlimited" },
        { label: "Contacts", value: "Unlimited" },
        { label: "Storage", value: "40 GB" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: EXTERNAL_APPS.financeTrial,
    },
    {
      id: "enterprise-plus",
      name: "Enterprise Plus",
      description: "Tailored for your enterprise needs",
      monthly: null,
      yearly: null,
      limits: [
        { label: "Users", value: "20+" },
        { label: "Companies", value: "8+" },
        { label: "Invoices", value: "Unlimited" },
        { label: "Contacts", value: "Unlimited" },
        { label: "Storage", value: "40 GB+" },
      ],
      ctaLabel: "Request a Quote",
      ctaHref: CONTACT("Sales Inquiry"),
    },
  ],
  note: "Finance is also billed locally in INR for India — ₹1,179, ₹3,185 and ₹5,427 per month respectively. INR is set independently of the USD list price, not converted at spot.",
};

/**
 * Flowza_LogisPro · public.subscription_plans.
 *
 * That table has no currency column, so USD is inferred from the Stripe price
 * IDs alongside it. Yearly is exactly ten times monthly on all three tiers —
 * i.e. two months free — which is a different structure to every other product.
 */
const LOGISPRO: ProductPricing = {
  slug: "logispro",
  mode: "self-serve",
  source: "Flowza_LogisPro · public.subscription_plans",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      description:
        "Essential tools for small freight forwarding operations — core CRM, shipment jobs, customer management and basic invoicing.",
      monthly: 299,
      yearly: 2990,
      limits: [{ label: "Users", value: "10" }],
      ctaLabel: "Talk to Sales",
      ctaHref: CONTACT("FlowZa LogisPro"),
    },
    {
      id: "professional",
      name: "Professional",
      description:
        "Full logistics suite for growing operations — adds quotations, bookings, containers, customs and finance.",
      monthly: 699,
      yearly: 6990,
      highlighted: true,
      limits: [{ label: "Users", value: "30" }],
      ctaLabel: "Talk to Sales",
      ctaHref: CONTACT("FlowZa LogisPro"),
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description:
        "Complete platform for large logistics enterprises — every module, plus HR, analytics, vendor portal and fleet management.",
      monthly: 1499,
      yearly: 14990,
      limits: [{ label: "Users", value: "Unlimited" }],
      ctaLabel: "Talk to Sales",
      ctaHref: CONTACT("FlowZa LogisPro"),
    },
  ],
  note: "Yearly billing on LogisPro is ten months' price rather than a percentage discount — two months free on every tier.",
};

/** Flowza_PMS · public.subscription_plans (is_public = true). 20% off yearly. */
const PMS: ProductPricing = {
  slug: "pms",
  mode: "self-serve",
  source: "Flowza_PMS · public.subscription_plans",
  tiers: [
    {
      id: "free",
      name: "Free",
      description: "Basic performance management for small teams",
      monthly: 0,
      yearly: 0,
      free: true,
      limits: [
        { label: "Users", value: "10" },
        { label: "Review cycles", value: "Included" },
      ],
      ctaLabel: "Get Started Free",
      ctaHref: PLATFORM_NAV_MAP.pms.appUrl,
    },
    {
      id: "starter",
      name: "Starter",
      description: "Core PMS with calibration and compensation planning",
      monthly: 49,
      yearly: 470,
      trialDays: 14,
      limits: [{ label: "Users", value: "50" }],
      ctaLabel: "Start Free Trial",
      ctaHref: PLATFORM_NAV_MAP.pms.appUrl,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Advanced talent management with analytics and succession",
      monthly: 149,
      yearly: 1430,
      trialDays: 14,
      highlighted: true,
      limits: [{ label: "Users", value: "200" }],
      ctaLabel: "Start Free Trial",
      ctaHref: PLATFORM_NAV_MAP.pms.appUrl,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Full platform with payroll integration and unlimited features",
      monthly: 399,
      yearly: 3830,
      trialDays: 30,
      limits: [{ label: "Users", value: "1,000" }],
      ctaLabel: "Start 30-Day Trial",
      ctaHref: PLATFORM_NAV_MAP.pms.appUrl,
    },
  ],
};

/**
 * Flowza_QR_Dev · public.subscription_plans.
 *
 * Sourced from the QR **development** project — it is the only QRForge database
 * in the account. Confirm against production billing before these go live.
 */
const QRFORGE: ProductPricing = {
  slug: "qrforge",
  mode: "self-serve",
  source: "Flowza_QR_Dev · public.subscription_plans",
  tiers: [
    {
      id: "trial",
      name: "Free Trial",
      description: "Try dynamic QR codes and analytics with no card",
      monthly: 0,
      yearly: 0,
      free: true,
      limits: [
        { label: "QR codes", value: "5" },
        { label: "Dynamic codes", value: "2" },
        { label: "Scans", value: "100 / month" },
        { label: "Business cards", value: "3" },
      ],
      ctaLabel: "Try Free",
      ctaHref: PLATFORM_NAV_MAP.qrforge.appUrl,
    },
    {
      id: "starter",
      name: "Starter",
      description: "For a single brand running everyday campaigns",
      monthly: 9,
      yearly: 89,
      limits: [
        { label: "QR codes", value: "50" },
        { label: "Dynamic codes", value: "20" },
        { label: "Scans", value: "5,000 / month" },
        { label: "Business cards", value: "25" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: PLATFORM_NAV_MAP.qrforge.appUrl,
    },
    {
      id: "professional",
      name: "Professional",
      description: "Campaign folders, bulk creation and product catalogues",
      monthly: 29,
      yearly: 279,
      highlighted: true,
      limits: [
        { label: "QR codes", value: "500" },
        { label: "Dynamic codes", value: "200" },
        { label: "Scans", value: "50,000 / month" },
        { label: "Products", value: "5,000" },
        { label: "API keys", value: "2" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: PLATFORM_NAV_MAP.qrforge.appUrl,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Unlimited codes and scans, with full API access",
      monthly: 79,
      yearly: 749,
      limits: [
        { label: "QR codes", value: "Unlimited" },
        { label: "Dynamic codes", value: "Unlimited" },
        { label: "Scans", value: "Unlimited" },
        { label: "Products", value: "Unlimited" },
        { label: "API keys", value: "20" },
      ],
      ctaLabel: "Start Free Trial",
      ctaHref: PLATFORM_NAV_MAP.qrforge.appUrl,
    },
  ],
};

/* ------------------------------------------------------------------------- */
/* Quote-only products                                                       */
/* ------------------------------------------------------------------------- */

/**
 * These five publish no price because no price exists to publish.
 *
 * Club and RentFlow are live but hold no SaaS plan table — Club's `packages`
 * table is its tenants' own membership products, not what FlowZa charges for
 * Club. POS and Fleetza have no database in the account at all. Spa Master does
 * have `subscription_tiers`, but the ladder in it is inverted (Starter $149 >
 * Professional $119 > Enterprise $99) while every capacity column ascends
 * correctly, so the prices are withheld as a suspected data fault rather than
 * published upside-down.
 */
const QUOTE_ONLY: ProductPricing[] = (
  [
    ["club", "Live today. Membership, booking and billing priced per club size."],
    ["rentflow", "Live today. Priced on portfolio size and application volume."],
    [
      "spamaster",
      "Priced per branch and per practitioner. Published tiers pending a billing review.",
    ],
    ["pos", "In controlled rollout. Priced per till and per location."],
    ["fleetza", "In controlled rollout. Priced per tracked vehicle."],
  ] as const
).map(([slug, description]) => ({
  slug,
  mode: "quote" as const,
  source:
    slug === "spamaster"
      ? "Flowza_SpaManager · public.subscription_tiers — withheld, tier ladder inverted"
      : "No published plan table",
  tiers: [
    {
      id: "quote",
      name: "Custom",
      description,
      monthly: null,
      yearly: null,
      limits: [],
      ctaLabel: PLATFORM_NAV_MAP[slug].live ? "Get a Quote" : "Request Early Access",
      ctaHref: CONTACT(PLATFORM_NAV_MAP[slug].name),
    },
  ],
}));

/** Ordered to match the platform index on /products. */
export const PRODUCT_PRICING: ProductPricing[] = [
  FINANCE,
  LOGISPRO,
  PMS,
  QRFORGE,
  ...QUOTE_ONLY,
].sort((a, b) => PLATFORM_NAV_MAP[a.slug].index.localeCompare(PLATFORM_NAV_MAP[b.slug].index));

export const SELF_SERVE_PRICING = PRODUCT_PRICING.filter((p) => p.mode === "self-serve");
export const QUOTE_PRICING = PRODUCT_PRICING.filter((p) => p.mode === "quote");

/* ------------------------------------------------------------------------- */
/* Helpers                                                                   */
/* ------------------------------------------------------------------------- */

/**
 * Groups thousands and shows cents only when there are any — so a list reads
 * "$1,499" next to "$1,249.17" rather than "$1,499" next to "$1249.17".
 */
export function formatPrice(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Monthly-equivalent under yearly billing, exact to the cent — rounding would
 * advertise a rate nobody is charged.
 */
export function monthlyEquivalent(tier: PricingTier): number | null {
  if (tier.yearly === null) return null;
  return Number((tier.yearly / 12).toFixed(2));
}

/** Whole-percent saving of paying yearly, or null when there is nothing to compare. */
export function yearlySavingPercent(tier: PricingTier): number | null {
  if (!tier.monthly || !tier.yearly) return null;
  const full = tier.monthly * 12;
  if (full <= tier.yearly) return null;
  return Math.round(((full - tier.yearly) / full) * 100);
}

/** Cheapest non-free monthly price on a product, for "from $X" summaries. */
export function entryPrice(product: ProductPricing): number | null {
  const paid = product.tiers
    .map((t) => t.monthly)
    .filter((m): m is number => typeof m === "number" && m > 0);
  return paid.length ? Math.min(...paid) : null;
}

/** The largest yearly saving offered anywhere, used for the toggle's badge. */
export const HEADLINE_YEARLY_SAVING = Math.max(
  ...SELF_SERVE_PRICING.flatMap((p) => p.tiers.map((t) => yearlySavingPercent(t) ?? 0)),
);

/* ------------------------------------------------------------------------- */
/* Page copy                                                                 */
/* ------------------------------------------------------------------------- */

export const PRICING_PAGE = {
  badge: "Pricing",
  title: "Nine Platforms.",
  titleHighlight: "Priced Independently.",
  subtitle:
    "Each FlowZa platform is priced for the operation it runs — a QR campaign and a freight-forwarding desk shouldn't cost the same. Pay for the platforms you use, on one bill, with every plan starting as a free trial.",
  image: {
    src: "/images/pages/pricing.webp",
    alt: "A billing comparison: twelve months of monthly charges beside the lower yearly equivalent, with a ring showing the saving and a free-trial runway.",
  },
  note: "Prices are per organisation in USD, excluding local taxes. Every paid plan can start as a free trial — no card required — and platforms share one data layer, so adding a second one never means re-entering your customers or ledger.",
} as const;

/** Finance-only teaser copy for the homepage section. */
export const FINANCE_PRICING_TEASER = {
  badge: "Pricing",
  title: "Simple, Transparent Pricing",
  subtitle:
    "FlowZa Finance starts at $16/month. Every plan includes accounting, purchases, banking, inventory, payroll and 40+ reports — tiers differ by capacity, not features.",
  ctaLabel: "See all nine platforms' pricing",
} as const;

export const FINANCE_TIERS = FINANCE.tiers;
