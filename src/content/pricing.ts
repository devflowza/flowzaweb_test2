import { Crown, Sparkles, type LucideIcon } from "lucide-react";
import { EXTERNAL_APPS } from "./site";

/**
 * Canonical FlowZa Finance pricing (matches the seeded Supabase pricing tables
 * and the live trial/checkout URLs). The legacy $49/$99 demo-page table was retired.
 */

export const YEARLY_DISCOUNT_PERCENT = 25;

export interface PricingPlan {
  id: "starter" | "professional" | "enterprise";
  name: string;
  monthlyPrice: number;
  description: string;
  icon: LucideIcon;
  highlighted: boolean;
  features: string[];
  trialUrl: string;
  buyUrl: string;
}

const SHARED_FEATURES = [
  "Purchase management",
  "Banking & reconciliation",
  "Budget tracking",
  "Financial reports",
  "Multi-currency support",
  "Inventory tracking",
  "Recurring invoices",
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 15,
    description: "For small businesses ready to streamline their finances",
    icon: Sparkles,
    highlighted: false,
    features: [
      "1 company",
      "2 team members",
      "1,000 contacts",
      "50 invoices/month",
      "50 quotes/month",
      "50 bills/month",
      "1,000 catalog items",
      ...SHARED_FEATURES,
    ],
    trialUrl: `${EXTERNAL_APPS.financeTrial}?plan=starter`,
    buyUrl: `${EXTERNAL_APPS.financeCheckout}?plan=starter`,
  },
  {
    id: "professional",
    name: "Professional",
    monthlyPrice: 40,
    description: "For growing businesses that need the full toolkit",
    icon: Crown,
    highlighted: true,
    features: [
      "3 companies",
      "5 team members",
      "3,000 contacts",
      "125 invoices/month",
      "125 quotes/month",
      "125 bills/month",
      "3,000 catalog items",
      ...SHARED_FEATURES,
    ],
    trialUrl: `${EXTERNAL_APPS.financeTrial}?plan=professional`,
    buyUrl: `${EXTERNAL_APPS.financeCheckout}?plan=professional`,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 60,
    description: "For established businesses with advanced requirements",
    icon: Crown,
    highlighted: false,
    features: [
      "5 companies",
      "10 team members",
      "6,000 contacts",
      "335 invoices/month",
      "335 quotes/month",
      "335 bills/month",
      "6,000 catalog items",
      ...SHARED_FEATURES,
    ],
    trialUrl: `${EXTERNAL_APPS.financeTrial}?plan=enterprise`,
    buyUrl: `${EXTERNAL_APPS.financeCheckout}?plan=enterprise`,
  },
];

export const ENTERPRISE_PLUS = {
  name: "Enterprise Plus",
  description: "Tailored for your enterprise needs — custom pricing",
  ctaLabel: "Contact Sales",
  ctaHref: "/contact?service=Sales%20Inquiry",
} as const;

/**
 * Monthly-equivalent price under yearly billing, exact to the cent — rounding
 * would advertise a price nobody is actually charged (25% off $15 is $11.25).
 */
export function yearlyMonthlyEquivalent(monthlyPrice: number): number {
  return Number((monthlyPrice * (1 - YEARLY_DISCOUNT_PERCENT / 100)).toFixed(2));
}

/** Total charged up front on the yearly plan. */
export function yearlyTotal(monthlyPrice: number): number {
  return Number((monthlyPrice * 12 * (1 - YEARLY_DISCOUNT_PERCENT / 100)).toFixed(2));
}

/** Trims trailing ".00" so whole-dollar prices stay clean. */
export function formatPrice(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

export const PRICING_COPY = {
  badge: "Pricing",
  title: "Simple, Transparent Pricing",
  subtitle:
    "Start free, scale as you grow. Every plan includes purchase management, banking, reports and multi-currency support.",
  note: "Plans apply to FlowZa Finance. Every plan can be started as a free trial — no card required.",
  /** Shown only on the standalone /pricing page, not in the homepage section. */
  image: {
    src: "/images/pages/pricing.webp",
    alt: "The three FlowZa Finance plans side by side with a monthly and yearly billing switch above them, the middle plan marked as most popular and each listing its included features.",
  },
} as const;
