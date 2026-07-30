import {
  Award,
  BarChart2,
  Globe,
  Heart,
  Layers,
  LayoutGrid,
  RefreshCw,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** Copy for /about, matched to the mockups in Photos/About Page. */

export const ABOUT_HERO = {
  badge: "Our Story",
  title: "Built to Transform",
  titleHighlight: "Every Business",
  subtitle:
    "FlowZa AI was founded on the belief that powerful AI tools shouldn't be reserved for enterprises with nine-figure budgets.",
  subtitleBold: "We build for the rest.",
  dataLayerCard: {
    lead: "One Data Layer.",
    tail: "Endless Possibilities.",
    body: "Nine platforms. One shared data layer. Your data moves between them seamlessly without re-entry — saving time, reducing errors, and driving real-time intelligence across your operations.",
  },
  ecosystemStrip: "One connected ecosystem. Real-time insights. Smarter decisions.",
} as const;

export interface AboutStat {
  value: string;
  label: string;
  icon: LucideIcon;
  /** Mockup renders the count in ink and the rest in green. */
  tone: "ink" | "green";
}

export const ABOUT_STATS: AboutStat[] = [
  { value: "100+", label: "Businesses Served", icon: Users, tone: "ink" },
  { value: "MEA", label: "Region & India", icon: Globe, tone: "green" },
  { value: "9", label: "AI Platforms", icon: Layers, tone: "green" },
  { value: "99.9%", label: "Uptime SLA", icon: ShieldCheck, tone: "green" },
];

export interface MissionMiniFeature {
  icon: LucideIcon;
  title: string;
}

export const ABOUT_MISSION = {
  badge: "Our Mission",
  title: "AI that works the way your business does",
  /* The mockup's "the ones owning pizzerias" is swapped for the spa owner —
     FlowZa actually ships a spa platform, and the mockup line tied to nothing. */
  paragraphs: [
    "Most software is built for an industry average customer. We build for real people — the spa owner managing 12 staff, the logistics company tracking 400 vehicles, the restaurant running a distributed POS network.",
    "Nine purpose-built platforms. One unified vision. FlowZa AI is the operating system for businesses that refuse to stay behind.",
  ],
  miniFeatures: [
    { icon: Users, title: "Built for real businesses" },
    { icon: LayoutGrid, title: "Purpose-built platforms" },
    { icon: BarChart2, title: "Unified by design" },
  ] as MissionMiniFeature[],
  /** Chip row on the dark quote panel, as lettered in the mockup. */
  verticalChips: [
    "Finance",
    "Logistics",
    "Inventory",
    "Fleet",
    "Retail",
    "Hospitality",
    "Services",
    "POS",
    "Analytics",
  ],
  floatingBadge: {
    title: "Growing Fast",
    subtitle: "Trusted by 100+ businesses across India & MEA",
  },
} as const;

export interface CompanyValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ABOUT_VALUES: CompanyValue[] = [
  {
    icon: Target,
    title: "Purpose-Driven",
    description:
      "Every product we build solves a real, tangible business problem. No fluff, no filler.",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    description:
      "Enterprise-grade infrastructure that moves at startup speed — always on, always fast.",
  },
  {
    icon: Heart,
    title: "Customer Obsession",
    description: "We treat every client's success as our own. Their wins are our proudest moments.",
  },
  {
    icon: Award,
    title: "Trust & Transparency",
    description:
      "We earn trust through honest communication, clear SLAs, and accountable execution.",
  },
  {
    icon: Globe,
    title: "Global Thinking",
    description:
      "Built for businesses in the Middle East and beyond, with local nuance in every feature.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    description:
      "AI is never finished. We iterate every week based on real-world feedback and data.",
  },
];
