import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  BarChart2,
  Calendar,
  CalendarCheck,
  Clock,
  CreditCard,
  Cpu,
  Database,
  Download,
  Eye,
  Fuel,
  Globe,
  Heart,
  Layers,
  LayoutGrid,
  Link,
  Map,
  MapPin,
  MessageCircle,
  Monitor,
  Navigation,
  Package,
  Palette,
  PieChart,
  Radio,
  Receipt,
  RefreshCw,
  Scale,
  Search,
  Shield,
  Signature,
  SlidersHorizontal,
  Star,
  Target,
  Users,
  Warehouse,
  Wifi,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PLATFORM_NAV_MAP, type PlatformNav, type PlatformSlug } from "./platforms-nav";

export { PLATFORM_NAV, PLATFORM_SLUGS, type PlatformNav, type PlatformSlug } from "./platforms-nav";

export interface PlatformFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PlatformStep {
  title: string;
  description: string;
}

export interface PlatformStat {
  value: string;
  label: string;
}

export interface PlatformTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface Platform extends PlatformNav {
  /** One-liner used on grid tiles. */
  cardDescription: string;
  /** Short description — hero subhead on the platform page. */
  description: string;
  /** Long description — capabilities section lede. */
  longDescription: string;
  badges: string[];
  cardBadges: string[];
  features: PlatformFeature[];
  steps: PlatformStep[];
  stats: PlatformStat[];
  /** Omit until a real, attributable customer quote exists — never invent one. */
  testimonial?: PlatformTestimonial;
  related: PlatformSlug[];
}

