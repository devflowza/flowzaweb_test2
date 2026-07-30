import type { ImageSlot } from "@/components/ui/image-frame";

export interface OfficeLocation {
  label: string;
  city: string;
  country: string;
  entity: string;
  addressLines: string[];
  accent: string;
  /** Map plate for this office, tinted with `accent`. */
  image: ImageSlot;
}

export const LOCATIONS_PAGE = {
  badge: "Office Locations",
  title: "Wherever You Are,",
  titleHighlight: "We're There Too",
  subtitle:
    "FlowZa operates globally with offices strategically positioned across India and the Middle East. Connect with our teams across three major hubs.",
  image: {
    src: "/images/pages/locations.webp",
    alt: "Dot-matrix map of the Middle East and India with the three FlowZa hubs marked — Dubai, Muscat and Bengaluru — linked by dashed flight paths.",
  },
} as const;

export const OFFICES: OfficeLocation[] = [
  {
    label: "Head Office",
    city: "Bengaluru",
    country: "India",
    entity: "CloudValley Solutions OPC Pvt Ltd",
    addressLines: ["Sai Sree Layout, Parappana Agrahara,", "Bengaluru, Karnataka, India"],
    accent: "#f59e0b",
    image: {
      src: "/images/pages/locations-bengaluru.webp",
      alt: "Street-plan illustration of the Bengaluru head office neighbourhood — city blocks, two lakes and green parks, with a pin on the office.",
    },
  },
  {
    label: "Development Center",
    city: "Muscat",
    country: "Oman",
    entity: "SoarTek LLC",
    addressLines: ["Near Centara Hotel,", "Ghala, Muscat,", "Oman"],
    accent: "#10b981",
    image: {
      src: "/images/pages/locations-muscat.webp",
      alt: "Street-plan illustration of the Muscat development centre neighbourhood — city blocks running down to the coastline, with a pin on the office.",
    },
  },
  {
    label: "Other Locations",
    city: "Dubai",
    country: "United Arab Emirates",
    entity: "",
    addressLines: [
      "National Insurance Building, Office 603,",
      "Opposite Deira City Center, Deira,",
      "Dubai, United Arab Emirates",
    ],
    accent: "#2563eb",
    image: {
      src: "/images/pages/locations-dubai.webp",
      alt: "Street-plan illustration of the Deira, Dubai office neighbourhood — city blocks either side of the creek, with a pin on the office.",
    },
  },
];

export const LOCATION_HIGHLIGHTS = [
  {
    title: "Diverse Teams",
    description: "50+ talented professionals united by a mission to transform business operations.",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock availability across all time zones, WhatsApp-first — reach a human, not a ticket queue.",
  },
] as const;
