/**
 * Page imagery pipeline: renders the illustrations used by the pages that have
 * no photography of their own (about, contact, locations, get-started,
 * help, docs, status, legal, 404).
 *
 * These are composed here rather than shot or sourced, so every one is drawn
 * from the same tokens as `src/styles/globals.css` — same accent ramp, same card
 * radius, same 28px grid the ImageFrame placeholder uses — and re-running this
 * script after a token change regenerates the whole set consistently.
 *
 * Deliberately text-free: a headline baked into a raster can't be translated,
 * re-cropped or read by a screen reader, so copy stays in the DOM and the
 * artwork carries structure only. Bars stand in for text the way a UI skeleton
 * does.
 *
 * Run: npm run generate:page-images
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(import.meta.dirname, "../public/images/pages");

/* -------------------------------------------------------------------------- */
/* Tokens — mirrored from globals.css @theme                                  */
/* -------------------------------------------------------------------------- */

const P = {
  ink: "#080808",
  inkSoft: "#121212",
  dark: "#23262f",
  gray: "#5d5e5f",
  graySoft: "#a3a3a4",
  line: "#dadae0",
  lineSoft: "#c4c7c5",
  white: "#ffffff",
  tint: "#fafafa",
  mint: "#f5f7f4",
  accentMint: "#eef5f0",
  accent: "#40b657",
  accentDeep: "#137865",
  accentLime: "#99e558",
  whatsapp: "#25d366",
  /* Per-office and per-platform accents already used in the content layer */
  amber: "#f59e0b",
  emerald: "#10b981",
  blue: "#2563eb",
  violet: "#9333ea",
  cyan: "#0891b2",
  rose: "#e11d48",
};

/* -------------------------------------------------------------------------- */
/* SVG primitives                                                             */
/* -------------------------------------------------------------------------- */

const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");

const el = (name, o = {}, kids) =>
  kids === undefined ? `<${name} ${attrs(o)}/>` : `<${name} ${attrs(o)}>${kids}</${name}>`;

const rect = (o) => el("rect", o);
const circle = (o) => el("circle", o);
const ellipse = (o) => el("ellipse", o);
const line = (o) => el("line", o);
const pathEl = (o) => el("path", o);
const group = (o, kids) => el("g", o, kids);
const many = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join("");

/** Bars standing in for text — the UI-skeleton idiom, so no font is needed. */
function textLines({ x, y, widths, h = 9, gap = 13, fill = P.line, opacity }) {
  return widths
    .map((w, i) => rect({ x, y: y + i * (h + gap), width: w, height: h, rx: h / 2, fill, opacity }))
    .join("");
}

/** Floating white panel in the site's card radius and elevation. */
function card({ x, y, w, h, r = 26, fill = P.white, stroke = P.line, shadow = "shadowSoft" }) {
  return rect({
    x,
    y,
    width: w,
    height: h,
    rx: r,
    fill,
    stroke,
    "stroke-width": stroke ? 1 : undefined,
    filter: shadow ? `url(#${shadow})` : undefined,
  });
}

/** Rounded icon plate — the `size-10 rounded-xl bg-accent-mint` motif. */
function iconTile({
  x,
  y,
  size = 44,
  r = 14,
  bg = P.accentMint,
  glyph: name,
  color = P.accentDeep,
}) {
  return (
    rect({ x, y, width: size, height: size, rx: r, fill: bg }) +
    (name ? glyph(name, { x: x + size * 0.22, y: y + size * 0.22, size: size * 0.56, color }) : "")
  );
}

