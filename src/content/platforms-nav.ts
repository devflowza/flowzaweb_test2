import {
  Car,
  Crown,
  DollarSign,
  Flower2,
  QrCode,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from "lucide-react";

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
  "finance" | "logispro" | "spamaster" | "fleetza" | "qrforge" | "pos" | "club";

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
  image: string;
  imageAlt: string;
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
    image: "/images/products/finance.webp",
    imageAlt: "FlowZa Finance dashboard showing real-time accounting and ERP data",
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
    image: "/images/products/logispro.webp",
    imageAlt: "FlowZa LogisPro live shipment map with optimized delivery routes",
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
    image: "/images/products/spamaster.webp",
    imageAlt: "FlowZa Spa Master booking calendar and staff schedule view",
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
    image: "/images/products/fleetza.webp",
    imageAlt: "FlowZa Fleetza live fleet map with vehicle telemetry",
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
    live: false,
    image: "/images/products/qrforge.webp",
    imageAlt: "FlowZa QRForge campaign dashboard with scan analytics",
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
    image: "/images/products/pos.webp",
    imageAlt: "FlowZa POS register screen with product grid and cart",
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
    image: "/images/products/club.svg",
    imageAlt: "FlowZa Club membership and facility booking overview",
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
];

export const PLATFORM_SLUGS: PlatformSlug[] = PLATFORM_NAV.map((p) => p.slug);