export const PLATFORMS: Platform[] = [
  {
    ...PLATFORM_NAV_MAP.finance,
    cardDescription:
      "Accounting, inventory, payroll, HR and multi-country compliance — unified in one platform.",
    description:
      "The operating system for your business finances. Accounting, invoicing, inventory, payroll, HR and compliance — unified in one cloud platform with real-time data and bank-grade security.",
    longDescription:
      "FlowZa Finance is an all-in-one, multi-tenant accounting and ERP platform built for modern businesses. It combines sales, purchases, inventory, double-entry accounting, banking, payroll, a full HR suite and reporting in a single system — with multi-currency, multi-country tax compliance and audit-ready books. Run one entity or a whole group; FinanceOS scales without you stitching five separate tools together.",
    badges: ["Accounting + Inventory", "Payroll & HR", "India + Gulf tax"],
    cardBadges: ["Payroll & HR", "Inventory", "India + Gulf tax"],
    features: [
      {
        icon: Layers,
        title: "One Platform, Every Function",
        description:
          "Sales, purchases, inventory, accounting, banking, payroll, HR and reporting on a single connected ledger — no more stitching together five different tools.",
      },
      {
        icon: Package,
        title: "Perpetual Inventory & Auto-COGS",
        description:
          "Real-time stock with Weighted Average Cost, serial tracking, multi-location, bundles and reorder alerts. Cost-of-goods posts automatically — inventory and books always agree.",
      },
      {
        icon: Users,
        title: "Payroll & HR, Built In",
        description:
          "Run compliant payroll in minutes and manage hire-to-retire HR — recruitment, onboarding, attendance, leave and performance — all inside the same platform.",
      },
      {
        icon: Globe,
        title: "Multi-Country Tax Engines",
        description:
          "GST for India and VAT plus Corporate Tax for the Gulf, with country-specific chart-of-accounts packs and statutory payroll filings built in — not bolted on.",
      },
      {
        icon: RefreshCw,
        title: "Self-Checking Books",
        description:
          "Double-entry accounting with period locks, multi-currency revaluation and nightly sub-ledger vs GL reconciliation that detects drift and alerts you automatically.",
      },
      {
        icon: BarChart2,
        title: "40+ Reports + AI Insights",
        description:
          "Trial balance, P&L, balance sheet, cash flow and aging — export to PDF, Excel or CSV, with plain-English AI summaries that explain what the numbers mean.",
      },
    ],
    steps: [
      {
        title: "Set Up Your Organisation",
        description:
          "Add your company, chart of accounts and team, then import contacts, items and history from Zoho or spreadsheets with the built-in migration wizard.",
      },
      {
        title: "Run Your Whole Back Office",
        description:
          "Invoice customers, raise purchase orders, track stock, run payroll and manage your people — every transaction posts to the ledger automatically.",
      },
      {
        title: "Live Reports & Compliance",
        description:
          "Watch dashboards update in real time, file GST and VAT returns on schedule, and share audit-ready, role-based views with accountants and investors.",
      },
    ],
    stats: [
      { value: "40+", label: "Functional modules in one platform" },
      { value: "85%", label: "Less manual back-office work" },
      { value: "4", label: "Countries compliant — India + Gulf" },
      { value: "99.8%", label: "Transaction categorization accuracy" },
    ],
    testimonial: {
      quote:
        "FlowZa Finance cut our monthly close from 5 days to 6 hours. The AI categorization is eerily accurate and the real-time dashboards have completely changed how our board reviews performance.",
      name: "Amara Osei",
      role: "CFO",
      company: "Brightline Retail Group",
      initials: "AO",
    },
    /* pms over logispro: Finance's own copy already claims "Payroll & HR,
       Built In" — PMS is the direct, textually-grounded cross-sell for that,
       and the only back-office/HR pick among an otherwise all-operational
       set of three. */
    related: ["pos", "club", "pms"],
  },
  {
    ...PLATFORM_NAV_MAP.logispro,
    cardDescription: "Route optimization, live shipment tracking and warehouse management.",
    description:
      "Intelligent route optimization, shipment tracking, and warehouse management. Reduce delivery costs by up to 30% with AI-driven logistics.",
    longDescription:
      "FlowZa LogisPro brings enterprise-grade logistics intelligence to growing businesses. With AI-optimized routes, real-time tracking, and a full warehouse management system, you gain the operational visibility and cost control that was previously only available to logistics giants.",
    badges: ["Route Optimization", "Live Tracking", "Warehouse WMS"],
    cardBadges: ["Route optimization", "Live tracking", "Warehouse WMS"],
    features: [
      {
        icon: Navigation,
        title: "AI Route Optimization",
        description:
          "Plan hundreds of deliveries in seconds. Our algorithm factors in traffic, time windows, vehicle capacity, and driver hours to build the lowest-cost routes automatically.",
      },
      {
        icon: MapPin,
        title: "Real-time Shipment Tracking",
        description:
          "Live GPS tracking for every vehicle and shipment. Customers get automated tracking links and ETAs, while your ops team sees the full picture on one map.",
      },
      {
        icon: Warehouse,
        title: "Warehouse Management System",
        description:
          "Manage putaway, picking, packing, and dispatch from a single WMS interface. Barcode and QR scanning support eliminates manual data entry and picking errors.",
      },
      {
        icon: AlertCircle,
        title: "Proactive Delay Detection",
        description:
          "AI monitors every active shipment and proactively flags delays before they happen — giving your team time to reroute or notify customers in advance.",
      },
      {
        icon: Clock,
        title: "Driver & Fleet Management",
        description:
          "Track driver hours, performance scores, and compliance. Assign jobs dynamically based on proximity, shift availability, and vehicle type.",
      },
      {
        icon: Layers,
        title: "Multi-carrier Integration",
        description:
          "Connect with third-party couriers, freight brokers, and last-mile partners. Rate-shop across carriers and book shipments without leaving the platform.",
      },
    ],
    steps: [
      {
        title: "Import Your Network",
        description:
          "Add your depots, vehicles, drivers, and customer addresses. Connect your existing order management system or use our open API to push orders automatically.",
      },
      {
        title: "Optimize & Dispatch",
        description:
          "Each morning, FlowZa LogisPro builds optimized routes for your entire fleet. Review, adjust if needed, and dispatch with one click — drivers get routes on their mobile app.",
      },
      {
        title: "Track, Analyze & Improve",
        description:
          "Monitor deliveries live, measure on-time performance, fuel usage, and cost per delivery. Use weekly AI reports to continuously reduce operational waste.",
      },
    ],
    stats: [
      { value: "30%", label: "Average reduction in delivery costs" },
      { value: "98.2%", label: "On-time delivery rate for customers" },
      { value: "22%", label: "Fuel savings from optimized routing" },
      { value: "5×", label: "Faster route planning vs. manual methods" },
    ],
    testimonial: {
      quote:
        "We were spending enormous time manually planning routes and still missing delivery windows. FlowZa LogisPro automated the entire process, cut our fuel costs by a quarter, and our customer satisfaction scores have never been higher.",
      name: "David Mensah",
      role: "Operations Director",
      company: "SwiftLink Logistics",
      initials: "DM",
    },
    related: ["fleetza", "finance", "pos"],
  },
  {
    ...PLATFORM_NAV_MAP.spamaster,
    cardDescription: "Bookings, staff scheduling, inventory and customer loyalty — unified.",
    description:
      "End-to-end platform for spas and wellness centers. Online booking, staff scheduling, inventory, and customer loyalty — all unified.",
    longDescription:
      "FlowZa Spa Master is purpose-built for spas, wellness studios, and beauty centers that want to deliver exceptional client experiences while running a tight operation. From the moment a client books online to the moment they leave a review, every touchpoint is managed in one intelligent platform.",
    badges: ["Online Booking", "Staff Scheduling", "Loyalty Programs"],
    cardBadges: ["Online booking", "Scheduling", "Loyalty"],
    features: [
      {
        icon: Calendar,
        title: "Smart Online Booking",
        description:
          "A beautiful client-facing booking portal that shows real-time availability, service durations, and therapist preferences — accessible from any device, 24/7.",
      },
      {
        icon: Users,
        title: "Staff Scheduling Engine",
        description:
          "Build optimal rosters automatically based on staff availability, certifications, and client preferences. Reduce scheduling conflicts and overtime costs.",
      },
      {
        icon: Package,
        title: "Inventory & Retail Management",
        description:
          "Track product stock used in treatments and sold at reception. Auto-reorder alerts prevent stockouts and detailed COGS tracking protects your margins.",
      },
      {
        icon: Star,
        title: "Customer Loyalty & Memberships",
        description:
          "Create tiered loyalty programs, membership packages, and gift vouchers that keep clients coming back. Automated retention campaigns re-engage dormant customers.",
      },
      {
        icon: Heart,
        title: "Client Profile & History",
        description:
          "Every client visit, preference, treatment note, and purchase is stored in a rich profile. Therapists walk into every session fully prepared.",
      },
      {
        icon: BarChart2,
        title: "Revenue & Performance Analytics",
        description:
          "Track revenue per treatment room, therapist utilization, rebooking rates, and retail attach rates in real time to optimize your most profitable services.",
      },
    ],
    steps: [
      {
        title: "Set Up Your Space",
        description:
          "Add your services, staff, treatment rooms, and operating hours. Import existing client records and configure your booking rules in under an hour.",
      },
      {
        title: "Go Live with Bookings",
        description:
          "Share your branded booking link or embed it on your website. Clients self-book, staff receive automatic schedule updates, and reminders go out automatically.",
      },
      {
        title: "Grow with Insights",
        description:
          "Use daily analytics to identify your highest-value clients, best-performing services, and peak demand windows — then act on them with targeted promotions.",
      },
    ],
    stats: [
      { value: "42%", label: "Average increase in online bookings" },
      { value: "28%", label: "Reduction in no-show rates with automated reminders" },
      { value: "3×", label: "Faster front-desk check-in and checkout" },
      { value: "94%", label: "Client satisfaction score average" },
    ],
    testimonial: {
      quote:
        "FlowZa Spa Master transformed how we run our three locations. The staff scheduling alone saves us 10+ hours a week, and our clients love the seamless booking experience. Rebooking rates went up 35% in the first quarter.",
      name: "Priya Nair",
      role: "Owner",
      company: "Serenity Wellness Studios",
      initials: "PN",
    },
    related: ["club", "pos", "finance"],
  },
  {
    ...PLATFORM_NAV_MAP.fleetza,
    cardDescription: "GPS tracking, driver behaviour scoring and predictive maintenance.",
    description:
      "Real-time GPS tracking, driver behavior scoring, predictive maintenance alerts, and fuel analytics for your entire fleet.",
    longDescription:
      "FlowZa Fleetza transforms how businesses manage their vehicles, drivers, and operational costs. By combining real-time GPS tracking with AI-driven predictive maintenance and driver behavior analytics, FlowZa Fleetza gives fleet managers the visibility and control to run safer, leaner, and more compliant operations at any scale.",
    badges: ["GPS Tracking", "Driver Scoring", "Predictive Maintenance"],
    cardBadges: ["GPS tracking", "Driver scoring", "Maintenance"],
    features: [
      {
        icon: Radio,
        title: "Real-time GPS Tracking",
        description:
          "See every vehicle on a live map with 10-second refresh rates. Replay any route from history, set geofence alerts, and share live ETAs with dispatchers and clients.",
      },
      {
        icon: Shield,
        title: "Driver Behavior Scoring",
        description:
          "AI analyzes every trip for harsh braking, rapid acceleration, speeding, and phone usage. Automated coaching nudges and leaderboards improve safety culture without friction.",
      },
      {
        icon: Wrench,
        title: "Predictive Maintenance",
        description:
          "FlowZa Fleetza monitors engine diagnostics, mileage, and usage patterns to predict component failures before they happen — eliminating costly breakdowns and unplanned downtime.",
      },
      {
        icon: Fuel,
        title: "Fuel Analytics & Optimization",
        description:
          "Track fuel consumption per vehicle, identify inefficient routes and idling patterns, and flag potential fuel fraud. Average customers reduce fuel spend by 18–25%.",
      },
      {
        icon: Map,
        title: "Geofencing & Zone Management",
        description:
          "Define operational zones and receive instant alerts when vehicles enter or exit. Automate time-on-site tracking for customer visits and job site compliance.",
      },
      {
        icon: Cpu,
        title: "Fleet Cost Intelligence",
        description:
          "Full lifecycle cost tracking per vehicle — acquisition, maintenance, fuel, insurance, and depreciation. Know your true cost-per-km and make data-driven replacement decisions.",
      },
    ],
    steps: [
      {
        title: "Install & Connect",
        description:
          "Plug FlowZa Fleetza's compact OBD-II tracker into any vehicle in seconds. No wiring, no downtime. The dashboard populates with live data within minutes of installation.",
      },
      {
        title: "Monitor & Alert",
        description:
          "Your fleet ops team sees every vehicle live on the map. AI watches for safety events, maintenance needs, and policy violations — sending alerts before issues escalate.",
      },
      {
        title: "Optimize Costs & Safety",
        description:
          "Weekly AI reports surface your highest-cost vehicles, riskiest drivers, and maintenance priorities. Take action on clear recommendations to reduce fleet TCO continuously.",
      },
    ],
    stats: [
      { value: "23%", label: "Average reduction in total fleet operating costs" },
      { value: "41%", label: "Decrease in accident-related incidents" },
      { value: "18%", label: "Average fuel savings from behavior coaching" },
      { value: "4×", label: "Faster maintenance response with predictive alerts" },
    ],
    testimonial: {
      quote:
        "FlowZa Fleetza gave us visibility we never had before. Within two months, our accident rate dropped significantly, our fuel costs fell by nearly 20%, and our maintenance spend is now completely predictable. It pays for itself every month.",
      name: "Nia Adjei",
      role: "Fleet Manager",
      company: "TransAfrica Freight",
      initials: "NA",
    },
    related: ["logispro", "finance", "pos"],
  },
  {
    ...PLATFORM_NAV_MAP.qrforge,
    cardDescription: "Dynamic QR codes at scale — redirects, scan analytics and bulk generation.",
    description:
      "Create, manage, and track QR codes at scale. Dynamic redirects, scan analytics, branded codes, and bulk generation for campaigns.",
    longDescription:
      "FlowZa QRForge is the professional QR code platform for marketing teams, retailers, and operations that need more than a static code. Create dynamic codes that can be updated after printing, track every scan in real time, and run sophisticated campaign analytics — all from one dashboard.",
    badges: ["Dynamic Redirect", "Scan Analytics", "Bulk Generation"],
    cardBadges: ["Dynamic redirect", "Analytics", "Bulk generation"],
    features: [
      {
        icon: Link,
        title: "Dynamic Redirects",
        description:
          "Change the destination URL of any printed QR code at any time — without reprinting. Perfect for menus, packaging, and long-running campaigns that need flexibility.",
      },
      {
        icon: Eye,
        title: "Real-time Scan Analytics",
        description:
          "Track every scan with location, device type, operating system, and time data. Build audience profiles and measure campaign performance with precision.",
      },
      {
        icon: Palette,
        title: "Branded Code Design",
        description:
          "Create visually stunning QR codes with your brand colors, embedded logos, and custom frames. Multiple export formats including SVG for print-perfect quality.",
      },
      {
        icon: Download,
        title: "Bulk Generation & Management",
        description:
          "Generate thousands of unique QR codes from a CSV upload in seconds. Manage them in organized campaigns with folder structures and team permissions.",
      },
      {
        icon: Target,
        title: "A/B Testing & Smart Routing",
        description:
          "Split-test destinations, route users based on location or device type, and schedule time-based redirects — all from a single QR code.",
      },
      {
        icon: Activity,
        title: "Campaign Performance Dashboards",
        description:
          "Visualize scan heatmaps, conversion funnels, and campaign comparisons in beautiful dashboards that you can export or share with clients.",
      },
    ],
    steps: [
      {
        title: "Create Your Codes",
        description:
          "Design a single branded code or upload a CSV to generate thousands at once. Set your destination URL, add your brand elements, and download in any format.",
      },
      {
        title: "Deploy & Track",
        description:
          "Use your codes in print, digital, or product packaging. Every scan is captured in real time — you see who scanned, when, and where with full detail.",
      },
      {
        title: "Optimize & Update",
        description:
          "Change destinations, run A/B tests, and adjust targeting rules on live codes without reprinting. Use scan data to continuously improve your campaigns.",
      },
    ],
    stats: [
      { value: "10M+", label: "QR codes generated on the platform" },
      { value: "<0.3s", label: "Average redirect time per scan" },
      { value: "60%", label: "Higher engagement vs. static QR codes" },
      { value: "99.99%", label: "Uptime SLA for redirect infrastructure" },
    ],
    testimonial: {
      quote:
        "We run hundreds of simultaneous marketing campaigns and FlowZa QRForge is the backbone of all of them. The ability to update destinations after print saves us thousands in reprinting costs every month. The analytics are outstanding.",
      name: "Fatima Al-Hassan",
      role: "Head of Marketing",
      company: "Urban Eats Group",
      initials: "FA",
    },
    related: ["pos", "finance", "spamaster"],
  },
  {
    ...PLATFORM_NAV_MAP.pos,
    cardDescription: "Blazing-fast point of sale with offline mode and deep customer analytics.",
    description:
      "A blazing-fast POS system with offline mode, multi-location inventory, and deep customer analytics. Works on any device, anywhere.",
    longDescription:
      "FlowZa POS is the modern point-of-sale system built for businesses that cannot afford downtime. Lightning-fast transactions, seamless offline operation, and deep customer intelligence make it the most reliable and insightful POS platform for retail, food and beverage, and service businesses.",
    badges: ["Offline Mode", "Multi-location", "Deep Analytics"],
    cardBadges: ["Offline mode", "Multi-location", "Analytics"],
    features: [
      {
        icon: Wifi,
        title: "True Offline Mode",
        description:
          "Process transactions, apply discounts, and manage inventory even without internet. All data syncs automatically when connectivity is restored — zero data loss guaranteed.",
      },
      {
        icon: Monitor,
        title: "Works on Any Device",
        description:
          "Run FlowZa POS on iPad, Android tablet, Windows terminal, or a web browser. One license, every device. No proprietary hardware required.",
      },
      {
        icon: CreditCard,
        title: "Universal Payment Acceptance",
        description:
          "Accept cards, mobile wallets, QR payments, cash, and split payments in one tap. Integrated payment processing with next-day settlement and reconciliation.",
      },
      {
        icon: Database,
        title: "Multi-location Inventory",
        description:
          "Manage stock across unlimited locations from a central dashboard. Stock transfers, low-stock alerts, and purchase order management built in.",
      },
      {
        icon: PieChart,
        title: "Deep Customer Analytics",
        description:
          "Know your best customers, their purchase history, average spend, and preferred products. Use this data to drive loyalty programs and personalized promotions.",
      },
      {
        icon: ArrowUpRight,
        title: "Seamless Integrations",
        description:
          "Native connections to FlowZa Finance for accounting, delivery platforms, eCommerce channels, and your existing CRM — all data flows without manual entry.",
      },
    ],
    steps: [
      {
        title: "Set Up in Minutes",
        description:
          "Add your products, set your prices, and configure your payment methods. FlowZa POS imports your existing product catalog and can be ready for your first transaction in under 30 minutes.",
      },
      {
        title: "Sell Faster, Smarter",
        description:
          "Your staff processes transactions in seconds with an intuitive interface optimized for speed. Modifiers, combo deals, and discounts are applied with one tap.",
      },
      {
        title: "Analyze & Grow",
        description:
          "Review hourly sales performance, peak periods, top products, and staff productivity. Use built-in AI recommendations to optimize your menu, pricing, and staffing.",
      },
    ],
    stats: [
      { value: "0.8s", label: "Average transaction completion time" },
      { value: "100%", label: "Offline reliability — no transactions lost" },
      { value: "35%", label: "Increase in average basket size with AI upsells" },
      { value: "150+", label: "Payment methods and gateways supported" },
    ],
    testimonial: {
      quote:
        "We have 12 locations across three cities and FlowZa POS gives me a real-time view of every one of them from my phone. The offline mode saved us during a major outage last year. Not a single sale was lost.",
      name: "Kwame Boateng",
      role: "Managing Director",
      company: "Harvest Kitchen Group",
      initials: "KB",
    },
    related: ["finance", "qrforge", "spamaster"],
  },
  {
    ...PLATFORM_NAV_MAP.club,
    cardDescription: "Membership, billing, POS and zero-double-book booking for clubs — unified.",
    description:
      "The operating system for modern clubs — membership, a true double-entry ledger, charge-to-account POS and zero-double-book booking, unified across every facility.",
    longDescription:
      "FlowZa Club is the multi-tenant operating system for country, golf, racquet, marina, fitness, dining and events clubs. One platform unifies membership and household billing, a true double-entry ledger, charge-to-account POS, and a booking engine that makes double-bookings structurally impossible — with two-way WhatsApp and a branded member portal on top. Run one club or a whole group, global from day one with per-club currency, tax and feature entitlements.",
    badges: ["Membership & Billing", "Zero double-booking", "Two-way WhatsApp"],
    cardBadges: ["Membership", "Booking", "Two-way WhatsApp"],
    features: [
      {
        icon: Users,
        title: "Members & Households",
        description:
          "Member directory, priced tiers with dues and initiation fees, household billing, and a full active-to-honorary lifecycle — with safe archive over delete to protect the ledger.",
      },
      {
        icon: Scale,
        title: "Double-Entry Ledger",
        description:
          "A true double-entry general ledger that rejects unbalanced entries, with A/R-to-GL reconciliation, drift alerts, audit-safe voids and multi-gateway payments.",
      },
      {
        icon: Receipt,
        title: "Charge-to-Account POS",
        description:
          "Multi-outlet F&B and pro-shop registers with tabs and chits, charge-to-member-account, service charge and tax — settled and posted straight to the ledger.",
      },
      {
        icon: CalendarCheck,
        title: "Zero-Double-Book Booking",
        description:
          "A booking engine where double-bookings are structurally impossible — timezone-correct availability, waitlists with auto-promotion, dynamic pricing and cancellation cutoffs.",
      },
      {
        icon: LayoutGrid,
        title: "Six Facility Verticals",
        description:
          "Golf, racquet, marina, fitness, dining and events run on one engine with a unified calendar and shared member history — each module licensed independently.",
      },
      {
        icon: MessageCircle,
        title: "WhatsApp + Member Portal",
        description:
          "Two-way WhatsApp with a natural-language AI agent for booking, reschedule and self-verify, plus a branded, passwordless member portal and digital membership card.",
      },
    ],
    steps: [
      {
        title: "Launch Your Club",
        description:
          "Start a 14-day trial and complete the six-step setup wizard — branding, currency, tax, staff roles and facilities — then import your member directory and go live.",
      },
      {
        title: "Run Every Operation",
        description:
          "Take bookings across golf, courts, marina and dining, run charge-to-account POS, and post dues and payments — every transaction lands in one balanced ledger automatically.",
      },
      {
        title: "Grow Your Membership",
        description:
          "List your club on the public marketplace, turn request-to-join into members in one step, collect verified reviews, and track KPIs across every branch in real time.",
      },
    ],
    stats: [
      { value: "0", label: "Double-bookings — enforced in the database" },
      { value: "6", label: "Facility verticals on one engine" },
      { value: "10", label: "Countries, 8 tax regimes, multi-currency" },
      { value: "2-way", label: "WhatsApp booking with an AI agent" },
    ],
    testimonial: {
      quote:
        "We replaced four disconnected systems with FlowZa Club. Members book courts and dining over WhatsApp, every charge flows to one ledger that actually ties out, and monthly reconciliation finally takes an afternoon instead of a week.",
      name: "Rohan Mehta",
      role: "General Manager",
      company: "Whitefield Golf & Country Club",
      initials: "RM",
    },
    /* rentflow over spamaster: both Club and RentFlow are recurring,
       access-controlled relationships (member <-> club, tenant <-> unit) —
       a closer thematic pair than spa scheduling. */
    related: ["finance", "pos", "rentflow"],
  },
  {
    ...PLATFORM_NAV_MAP.rentflow,
    cardDescription:
      "Collect, screen and approve tenant applications in one trackable pipeline — no email threads.",
    description:
      "Collect, screen and approve tenant applications without the back-and-forth of emails and spreadsheets.",
    longDescription:
      "FlowZa RentFlow turns rental applications into a simple, trackable process. Every application — from first submission to final decision — lives in one dashboard, so you always know who's applying, where they stand, and what's left to check.",
    badges: ["Tenant screening", "Bulk actions", "One dashboard"],
    cardBadges: ["Screening", "Bulk actions", "Searchable"],
    features: [
      {
        icon: LayoutGrid,
        title: "One Dashboard for Every Application",
        description:
          "See all applications at a glance, filtered by status: pending review, under screening, approved, rejected or withdrawn.",
      },
      {
        icon: Shield,
        title: "Built-In Tenant Screening",
        description:
          "Run credit checks, background checks, eviction history, income verification and reference checks without leaving the app.",
      },
      {
        icon: BadgeCheck,
        title: "Fast Decisions",
        description:
          "Approve or reject applications in a click, with reasons recorded automatically for your records.",
      },
      {
        icon: Layers,
        title: "Bulk Actions",
        description:
          "Move multiple applications through the pipeline at once when you're managing high application volume.",
      },
      {
        icon: Search,
        title: "Searchable Records",
        description: "Find any applicant instantly by name, email or application ID.",
      },
    ],
    steps: [
      {
        title: "Collect",
        description:
          "Applications arrive in one dashboard instead of an inbox — every submission tracked from the moment it lands, with nothing to copy into a spreadsheet.",
      },
      {
        title: "Screen",
        description:
          "Run credit, background, eviction-history, income and reference checks in the app, and watch each application move from pending review to under screening.",
      },
      {
        title: "Decide",
        description:
          "Approve or reject in a click with the reason recorded automatically, and use bulk actions to clear a backlog when volume spikes.",
      },
    ],
    stats: [
      { value: "5", label: "Screening checks built in" },
      { value: "5", label: "Pipeline statuses, pending through withdrawn" },
      { value: "1-click", label: "Approve or reject, reason recorded" },
      { value: "Bulk", label: "Move many applications at once" },
    ],
    related: ["finance", "club", "qrforge"],
  },
  {
    ...PLATFORM_NAV_MAP.pms,
    cardDescription:
      "The full performance loop — KRA/KPI cycles, bell-curve calibration and succession — linked to pay.",
    description:
      "FlowZa PMS runs the full performance loop — KRA/KPI cycles, bell-curve calibration and succession — then links every rating to a compensation engine that knows your country's statutory rules.",
    longDescription:
      "One loop, four steps: rate, calibrate, decide pay and document — without leaving the platform. FlowZa PMS carries a review cycle from self, manager and reviewer stages through a recorded calibration session, resolves the resulting pay against your country's salary structures and statutory rules, and issues an approved letter a third party can verify as authentic.",
    badges: ["KRA/KPI + bell curve", "Compensation engine", "Verifiable letters"],
    cardBadges: ["Bell curve", "Compensation", "Verifiable letters"],
    features: [
      {
        icon: Target,
        title: "KRA/KPI Cycles, Multi-Stage",
        description:
          "Self, manager and reviewer stages across KRA/KPI cycles. Score per-KPI or as one consolidated stage score, with succession planning on the same cycle.",
      },
      {
        icon: BarChart2,
        title: "Bell-Curve Calibration",
        description:
          "Compare ratings against a distribution with a bell curve and recorded calibration sessions, so a rating is defensible rather than a matter of who rated hardest.",
      },
      {
        icon: SlidersHorizontal,
        title: "Local Pay, Without a Custom Build",
        description:
          "Salary structures, statutory rules and increment strategies are data-driven — add a country by adding configuration, not code. Increments preserve an employee's component structure instead of resetting it on every raise.",
      },
      {
        icon: Signature,
        title: "Letters Anyone Can Verify",
        description:
          "Every letter is approved, signed with your organization's key, and checkable by a third party from a public verification page — no more disputed offer or experience letters.",
      },
      {
        icon: Scale,
        title: "Conduct Compliance That Configures Itself",
        description:
          "Respect at Work resolves your obligations by jurisdiction — POSH in India, labour-law conduct duties in the GCC — with policy, training, committee and complaint workflow built in.",
      },
      {
        icon: Globe,
        title: "Local Currency, Local Statutory Rules",
        description:
          "India (EPF, ESI, Professional Tax, gratuity, POSH), the UAE and Saudi Arabia and Oman (end-of-service computation per legal entity, plus workforce data for Saudization and Omanization reporting) — each priced and computed in its own currency, not in dollars.",
      },
      {
        icon: Database,
        title: "Your Data, In Your Region",
        description:
          "Per-tenant isolation enforced at the database, not the application layer, with region-configurable hosting so your data stays where your policy says it should — and export any time, with no lock-in.",
      },
    ],
    steps: [
      {
        title: "Rate",
        description:
          "Self, manager and reviewer stages across KRA/KPI cycles. Score per-KPI or as one consolidated stage score.",
      },
      {
        title: "Calibrate",
        description:
          "Compare ratings against a distribution with bell curve and recorded calibration sessions.",
      },
      {
        title: "Pay",
        description:
          "The compensation engine resolves salary structure and statutory deductions for the employee's country. GCC wage-protection figures are computed today; bank-file (WPS) export is on the roadmap.",
      },
      {
        title: "Document",
        description:
          "Generate an approved letter that anyone can verify as authentic from a public page.",
      },
    ],
    stats: [
      { value: "4", label: "Markets computed in local currency" },
      { value: "4", label: "Loop stages: rate, calibrate, pay, document" },
      { value: "Public", label: "Letter verification a third party can check" },
      { value: "Config", label: "New country by configuration, not code" },
    ],
    related: ["finance", "rentflow", "club"],
  },
];

export const PLATFORM_MAP: Record<PlatformSlug, Platform> = Object.fromEntries(
  PLATFORMS.map((p) => [p.slug, p]),
) as Record<PlatformSlug, Platform>;

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORM_MAP[slug as PlatformSlug];
}
