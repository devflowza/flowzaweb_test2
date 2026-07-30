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

export const OFFICES: OfficeLocation[] = [
  {
    label: "Head Office",
    city: "Bengaluru",
    country: "India",
    entity: "CloudValley Solutions OPC Pvt Ltd",
    addressLines: ["Sai Sree Layout, Parappana Agrahara,", "Bengaluru, Karnataka, India"],
    accent: "#f59e0b",
    image: {
      src: "/images/photos/location-bengaluru.webp",
      alt: "Bengaluru at sunset — glass office towers rising out of dense green tree cover, the sky washed orange behind the skyline.",
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
      src: "/images/photos/location-muscat.webp",
      alt: "Muscat at dusk — the Grand Mosque's dome and minaret lit warm against the Hajar mountains, white low-rise city all around.",
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
      src: "/images/photos/location-dubai.webp",
      alt: "The Dubai skyline at golden hour, the Burj Khalifa rising at its centre above downtown towers and highway interchanges.",
    },
  },
];