const GLYPHS = {
  check: pathEl({ d: "M4 12.5l5 5L20 6.5" }),
  pin:
    pathEl({ d: "M12 22c4.4-5.4 7-8.7 7-11.6A7 7 0 0 0 5 10.4C5 13.3 7.6 16.6 12 22z" }) +
    circle({ cx: 12, cy: 10, r: 2.6 }),
  search: circle({ cx: 10.5, cy: 10.5, r: 6.5 }) + pathEl({ d: "M15.5 15.5L21 21" }),
  chevron: pathEl({ d: "M6 9.5l6 6 6-6" }),
  lock:
    rect({ x: 4.5, y: 10.5, width: 15, height: 9.5, rx: 2.5 }) +
    pathEl({ d: "M8 10.5V7.5a4 4 0 0 1 8 0v3" }),
  clock: circle({ cx: 12, cy: 12, r: 8.5 }) + pathEl({ d: "M12 7v5.3l3.8 2.2" }),
  shield: pathEl({ d: "M12 3l7.5 3v5.3c0 5-3.2 8.7-7.5 10.2C7.7 20 4.5 16.3 4.5 11.3V6L12 3z" }),
  arrow: pathEl({ d: "M5 12h13" }) + pathEl({ d: "M13 6l6 6-6 6" }),
  spark: pathEl({ d: "M12 3l2.2 5.9L20 11l-5.8 2.1L12 19l-2.2-5.9L4 11l5.8-2.1L12 3z" }),
  message: pathEl({
    d: "M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16H9l-4.5 4V6.5z",
  }),
  book:
    pathEl({ d: "M4.5 5.5A1.5 1.5 0 0 1 6 4h4.5v16H6a1.5 1.5 0 0 1-1.5-1.5v-13z" }) +
    pathEl({ d: "M19.5 5.5A1.5 1.5 0 0 0 18 4h-4.5v16H18a1.5 1.5 0 0 0 1.5-1.5v-13z" }),
  pulse: pathEl({ d: "M3 12h4l2.5-6 4 12 2.5-6H21" }),
  globe:
    circle({ cx: 12, cy: 12, r: 8.5 }) +
    ellipse({ cx: 12, cy: 12, rx: 3.6, ry: 8.5 }) +
    pathEl({ d: "M3.6 9.2h16.8M3.6 14.8h16.8" }),
  cookie:
    circle({ cx: 12, cy: 12, r: 8.5 }) +
    circle({ cx: 9.5, cy: 9.8, r: 1.1 }) +
    circle({ cx: 14.4, cy: 11.4, r: 1.1 }) +
    circle({ cx: 10.6, cy: 14.6, r: 1.1 }),
  layers:
    pathEl({ d: "M12 3.5l8 4.2-8 4.2-8-4.2 8-4.2z" }) +
    pathEl({ d: "M4 12.2l8 4.2 8-4.2" }) +
    pathEl({ d: "M4 16.2l8 4.2 8-4.2" }),
  plug: pathEl({ d: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4" }),
  /* Reads as a document at large sizes, where `book` collapses into brackets */
  document:
    pathEl({ d: "M6 3h7.5L19 8.5V21H6V3z" }) +
    pathEl({ d: "M13.5 3v5.5H19" }) +
    pathEl({ d: "M9 12.5h6M9 16h6" }),
};

function glyph(name, { x, y, size = 24, color = P.accentDeep, width = 1.9 }) {
  const s = size / 24;
  return group(
    {
      transform: `translate(${round(x)} ${round(y)}) scale(${round(s, 4)})`,
      fill: "none",
      stroke: color,
      "stroke-width": round(width / s, 3),
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    },
    GLYPHS[name],
  );
}

const round = (n, p = 2) => Number.parseFloat(n.toFixed(p));

/* -------------------------------------------------------------------------- */
/* Shared defs + backdrop                                                     */
/* -------------------------------------------------------------------------- */

/** The 28px lattice the ImageFrame placeholder draws, so the two rhyme. */
const DEFS = `
  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
    <path d="M28 0H0V28" fill="none" stroke="${P.ink}" stroke-opacity="0.045" stroke-width="1"/>
  </pattern>
  <pattern id="gridFine" width="14" height="14" patternUnits="userSpaceOnUse">
    <path d="M14 0H0V14" fill="none" stroke="${P.ink}" stroke-opacity="0.05" stroke-width="1"/>
  </pattern>
  <linearGradient id="page" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="${P.white}"/>
    <stop offset="1" stop-color="${P.mint}"/>
  </linearGradient>
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${P.accentDeep}"/>
    <stop offset="1" stop-color="${P.accent}"/>
  </linearGradient>
  <linearGradient id="lime" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="${P.accent}"/>
    <stop offset="1" stop-color="${P.accentLime}"/>
  </linearGradient>
  <linearGradient id="inkFill" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${P.ink}"/>
    <stop offset="1" stop-color="${P.dark}"/>
  </linearGradient>
  <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${P.white}" stop-opacity="0.9"/>
    <stop offset="1" stop-color="${P.white}" stop-opacity="0"/>
  </linearGradient>
  <radialGradient id="leak">
    <stop offset="0" stop-color="${P.accent}" stop-opacity="0.5"/>
    <stop offset="1" stop-color="${P.accent}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="leakLime">
    <stop offset="0" stop-color="${P.accentLime}" stop-opacity="0.55"/>
    <stop offset="1" stop-color="${P.accentLime}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="leakDeep">
    <stop offset="0" stop-color="${P.accentDeep}" stop-opacity="0.4"/>
    <stop offset="1" stop-color="${P.accentDeep}" stop-opacity="0"/>
  </radialGradient>
  <filter id="shadowSoft" x="-30%" y="-30%" width="160%" height="180%">
    <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${P.ink}" flood-opacity="0.10"/>
  </filter>
  <filter id="shadowLift" x="-40%" y="-40%" width="180%" height="200%">
    <feDropShadow dx="0" dy="20" stdDeviation="26" flood-color="#0a1c10" flood-opacity="0.16"/>
  </filter>
  <filter id="shadowChip" x="-60%" y="-60%" width="220%" height="240%">
    <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#001304" flood-opacity="0.22"/>
  </filter>
  <filter id="glowBrand" x="-70%" y="-70%" width="240%" height="240%">
    <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="${P.accentDeep}" flood-opacity="0.38"/>
  </filter>
`;

/**
 * Every scene opens on the same ground: near-white page wash, the 28px lattice,
 * and a green light-leak in a corner — the raster equivalent of `fx-shade`.
 */
function backdrop(w, h, { leak = "bottom-left", tone = "url(#page)", grid = "grid" } = {}) {
  const leaks = {
    "bottom-left": { cx: w * 0.06, cy: h * 1.02, r: h * 0.85, id: "leak" },
    "top-right": { cx: w * 0.94, cy: -h * 0.06, r: h * 0.8, id: "leakLime" },
    "bottom-right": { cx: w * 0.96, cy: h * 1.04, r: h * 0.8, id: "leak" },
    "top-left": { cx: w * 0.05, cy: -h * 0.05, r: h * 0.8, id: "leakDeep" },
  };
  const l = leaks[leak] ?? leaks["bottom-left"];
  return (
    rect({ width: w, height: h, fill: tone }) +
    rect({ width: w, height: h, fill: `url(#${grid})` }) +
    circle({ cx: round(l.cx), cy: round(l.cy), r: round(l.r), fill: `url(#${l.id})` })
  );
}

/**
 * The overlapping stat chip used on the /about mission card — reused across
 * scenes so the set reads as one family.
 */
function floatingChip({
  x,
  y,
  w = 250,
  h = 84,
  glyph: name = "spark",
  color = P.accentDeep,
  bg = P.accentMint,
}) {
  return group(
    {},
    card({ x, y, w, h, r: 20, shadow: "shadowChip" }) +
      iconTile({ x: x + 18, y: y + (h - 42) / 2, size: 42, r: 13, bg, glyph: name, color }) +
      textLines({
        x: x + 74,
        y: y + h / 2 - 16,
        widths: [w - 100, (w - 100) * 0.62],
        h: 9,
        gap: 12,
      }) +
      rect({
        x: x + 74,
        y: y + h / 2 - 16,
        width: (w - 100) * 0.8,
        height: 9,
        rx: 4.5,
        fill: P.inkSoft,
        opacity: 0.75,
      }),
  );
}

/* -------------------------------------------------------------------------- */
/* Scenes                                                                     */
/* -------------------------------------------------------------------------- */

/** /locations — three hubs on a dot-matrix map of the Gulf and India. */
function locationsMap(w, h) {
  /* Loose regional blobs; the dot matrix reads as a map without pretending to
     be a survey-accurate one. Coordinates are in a 0-1 space of the plate. */
  const REGIONS = [
    // Arabian peninsula + Levant
    "M0.055,0.28 L0.2,0.18 L0.33,0.2 L0.4,0.31 L0.45,0.5 L0.4,0.66 L0.3,0.74 L0.19,0.66 L0.11,0.5 L0.06,0.38 Z",
    // Iran / central Asia band
    "M0.36,0.1 L0.6,0.06 L0.74,0.14 L0.7,0.28 L0.52,0.32 L0.4,0.26 Z",
    // Indian subcontinent
    "M0.62,0.24 L0.78,0.2 L0.88,0.3 L0.86,0.5 L0.77,0.74 L0.68,0.86 L0.62,0.68 L0.58,0.44 Z",
    // Horn of Africa
    "M0.0,0.62 L0.13,0.6 L0.22,0.78 L0.16,0.95 L0.03,0.92 Z",
  ];

  const plate = { x: w * 0.075, y: h * 0.1, w: w * 0.85, h: h * 0.82 };
  const step = 21;
  const cols = Math.floor(plate.w / step);
  const rows = Math.floor(plate.h / step);

  const dots = many(rows, (r) =>
    many(cols, (c) => {
      const cx = plate.x + step / 2 + c * step;
      const cy = plate.y + step / 2 + r * step;
      return circle({ cx: round(cx), cy: round(cy), r: 2.4, fill: P.accentDeep, opacity: 0.14 });
    }),
  );

  const landDots = many(rows, (r) =>
    many(cols, (c) => {
      const cx = plate.x + step / 2 + c * step;
      const cy = plate.y + step / 2 + r * step;
      return circle({ cx: round(cx), cy: round(cy), r: 3.6, fill: P.accentDeep, opacity: 0.55 });
    }),
  );

  /* Spread far enough apart to stay legible at banner scale — Muscat and Dubai
     are ~340km apart, which at this plate size would put the two markers on top
     of each other. */
  const HUBS = [
    { u: 0.745, v: 0.585, color: P.amber }, // Bengaluru
    { u: 0.36, v: 0.6, color: P.emerald }, // Muscat
    { u: 0.245, v: 0.415, color: P.blue }, // Dubai
  ].map((hub) => ({
    ...hub,
    x: plate.x + plate.w * hub.u,
    y: plate.y + plate.h * hub.v,
  }));

  const arc = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.28;
    return pathEl({
      d: `M${round(a.x)} ${round(a.y)} Q${round(mx)} ${round(my)} ${round(b.x)} ${round(b.y)}`,
      fill: "none",
      stroke: P.accentDeep,
      "stroke-opacity": 0.78,
      "stroke-width": 3,
      "stroke-dasharray": "9 9",
      "stroke-linecap": "round",
    });
  };

  const marker = (hub, i) =>
    circle({ cx: round(hub.x), cy: round(hub.y), r: 34 - i * 2, fill: hub.color, opacity: 0.14 }) +
    circle({ cx: round(hub.x), cy: round(hub.y), r: 22, fill: hub.color, opacity: 0.22 }) +
    circle({
      cx: round(hub.x),
      cy: round(hub.y),
      r: 15,
      fill: P.white,
      filter: "url(#shadowChip)",
    }) +
    circle({ cx: round(hub.x), cy: round(hub.y), r: 8, fill: hub.color });

  return (
    backdrop(w, h, { leak: "top-right" }) +
    /* Graticule */
    group(
      {},
      many(5, (i) =>
        line({
          x1: plate.x,
          y1: round(plate.y + (plate.h / 4) * i),
          x2: plate.x + plate.w,
          y2: round(plate.y + (plate.h / 4) * i),
          stroke: P.accentDeep,
          "stroke-opacity": 0.07,
          "stroke-width": 1,
        }),
      ),
    ) +
    dots +
    el(
      "clipPath",
      { id: "regions" },
      REGIONS.map((d) =>
        pathEl({
          d: d.replace(
            /([0-9.]+),([0-9.]+)/g,
            (_, u, v) =>
              `${round(plate.x + plate.w * Number(u))},${round(plate.y + plate.h * Number(v))}`,
          ),
        }),
      ).join(""),
    ) +
    el("g", { "clip-path": "url(#regions)" }, landDots) +
    arc(HUBS[0], HUBS[1]) +
    arc(HUBS[1], HUBS[2]) +
    HUBS.map(marker).join("") +
    /* Legend */
    group(
      {},
      card({ x: w * 0.075, y: h * 0.75, w: 300, h: 150, r: 22, shadow: "shadowChip" }) +
        many(3, (i) => {
          const colors = [P.amber, P.emerald, P.blue];
          const y = h * 0.75 + 30 + i * 36;
          return (
            circle({ cx: w * 0.075 + 30, cy: y, r: 7, fill: colors[i] }) +
            rect({
              x: w * 0.075 + 48,
              y: y - 5,
              width: 118,
              height: 10,
              rx: 5,
              fill: P.inkSoft,
              opacity: 0.7,
            }) +
            rect({ x: w * 0.075 + 176, y: y - 5, width: 92, height: 10, rx: 5, fill: P.line })
          );
        }),
    ) +
    floatingChip({ x: w * 0.68, y: h * 0.1, w: 268, h: 84, glyph: "globe", color: P.accentDeep })
  );
}

/* -------------------------------------------------------------------------- */
/* Manifest                                                                   */
/* -------------------------------------------------------------------------- */

/** One ratio for every page banner, so PageHeader needs no per-page special case. */
const BANNER = [1600, 700]; // 16/7 — matches the /products page banner

const SCENES = [{ out: "locations.webp", size: BANNER, draw: locationsMap }];

/* -------------------------------------------------------------------------- */
/* Render                                                                     */
/* -------------------------------------------------------------------------- */

await mkdir(OUT, { recursive: true });

for (const { out, size, draw } of SCENES) {
  const [w, h] = size;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${DEFS}</defs>${draw(
    w,
    h,
  )}</svg>`;
  const dest = path.join(OUT, out);
  const info = await sharp(Buffer.from(svg)).webp({ quality: 84, effort: 6 }).toFile(dest);
  console.log(
    `${out.padEnd(28)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
  );
}
