import { BookOpen, CreditCard, LifeBuoy, Rocket, Settings, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Faq } from "./faqs";

/* ------------------------------- /docs ---------------------------------- */

export const DOCS_PAGE = {
  badge: "Documentation",
  title: "How can we",
  titleHighlight: "help you?",
  subtitle:
    "Platform guides and onboarding resources, organized by product. Full self-serve documentation is expanding — your onboarding specialist walks you through everything in the meantime.",
} as const;

export const DOCS_GETTING_STARTED = [
  {
    title: "Create your account",
    description: "Start a free trial on a live platform, or request early access for the rest.",
  },
  {
    title: "Choose your product",
    description: "Pick the platform that matches your operation — or ask us to map it for you.",
  },
  {
    title: "Import your data",
    description:
      "Guided migration tools bring in contacts, items and history from Zoho or spreadsheets with zero downtime.",
  },
  {
    title: "Configure your workspace",
    description: "Pre-built templates and setup wizards configure companies, teams and catalogs.",
  },
  {
    title: "Go live",
    description: "Most teams are operational within 24–48 hours, with onboarding support included.",
  },
] as const;

/* ------------------------------- /help ---------------------------------- */

export const HELP_PAGE = {
  badge: "Help Center",
  title: "We're here to",
  titleHighlight: "help",
  subtitle:
    "Answers to the questions we hear most, plus direct lines to a human when you need one.",
} as const;

export interface HelpTopic {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const HELP_TOPICS: HelpTopic[] = [
  { icon: Rocket, title: "Getting Started", description: "Trials, onboarding and first steps" },
  {
    icon: Settings,
    title: "Account & Settings",
    description: "Workspace, branding and preferences",
  },
  { icon: CreditCard, title: "Billing & Plans", description: "Pricing, invoices and upgrades" },
  { icon: Users, title: "Team Management", description: "Roles, permissions and access" },
  { icon: BookOpen, title: "Product Guides", description: "Per-platform how-tos and walkthroughs" },
  { icon: ShieldCheck, title: "Security & Privacy", description: "Data protection and compliance" },
];

export const HELP_FAQS: Faq[] = [
  {
    question: "How fast can we get onboarded?",
    answer:
      "Most businesses are fully operational within 24–48 hours. Every platform ships with pre-built templates and a guided setup wizard, and onboarding support is included. Complex enterprise setups with custom integrations typically take 3–5 business days.",
  },
  {
    question: "Can we use more than one FlowZa platform?",
    answer:
      "Yes — that's the design. All nine platforms — FlowZa Finance, Club, LogisPro, Spa Master, QRForge, POS, Fleetza, RentFlow and PMS — share a common data layer, so customers, inventory and ledger data flow between systems without manual re-entry.",
  },
  {
    question: "How does pricing and billing work?",
    answer:
      "Plans start at $15/month, and paying yearly saves 25% across Starter, Professional and Enterprise. Every plan can begin as a free trial — no card required. Enterprise Plus offers custom pricing for larger groups.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "All major cards — Visa, Mastercard and American Express — with additional local payment options depending on your country. Enterprise customers can also pay by bank transfer.",
  },
  {
    question: "Can we export our data?",
    answer:
      "Always. Your business data belongs to you — export it in full as CSV, Excel or JSON at any time, with no lock-in.",
  },
  {
    question: "How do roles and permissions work?",
    answer:
      "Role-based access control comes standard: Admin, Manager, Operator and Read-only roles, with granular per-module permissions on Professional and Enterprise plans. There is no artificial limit on team size.",
  },
  {
    question: "How secure is our data?",
    answer:
      "FlowZa runs on SOC 2 compliant infrastructure. Data is encrypted at rest (AES-256) and in transit (TLS 1.3), every action is captured in an append-only audit trail, and tenant data is isolated at the database level — all backed by a 99.9% uptime SLA.",
  },
  {
    question: "Do you support single sign-on (SSO)?",
    answer:
      "Yes — SAML 2.0 and OAuth 2.0 SSO are available on Professional and Enterprise plans, with support for Okta, Azure AD and Google Workspace.",
  },
];

export const SUPPORT_CHANNELS = [
  {
    icon: LifeBuoy,
    title: "WhatsApp",
    description:
      "The fastest way to reach a human — typically within minutes during business hours.",
    ctaLabel: "Chat on WhatsApp",
  },
  {
    icon: BookOpen,
    title: "Email Support",
    description: "support@flowza.ai — we respond within 4 business hours, Sun–Thu 9AM–6PM GST.",
    ctaLabel: "Email us",
  },
] as const;

/* ------------------------------ /status --------------------------------- */

export const STATUS_PAGE = {
  badge: "System Status",
  title: "All Systems",
  titleHighlight: "Operational",
  subtitle:
    "Live availability of every FlowZa platform and shared service. We publish incident reports here whenever service is degraded.",
  note: "Uptime is backed by a 99.9% SLA on every plan. For real-time updates during an incident, WhatsApp is the fastest channel.",
} as const;

export interface StatusService {
  name: string;
  description: string;
}

export const STATUS_SERVICES: StatusService[] = [
  { name: "FlowZa Finance", description: "Accounting & ERP platform" },
  { name: "FlowZa Club", description: "Membership, booking & billing" },
  { name: "FlowZa Spa Master", description: "Spa & wellness management" },
  { name: "FlowZa LogisPro", description: "Logistics & route optimization" },
  { name: "FlowZa QRForge", description: "QR engine & redirect infrastructure" },
  { name: "FlowZa POS", description: "Point of sale & payments" },
  { name: "FlowZa Fleetza", description: "Fleet tracking & telematics" },
  { name: "Unified AI Core", description: "Shared AI intelligence engine for all products" },
  { name: "Authentication & API", description: "Sign-in, sessions and public APIs" },
  { name: "Email & Notifications", description: "Transactional email and alerts" },
];
