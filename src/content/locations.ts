export interface OfficeLocation {
  label: string;
  city: string;
  country: string;
  entity: string;
  addressLines: string[];
  accent: string;
}

export const LOCATIONS_PAGE = {
  badge: "Office Locations",
  title: "Wherever You Are,",
  titleHighlight: "We're There Too",
  subtitle:
    "FlowZa operates globally with offices strategically positioned across India and the Middle East. Connect with our teams across three major hubs.",
} as const;

export const OFFICES: OfficeLocation[] = [
  {
    label: "Head Office",
    city: "Bengaluru",
    country: "India",
    entity: "CloudValley Solutions OPC Pvt Ltd",
    addressLines: ["Sai Sree Layout, Parappana Agrahara,", "Bengaluru, Karnataka, India"],
    accent: "#f59e0b",
  },
  {
    label: "Development Center",
    city: "Muscat",
    country: "Oman",
    entity: "SoarTek LLC",
    addressLines: ["Near Centara Hotel,", "Ghala, Muscat,", "Oman"],
    accent: "#10b981",
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
