import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

/**
 * Primary face — display through body. Variable (wght 400–700), self-hosted by next/font.
 */
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

/**
 * Data voice — eyebrows, stat numerals, badges. A nod to the IBM Plex heritage
 * of the previous FlowZa site.
 */
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});
