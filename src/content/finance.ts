import {
  Banknote,
  BarChart2,
  Calendar,
  CreditCard,
  FileText,
  Fingerprint,
  Hash,
  IdCard,
  Landmark,
  Mail,
  MessageCircle,
  Package,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Upload,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/** FlowZa Finance flagship-page content (migrated from the retired /finance demo page). */

export interface FinanceScreenshot {
  id: string;
  label: string;
  sub: string;
  description: string;
  bullets: string[];
  src: string;
}

export const FINANCE_SHOWCASE = {
  badge: "Product Tour",
  title: "Everything Your Business Needs",
  /* Deliberately not numbered — the count tracks FINANCE_SCREENSHOTS and drifted once already. */
  subtitle: "Every module, unified in one intelligent platform.",
  urlBar: "finance.flowza.ai",
} as const;

export const FINANCE_SCREENSHOTS: FinanceScreenshot[] = [
  {
    id: "dashboard",
    label: "Financial Dashboard",
    sub: "Real-time analytics",
    description: "Real-time overview of receivables, payables, income & expenses",
    bullets: [
      "Total Receivable tracking",
      "Income & Expense charts",
      "Top customers view",
      "Cash flow monitoring",
    ],
    src: "/images/finance/dashboard.webp",
  },
  {
    id: "pnl",
    label: "Profit & Loss",
    sub: "Performance analysis",
    description: "Comprehensive P&L reports with financial performance analysis",
    bullets: [
      "Revenue breakdown",
      "Gross profit margins",
      "Operating expenses",
      "Net profit analysis",
    ],
    src: "/images/finance/pnl.webp",
  },
  {
    id: "items",
    label: "Items Catalog",
    sub: "112+ items tracked",
    description: "Complete inventory management with pricing and stock levels",
    bullets: [
      "112+ item catalog",
      "SKU management",
      "Sale & purchase pricing",
      "Stock level tracking",
    ],
    src: "/images/finance/items.webp",
  },
  {
    id: "invoices-expenses",
    label: "Invoices & Expenses",
    sub: "Bank sync built in",
    description: "Manage invoices, track expenses, monitor bank accounts",
    bullets: [
      "Recent invoice management",
      "Expense tracking",
      "Bank account sync",
      "Sales activity overview",
    ],
    src: "/images/finance/invoices-expenses.webp",
  },
  {
    id: "purchase-orders",
    label: "Purchase Orders",
    sub: "Vendor billing",
    description: "Manage vendor purchase orders from issuance through billing and payment",
    bullets: [
      "PO to bill lifecycle",
      "Vendor management",
      "Billed / Received / Draft status",
      "Payment status tracking",
    ],
    src: "/images/finance/purchase-orders.webp",
  },
  {
    id: "projects",
    label: "Project Management",
    sub: "Budget & status",
    description: "Link projects to customers, quotes, and budgets in one view",
    bullets: [
      "Project status pipeline",
      "Budget vs actuals",
      "Customer linkage",
      "Draft to Completed workflow",
    ],
    src: "/images/finance/projects.webp",
  },
  {
    id: "quotes",
    label: "Quotes Pipeline",
    sub: "Convert to SO",
    description: "Convert quotes to sales orders with a single click",
    bullets: [
      "22+ quote tracking",
      "SO conversion status",
      "Accepted / Declined / Expired",
      "Expiry date alerts",
    ],
    src: "/images/finance/quotes.webp",
  },
  {
    id: "invoices",
    label: "Invoices Management",
    sub: "Track & collect",
    description: "End-to-end invoice tracking with real-time payment status",
    bullets: [
      "17+ invoice management",
      "Partial / Paid / Overdue flags",
      "Balance outstanding view",
      "Due date reminders",
    ],
    src: "/images/finance/invoices.webp",
  },
  {
    id: "invoice-workflow",
    label: "Invoice Workflow",
    sub: "QT→SO→INV→PAY",
    description: "Visual audit trail from quote to payment in one document view",
    bullets: [
      "QT → SO → INV → PAY chain",
      "Partially paid status",
      "Document & Details tabs",
      "Linked reference tracking",
    ],
    src: "/images/finance/invoice-workflow.webp",
  },
  {
    id: "vat-compliance",
    label: "Tax & Compliance",
    sub: "OTA VAT returns",
    description:
      "Generate and file VAT returns with auto-computed box values, and keep the history",
    bullets: [
      "OTA VAT return generation",
      "Auto-computed box values",
      "Filing status tracking",
      "Downloadable return PDFs",
    ],
    src: "/images/finance/vat-compliance.webp",
  },
];

export interface FinanceModule {
  icon: LucideIcon;
  title: string;
  hook: string;
  points: string[];
}

export const FINANCE_MODULES_SECTION = {
  badge: "The whole back office",
  /* Split so the component can render "Accounting" in the accent, per mockup. */
  title: "Far More Than",
  titleHighlight: "Accounting",
  subtitle:
    "FinanceOS replaces the five tools you're stitching together — sales, purchases, inventory, accounting, payroll and HR, unified on one ledger.",
} as const;

export const FINANCE_MODULES: FinanceModule[] = [
  {
    icon: ShoppingCart,
    title: "Sales & Receivables",
    hook: "From quote to cash, every step linked.",
    points: [
      "Quotes → Orders → Invoices → Delivery",
      "Recurring, proforma & B2B/B2C invoicing",
      "Credit notes & payment allocation",
      "E-way bills & branded PDF templates",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Purchases & Payables",
    hook: "Control every unit of spend.",
    points: [
      "Purchase orders with partial billing",
      "3-way matching (PO ↔ GRN ↔ Bill)",
      "Vendor credits & recurring bills",
      "Bills of entry for imports",
    ],
  },
  {
    icon: Package,
    title: "Inventory & Stock",
    hook: "Stock and books, always in sync.",
    points: [
      "Perpetual inventory & automatic COGS",
      "Weighted Average Cost (WAC)",
      "Serial tracking & multi-location",
      "Bundles, reorder alerts & warranty",
    ],
  },
  {
    icon: Landmark,
    title: "Accounting & Banking",
    hook: "Audit-ready books that check themselves.",
    points: [
      "Double-entry chart of accounts",
      "Journals, divisions & period locks",
      "Bank management & reconciliation",
      "Nightly sub-ledger vs GL drift checks",
    ],
  },
  {
    icon: Users,
    title: "Payroll",
    hook: "Compliant payroll in minutes.",
    points: [
      "Salary structures & payslips",
      "Form 16, ESI, PT, TDS & WPS files",
      "Overtime, arrears & loans",
      "Earned Wage Access (on-demand pay)",
    ],
  },
  {
    icon: IdCard,
    title: "HR Suite (HRMS)",
    hook: "Hire-to-retire, all in one place.",
    points: [
      "Recruitment / ATS & onboarding",
      "Leave, attendance & shift scheduling",
      "Performance, engagement & timesheets",
      "Employee self-service portal",
    ],
  },
  {
    icon: BarChart2,
    title: "Reporting & Analytics",
    hook: "Every number, one click away.",
    points: [
      "40+ financial & operational reports",
      "Export to PDF, Excel, CSV & print",
      "P&L, balance sheet, cash flow & aging",
      "AI-powered dashboard narratives",
    ],
  },
  {
    icon: FileText,
    title: "Documents & PDF",
    hook: "On-brand documents, no designer needed.",
    points: [
      "7-tab visual template editor",
      "9 presets incl. Tally Classic",
      "Logos, watermarks & QR codes",
      "Configurable email templates",
    ],
  },
];

export interface FinanceCountry {
  flag: string;
  name: string;
  points: string[];
}

export const FINANCE_COMPLIANCE_SECTION = {
  badge: "Multi-country compliance",
  title: "Compliant in India and the Gulf — Out of the Box",
  subtitle:
    "Country-specific tax engines, chart-of-accounts packs and statutory payroll. Not bolt-ons — built in.",
} as const;

export const FINANCE_COUNTRIES: FinanceCountry[] = [
  {
    flag: "🇮🇳",
    name: "India",
    points: [
      "GST — CGST / SGST / IGST / RCM",
      "E-way bills & GST returns",
      "TDS & ITC ledger tracking",
    ],
  },
  {
    flag: "🇦🇪",
    name: "UAE",
    points: ["VAT 5% engine", "Corporate Tax 9%", "WPS payroll bank files"],
  },
  {
    flag: "🇴🇲",
    name: "Oman",
    points: ["VAT 5% engine", "Social insurance payroll", "Country-specific CoA pack"],
  },
  {
    flag: "🇸🇦",
    name: "Saudi",
    points: ["GOSI payroll", "Arabic / RTL documents", "Roadmap-ready for more GCC"],
  },
];

export const FINANCE_INTEGRATIONS_SECTION = {
  badge: "Integrations",
  title: "Connect the Tools You Already Use",
  subtitle:
    "Stripe, PayPal, WhatsApp, Slack, email and biometric devices — plus a one-click wizard to migrate from Zoho. Then let automation handle the routine.",
} as const;

export const FINANCE_INTEGRATIONS: { name: string; icon: LucideIcon }[] = [
  { name: "Stripe", icon: CreditCard },
  { name: "PayPal", icon: Wallet },
  { name: "WhatsApp Business", icon: MessageCircle },
  { name: "Slack", icon: Hash },
  { name: "Email / SMTP", icon: Mail },
  { name: "Biometric devices", icon: Fingerprint },
  { name: "Zoho import", icon: Upload },
  { name: "Calendar sync", icon: Calendar },
];

export const FINANCE_SECURITY_SECTION = {
  badge: "Security & trust",
  title: "Bank-Grade Security on Every Action",
  subtitle:
    "MFA, granular permissions, complete audit logs and tenant-isolated data — your books are safe.",
} as const;

export const FINANCE_SECURITY: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: ShieldCheck, title: "MFA & AAL2", description: "Step-up auth for sensitive actions" },
  { icon: Fingerprint, title: "Role-based access", description: "Granular, custom permissions" },
  {
    icon: Landmark,
    title: "Row-level isolation",
    description: "Tenant data separated at the database",
  },
  {
    icon: FileText,
    title: "Complete audit trail",
    description: "Append-only logs on every action",
  },
  { icon: Banknote, title: "Soft-delete & recovery", description: "Nothing is ever silently lost" },
  {
    icon: Mail,
    title: "Data export & erasure",
    description: "Full export and deletion on request",
  },
];
