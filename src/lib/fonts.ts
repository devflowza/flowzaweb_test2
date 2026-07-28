import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * The reference uses Plus Jakarta Sans as its single family, relying on weight
 * rather than a second face for hierarchy: 200 for lede copy, 300 for body,
 * 500 for headings, 600 for emphasis and nav.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});
