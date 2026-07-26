import { Award, Globe, Heart, RefreshCw, Target, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ABOUT_HERO = {
  badge: "Our Story",
  title: "Built to Transform",
  titleHighlight: "Every Business",
  subtitle:
    "FlowZa AI was founded on the belief that powerful AI tools shouldn't be reserved for enterprises with nine-figure budgets. We build for the rest.",
} as const;

export const ABOUT_STATS = [
  { value: "100+", label: "Businesses Served" },
  { value: "MEA", label: "Region & India" },
  { value: "7", label: "AI Platforms" },
  { value: "99.9%", label: "Uptime SLA" },
] as const;

export const ABOUT_MISSION = {
  badge: "Our Mission",
  title: "AI that works the way your business does",
  paragraphs: [
    "Most software is built for an imaginary average customer. We build for real people — the spa owner managing 12 staff, the logistics company tracking 400 vehicles, the restaurant running a distributed POS network.",
    "Seven purpose-built platforms. One unified vision. FlowZa AI is the operating system for businesses that refuse to stay behind.",
  ],
  floatingBadge: {
    title: "Growing Fast",
    subtitle: "50+ team members across 6 cities",
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
