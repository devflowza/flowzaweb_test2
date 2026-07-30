import type { Route } from "next";

/**
 * Single source of truth for brand, contact, navigation and footer content.
 * Every fact here was reconciled from the previous site (see docs/ARCHITECTURE.md §10).
 */

export const SITE = {
  name: "FlowZa AI",
  shortName: "FlowZa",
  legalName: "SoarTek LLC",
  tagline: "Business Operating Systems",
  url: "https://flowza.ai",
  description:
    "FlowZa AI delivers nine purpose-built, AI-powered business operating systems for MEA & India — from finance and logistics to wellness, retail and clubs.",
  ogDescription:
    "Nine purpose-built AI platforms. One operating fabric. Transforming how businesses across MEA & India operate.",
  positioning: "Nine Systems. One Operating Fabric.",
  manifesto:
    "We believe software should disappear into the work. FlowZa quietly automates the busywork — invoices, routes, rosters, stock — so a team of ten can move like a team of fifty.",
  foundingYear: 2024,
} as const;

const WHATSAPP_NUMBER = "96892107562";
const WHATSAPP_PREFILL =
  "Hello FlowZa team! I'm interested in your business platforms and would like to learn more. Could you please share the details?";

export const CONTACT = {
  whatsappDisplay: "+968 9210 7562",
  /**
   * api.whatsapp.com/send rather than wa.me — wa.me stopped resolving for this
   * number. The prefilled text is URL-encoded at build time; edit the plain
   * string above the CONTACT block, never the encoded URL.
   */
  whatsappUrl: `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
  email: "sales@flowza.ai",
  supportEmail: "support@flowza.ai",
  privacyEmail: "privacy@flowza.ai",
  legalEmail: "legal@flowza.ai",
  contactEmail: "contact@flowza.ai",
  address: "Ghala, Muscat, Oman",
  hours: "Sun – Thu: 9:00 AM – 6:00 PM GST",
  hoursClosed: "Fri & Sat: Closed",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/flowzaai" },
  { label: "YouTube", href: "https://youtube.com/@flowzaai" },
  { label: "WhatsApp", href: CONTACT.whatsappUrl },
] as const;

/** Compliance claims approved for publication (SOC 2 confirmed; ISO 27001 wording retired). */
export const TRUST_BADGES = [
  "SOC 2 Compliant",
  "99.9% Uptime SLA",
  "GST & VAT Ready",
  "Multi-currency",
  "No Lock-in",
] as const;

export const EXTERNAL_APPS = {
  financeTrial: "https://finance.flowza.ai/trial",
  financeCheckout: "https://finance.flowza.ai/checkout",
  clubApp: "https://club.flowza.ai",
} as const;

export type NavLink = { label: string; href: Route };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  // "Platforms" renders as the mega-menu, driven by content/products.ts
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Documentation", href: "/docs" },
  { label: "Help Center", href: "/help" },
  { label: "Status", href: "/status" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

/** Headline stats reused across home, about and stats bands. */
export const COMPANY_STATS = [
  { value: "100+", label: "Active businesses" },
  { value: "4+", label: "Regions — MEA & India" },
  { value: "94%", label: "Automation rate" },
  { value: "99.9%", label: "Uptime SLA" },
] as const;
