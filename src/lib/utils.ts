import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge can't tell a custom `text-*` size token from a custom `text-*`
 * colour token, so without this it treats `text-h2` and `text-ink` as
 * conflicting and silently drops one — headings would fall back to 16px.
 * Registering both groups keeps size and colour independent.
 */
const FONT_SIZES = [
  "hero",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "body",
  "lede",
  "caption",
  "micro",
] as const;

const TEXT_COLORS = [
  "ink",
  "ink-soft",
  "gray",
  "gray-soft",
  "accent",
  "accent-deep",
  "accent-lime",
  "accent-mint",
  "dark",
  "whatsapp",
  "line",
  "line-soft",
  "surface",
  "surface-tint",
  "surface-mint",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZES] }],
      "text-color": [{ text: [...TEXT_COLORS] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
