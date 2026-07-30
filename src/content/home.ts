import { MessageCircle, Rocket, Tag, Cpu, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { CONTACT } from "./site";

export const HERO = {
  badge: "Trusted by 100+ businesses across MEA & India",
  headline: ["One Platform.", "Infinite Flow."],
  verticals: "Finance · Logistics · Wellness · Fleet · Retail · Clubs",
  subhead:
    "Nine purpose-built AI systems on one operating fabric. FlowZa quietly automates the busywork — invoices, routes, rosters, stock — so a team of ten can move like a team of fifty.",
  pills: ["SOC 2 Compliant", "99.9% Uptime SLA", "Go live in hours"],
  industries: ["Retail", "Logistics", "Wellness", "Clubs"],
  /**
   * Hero photography. Leave `src` unset to render a labelled placeholder —
   * add the path once the shot exists and the frame fills in with no layout change.
   */
  image: {
    src: "/images/photos/brand-expo.webp",
    alt: "A hand holding a phone to scan a QR code at a FlowZa stand, below a wall headline reading One Platform. All Possibilities. Visitors talk in the background.",
    focal: "left center",
  },
  floatingStats: [
    { value: "94%", label: "Automation rate" },
    { value: "99.9%", label: "Uptime SLA" },
  ],
} as const;

export const HOW_IT_WORKS = {
  badge: "How It Works",
  title: "From First Call to Full Flow",
  subtitle:
    "Zero-complexity onboarding — pre-built templates, guided setup and dedicated onboarding support included.",
  steps: [
    {
      title: "Tell Us About Your Business",
      description:
        "Pick your platform and share how you operate. We map your workflows — companies, teams, catalogs, facilities — before anything goes live.",
    },
    {
      title: "Guided Setup & Migration",
      description:
        "Pre-built templates and setup wizards configure your organisation. Import contacts, items and history from Zoho or spreadsheets with the built-in migration tools.",
    },
    {
      title: "Go Live & Grow with Insights",
      description:
        "Go live in hours, not weeks. Watch dashboards update in real time and act on AI insights that explain what the numbers mean.",
    },
  ],
  cta: { label: "Start Your Onboarding", href: "/contact" },
} as const;

export const WHY_FLOWZA = {
  badge: "Why FlowZa",
  title: "Software That Disappears Into the Work",
  cards: [
    {
      icon: Cpu,
      title: "Purpose-built AI",
      description:
        "Every system is trained on industry-specific data — not generic models. It understands your business from day one.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise-grade security",
      description:
        "SOC 2 compliant infrastructure with end-to-end encryption, role-based access and audit trails on every action.",
    },
    {
      icon: Zap,
      title: "Zero-complexity onboarding",
      description:
        "Go live in hours, not weeks. Pre-built templates, guided setup and dedicated onboarding support included.",
    },
    {
      icon: TrendingUp,
      title: "True cost savings",
      description:
        "Customers report 40–85% less manual operational work within the first 90 days of running on FlowZa.",
    },
  ],
} as const;

export const FINANCE_SPOTLIGHT = {
  badge: "Flagship Platform",
  title: "FlowZa Finance — Your Entire Back Office, Live",
  subtitle:
    "The operating system for your business finances. Accounting, invoicing, inventory, payroll, HR and compliance — unified in one cloud platform with real-time data and bank-grade security.",
  image: {
    src: "/images/finance/dashboard.webp",
    alt: "The FlowZa Finance dashboard showing total receivables, an income and expense chart, top customers and recent invoices",
  },
  kpis: [
    { value: "98%", label: "Invoice accuracy" },
    { value: "12h", label: "Saved per week" },
    { value: "40%", label: "Cost reduction" },
  ],
  capabilities: [
    {
      title: "One Connected Ledger",
      description:
        "Sales, purchases, inventory and accounting post automatically — no stitching tools together",
      color: "#2563eb",
    },
    {
      title: "Payroll, HR & Inventory",
      description: "Compliant payroll, hire-to-retire HR and perpetual stock in the same platform",
      color: "#9333ea",
    },
    {
      title: "Real-time & Multi-country",
      description: "Live P&L and cash-flow with multi-currency, GST and Gulf VAT built in",
      color: "#10b981",
    },
  ],
  cta: { label: "Explore FlowZa Finance", href: "/products/finance" },
} as const;

export const ACTION_TRIO = {
  badge: "Get Started Today",
  title: "How Would You Like to Begin?",
  subtitle:
    "Choose what works best for you — free trial, transparent pricing, or talk to us directly.",
  cards: [
    {
      icon: Rocket,
      title: "Start Free Trial",
      description:
        "Spin up your workspace and see your operation in flow — before you pay anything.",
      badge: "No Card Required",
      href: "/get-started",
      external: false,
      tone: "brand" as const,
    },
    {
      icon: Tag,
      title: "View Pricing",
      description: "See what every plan includes across all nine platforms.",
      badge: "No Hidden Fees",
      href: "/pricing",
      external: false,
      tone: "emerald" as const,
    },
    {
      icon: MessageCircle,
      title: "Talk to Us",
      description: "Chat directly with our team on WhatsApp for immediate assistance.",
      badge: "Fastest Response",
      href: CONTACT.whatsappUrl,
      external: true,
      tone: "violet" as const,
    },
  ],
} as const;

export const PLATFORMS_SECTION = {
  badge: "Our Platforms",
  title: "Nine Systems. One Operating Fabric.",
  subtitle:
    "Purpose-built AI platforms for every business vertical — each one deep enough to run your operation, all connected to the same fabric.",
  ctaTile: {
    title: "Not sure where to start?",
    description: "Talk to us — we'll map your operation to the right platform.",
    href: "/contact",
  },
} as const;

export const TESTIMONIALS_SECTION = {
  badge: "Customer Stories",
  title: "What Our Clients Say",
  subtitle: "Trusted by 100+ businesses across MEA & India",
} as const;

export const FAQ_SECTION = {
  badge: "FAQ",
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about running your business on FlowZa.",
  closer: "Still have questions?",
  closerCta: { label: "Chat With Us on WhatsApp", href: CONTACT.whatsappUrl },
} as const;
