import {
  Car,
  ClipboardCheck,
  Crown,
  DollarSign,
  Flower2,
  Gauge,
  QrCode,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { ImageSlot } from "@/components/ui/image-frame";

/**
 * Nav-facing platform data: the subset the client-side header, mega-menu and
 * mobile sheet need.
 *
 * Deliberately separate from `products.ts`, which carries every platform's
 * features, steps, stats and testimonials. The header is a client component, so
 * importing the full module there would ship all of that long-form copy to the
 * browser. This file is the single definition of these fields — `products.ts`
 * spreads them into the full records.
 */

export type PlatformSlug =
  | "finance"
  | "logispro"
  | "spamaster"
  | "fleetza"
  | "qrforge"
  | "pos"
  | "club"
  | "rentflow"
  | "pms";

export interface PlatformNav {
  slug: PlatformSlug;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  /** Shorter tagline used on grid tiles, where the full one wraps badly. */
  cardTagline: string;
  /** Bright accent — decorative use only (tints, icon tiles, dots, washes). */
  color: string;
  colorSecondary: string;
  /**
   * Text-safe shade: at least 4.5:1 both as text on white and behind white text.
   * Use this anywhere the accent carries or backs text.
   */
  colorDeep: string;
  icon: LucideIcon;
  appUrl: string;
  live: boolean;
  /**
   * Card / hero photography. Leave `src` unset to render a labelled
   * placeholder; add the path once the shot exists.
   */
  image: ImageSlot;
  /** Existing product screenshot — used where a wide ratio suits. */
  screenshot: ImageSlot;
}

export const PLATFORM_NAV_MAP: Record<PlatformSlug, PlatformNav> = {
  finance: {
    slug: "finance",
    index: "01",
    name: "FlowZa Finance",
    shortName: "Finance",
    tagline: "FinanceOS — All-in-One Accounting & ERP",
    cardTagline: "All-in-one finance & ERP",
    color: "#10b981",
    colorSecondary: "#059669",
    colorDeep: "#047857",
    icon: DollarSign,
    appUrl: "https://finance.flowza.ai",
    live: true,
    image: {
      src: "/images/photos/finance.webp",
      alt: "A laptop on a desk showing the FlowZa Finance dashboard — total balance, a cash-flow chart and paid, pending and overdue invoice counts — with one person's hands at the keyboard",
      focal: "88% center",
    },
    screenshot: {
      src: "/images/photos/finance.webp",
      alt: "The FlowZa Finance dashboard on a laptop in an office, beside a branded mug and notebook, below a wall sign reading Smart finance. Stronger business.",
      focal: "center",
    },
  },
  logispro: {
    slug: "logispro",
    index: "02",
    name: "FlowZa LogisPro",
    shortName: "LogisPro",
    tagline: "Smart Logistics Platform",
    cardTagline: "Smart logistics platform",
    color: "#38bdf8",
    colorSecondary: "#0ea5e9",
    colorDeep: "#0369a1",
    icon: Truck,
    appUrl: "https://logispro.flowza.ai",
    live: false,
    image: {
      src: "/images/photos/logispro.webp",
      alt: "A curtain-side freight truck at a container terminal at sunset, with gantry cranes behind and a shipment-tracking dashboard open on a tablet in the foreground",
      focal: "14% center",
    },
    screenshot: {
      src: "/images/photos/logispro.webp",
      alt: "A worker in a hi-vis jacket, seen from behind at a container terminal at sunset, holding a tablet showing a shipment-tracking dashboard and route map",
      focal: "center",
    },
  },
  spamaster: {
    slug: "spamaster",
    index: "03",
    name: "FlowZa Spa Master",
    shortName: "Spa Master",
    tagline: "Spa & Wellness Management",
    cardTagline: "Spa & wellness management",
    color: "#f43f5e",
    colorSecondary: "#e11d48",
    colorDeep: "#be123c",
    icon: Flower2,
    appUrl: "https://spamaster.flowza.ai",
    live: false,
    image: {
      src: "/images/photos/spamaster.webp",
      alt: "A staff member at a spa reception desk working in the Spa Master dashboard on a monitor, below a wall sign reading SPA MASTER — RELAX. RENEW. REVIVE.",
      focal: "left center",
    },
    screenshot: {
      src: "/images/photos/spamaster.webp",
      alt: "A staff member at a spa reception desk working in the Spa Master dashboard, with appointment and staff-schedule panels on screen",
      focal: "center",
    },
  },
  fleetza: {
    slug: "fleetza",
    index: "04",
    name: "FlowZa Fleetza",
    shortName: "Fleetza",
    tagline: "Fleet Intelligence System",
    cardTagline: "Fleet intelligence system",
    color: "#7c5ff5",
    colorSecondary: "#3730a3",
    colorDeep: "#5b21b6",
    icon: Car,
    appUrl: "https://fleetza.flowza.ai",
    live: false,
    image: {
      src: "/images/photos/fleetza.webp",
      alt: "A phone in a windscreen mount showing the Fleetza app — a route map, a driver score of 87 and today's trip summary — while driving behind a van",
      focal: "center",
    },
    screenshot: {
      src: "/images/photos/fleetza.webp",
      alt: "The Fleetza app on a windscreen-mounted phone showing a live route, driver score and trip distance, with a city skyline ahead",
      focal: "center 12%",
    },
  },
  qrforge: {
    slug: "qrforge",
    index: "05",
    name: "FlowZa QRForge",
    shortName: "QRForge",
    tagline: "Dynamic QR Code Engine",
    cardTagline: "Dynamic QR code engine",
    color: "#f59e0b",
    colorSecondary: "#d97706",
    colorDeep: "#92400e",
    icon: QrCode,
    appUrl: "https://qrforge.flowza.ai",
    live: true,
    image: {
      src: "/images/photos/qrforge.webp",
      alt: "A hand holding a phone to scan a counter standee reading Scan to Check-In, marked Powered by QRForge",
      focal: "center",
    },
    screenshot: {
      src: "/images/photos/qrforge.webp",
      alt: "A check-in QR code on a counter standee being scanned by a phone, the code captured in the phone's viewfinder",
      focal: "center",
    },
  },
  pos: {
    slug: "pos",
    index: "06",
    name: "FlowZa POS",
    shortName: "POS",
    tagline: "Next-Gen Point of Sale",
    cardTagline: "Next-gen point of sale",
    color: "#8b5cf6",
    colorSecondary: "#7c3aed",
    colorDeep: "#6d28d9",
    icon: ShoppingCart,
    appUrl: "https://pos.flowza.ai",
    live: false,
    image: {
      src: "/images/photos/pos-cafe.webp",
      alt: "A hand entering an order on a café POS touchscreen as the receipt prints beside it, with a barista at work behind the counter",
      focal: "center",
    },
    screenshot: {
      src: "/images/photos/pos-retail.webp",
      alt: "A shopper holding a phone to a card reader at a retail counter, with a POS terminal showing the day's sales summary",
      focal: "center",
    },
  },
  club: {
    slug: "club",
    index: "07",
    name: "FlowZa Club",
    shortName: "Club",
    tagline: "Membership, Booking & Billing for Clubs",
    cardTagline: "Club & membership management",
    color: "#9333ea",
    colorSecondary: "#6b21a8",
    colorDeep: "#7e22ce",
    icon: Crown,
    appUrl: "https://club.flowza.ai",
    live: true,
    image: {
      src: "/images/photos/club.webp",
      alt: "A tablet on a sports-club reception desk showing FlowZa Club — court and class booking options and upcoming member events — beside a branded bottle and towel",
      focal: "85% center",
    },
    screenshot: {
      src: "/images/photos/club.webp",
      alt: "A FlowZa Club standee and a tablet at a racquet-club reception, showing booking options and upcoming member events",
      focal: "center 85%",
    },
  },
  rentflow: {
    slug: "rentflow",
    index: "08",
    name: "FlowZa RentFlow",
    shortName: "RentFlow",
    tagline: "Rental Applications, Handled in One Place",
    cardTagline: "Tenant applications & screening",
    color: "#14b8a6",
    colorSecondary: "#0d9488",
    colorDeep: "#0f766e",
    icon: ClipboardCheck,
    appUrl: "https://rentflow.flowza.ai",
    live: true,
    image: {
      src: "/images/photos/rentflow.webp",
      alt: "A hand holding a tablet showing the FlowZa RentFlow application list — Approved and Under Review status pills beside three applicants — in a leasing office with a blurred Now Leasing sign behind",
      focal: "85% center",
    },
    screenshot: {
      src: "/images/photos/rentflow-review.webp",
      alt: "A laptop showing a single FlowZa RentFlow application — screening documents, an application score of 720, and Approve, Request More Info and Decline actions — beside a window with a For Rent sign",
      focal: "center 40%",
    },
  },
  pms: {
    slug: "pms",
    index: "09",
    name: "FlowZa PMS",
    shortName: "PMS",
    /* No em-dash: the page-title template is `{name} — {tagline} — FlowZa AI`,
       and a third dash inside the tagline reads badly in SERPs. */
    tagline: "Rate, Calibrate and Pay on One System",
    cardTagline: "Performance & compensation",
    color: "#6366f1",
    colorSecondary: "#4f46e5",
    colorDeep: "#4338ca",
    icon: Gauge,
    appUrl: "https://pms.flowza.ai",
    live: true,
    image: {
      src: "/images/photos/pms.webp",
      alt: "A laptop showing the FlowZa PMS Performance Calibration screen — a bell curve with individual ratings plotted, plus summary charts below — with a colleague visible in a meeting room behind",
      focal: "30% center",
    },
    screenshot: {
      src: "/images/photos/pms-verify.webp",
      alt: "A hand holding a phone showing a Verified checkmark screen, held in front of a laptop showing the FlowZa PMS Review Cycle dashboard with a ratings donut chart",
      focal: "center 25%",
    },
  },
};

export const PLATFORM_NAV: PlatformNav[] = [
  PLATFORM_NAV_MAP.finance,
  PLATFORM_NAV_MAP.logispro,
  PLATFORM_NAV_MAP.spamaster,
  PLATFORM_NAV_MAP.fleetza,
  PLATFORM_NAV_MAP.qrforge,
  PLATFORM_NAV_MAP.pos,
  PLATFORM_NAV_MAP.club,
  PLATFORM_NAV_MAP.rentflow,
  PLATFORM_NAV_MAP.pms,
];

export const PLATFORM_SLUGS: PlatformSlug[] = PLATFORM_NAV.map((p) => p.slug);
