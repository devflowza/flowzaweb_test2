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

/** Deterministic PRNG so the committed WebPs are reproducible byte-for-byte. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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

/**
 * Closed organic outline — a ring of jittered points smoothed through their
 * midpoints, so lakes and shorelines don't read as perfect ellipses.
 */
function blob(cx, cy, rx, ry, r, points = 9) {
  const pts = Array.from({ length: points }, (_, i) => {
    const a = (i / points) * Math.PI * 2;
    const k = 0.68 + r() * 0.52;
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  });
  const mid = (a, b) => [round((a[0] + b[0]) / 2), round((a[1] + b[1]) / 2)];
  const start = mid(pts[points - 1], pts[0]);
  let d = `M${start[0]} ${start[1]}`;
  for (let i = 0; i < points; i += 1) {
    const p = pts[i];
    const m = mid(p, pts[(i + 1) % points]);
    d += ` Q${round(p[0])} ${round(p[1])} ${m[0]} ${m[1]}`;
  }
  return `${d} Z`;
}

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

/** Small pill, e.g. a status badge or filter chip. */
function pill({
  x,
  y,
  w,
  h = 28,
  fill = P.accentMint,
  stroke,
  dot,
  dotColor = P.accent,
  bar = 0.55,
  barColor = P.accentDeep,
}) {
  return (
    rect({
      x,
      y,
      width: w,
      height: h,
      rx: h / 2,
      fill,
      stroke,
      "stroke-width": stroke ? 1 : undefined,
    }) +
    (dot ? circle({ cx: x + h * 0.55, cy: y + h / 2, r: h * 0.17, fill: dotColor }) : "") +
    rect({
      x: x + (dot ? h * 0.95 : h * 0.45),
      y: y + h / 2 - 4,
      width: (w - (dot ? h * 1.5 : h * 0.9)) * bar,
      height: 8,
      rx: 4,
      fill: barColor,
      opacity: 0.65,
    })
  );
}

/* -------------------------------------------------------------------------- */
/* Scenes                                                                     */
/* -------------------------------------------------------------------------- */

/** /about — nine platforms orbiting one shared core. */
function aboutFabric(w, h) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  const rx = w * 0.31;
  const ry = h * 0.33;
  const nodes = many(9, (i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 9;
    const nx = cx + Math.cos(a) * rx;
    const ny = cy + Math.sin(a) * ry;
    const size = 74;
    const tints = [
      P.accent,
      P.blue,
      P.violet,
      P.amber,
      P.emerald,
      P.cyan,
      P.accentDeep,
      P.rose,
      "#0f766e",
    ];
    /* No `layers` here — that glyph belongs to the core node at the centre */
    const marks = [
      "pulse",
      "globe",
      "spark",
      "pin",
      "clock",
      "plug",
      "shield",
      "message",
      "document",
    ];
    const tint = tints[i];
    return (
      pathEl({
        d: `M${round(cx)} ${round(cy)} Q${round((cx + nx) / 2 + Math.cos(a) * 18)} ${round(
          (cy + ny) / 2 + Math.sin(a) * 18,
        )} ${round(nx)} ${round(ny)}`,
        fill: "none",
        stroke: P.accentDeep,
        "stroke-opacity": 0.22,
        "stroke-width": 1.6,
        "stroke-dasharray": "5 7",
      }) +
      circle({ cx: round(nx), cy: round(ny), r: size * 0.72, fill: P.white, opacity: 0.72 }) +
      rect({
        x: round(nx - size / 2),
        y: round(ny - size / 2),
        width: size,
        height: size,
        rx: 20,
        fill: P.white,
        stroke: P.line,
        "stroke-width": 1,
        filter: "url(#shadowSoft)",
      }) +
      rect({
        x: round(nx - size / 2 + 13),
        y: round(ny - size / 2 + 13),
        width: size - 26,
        height: size - 26,
        rx: 14,
        fill: tint,
        opacity: 0.14,
      }) +
      glyph(marks[i], { x: nx - 14, y: ny - 14, size: 28, color: tint, width: 2 })
    );
  });

  return (
    backdrop(w, h, { leak: "bottom-left" }) +
    /* Orbit rings */
    ellipse({
      cx,
      cy,
      rx,
      ry,
      fill: "none",
      stroke: P.accentDeep,
      "stroke-opacity": 0.14,
      "stroke-width": 1.5,
    }) +
    ellipse({
      cx,
      cy,
      rx: rx * 0.66,
      ry: ry * 0.66,
      fill: "none",
      stroke: P.accentDeep,
      "stroke-opacity": 0.1,
      "stroke-width": 1.5,
      "stroke-dasharray": "3 9",
    }) +
    nodes +
    /* Core */
    circle({ cx, cy, r: 108, fill: P.accent, opacity: 0.07 }) +
    circle({ cx, cy, r: 84, fill: P.accent, opacity: 0.1 }) +
    circle({ cx, cy, r: 62, fill: "url(#brand)", filter: "url(#glowBrand)" }) +
    glyph("layers", { x: cx - 21, y: cy - 21, size: 42, color: P.white, width: 2 }) +
    /* Stat strip, bottom-left */
    floatingChip({ x: w * 0.055, y: h * 0.76, w: 268, h: 86, glyph: "spark" }) +
    /* Uptime-ish chip, top-right */
    floatingChip({
      x: w * 0.69,
      y: h * 0.1,
      w: 252,
      h: 82,
      glyph: "globe",
      color: P.blue,
      bg: "#eff4ff",
    })
  );
}

/** /contact — a WhatsApp-first conversation. */
function contactConversation(w, h) {
  const px = w * 0.14;
  const top = h * 0.13;
  const panelW = w * 0.56;
  const panelH = h * 0.78;

  const inbound = (y, wid, widths) =>
    card({
      x: px + 34,
      y,
      w: wid,
      h: 30 + widths.length * 22,
      r: 18,
      stroke: P.line,
      shadow: null,
    }) + textLines({ x: px + 34 + 18, y: y + 16, widths, h: 8, gap: 14, fill: P.line });

  const outbound = (y, wid, widths) =>
    rect({
      x: px + panelW - 34 - wid,
      y,
      width: wid,
      height: 30 + widths.length * 22,
      rx: 18,
      fill: P.whatsapp,
      opacity: 0.16,
    }) +
    textLines({
      x: px + panelW - 34 - wid + 18,
      y: y + 16,
      widths,
      h: 8,
      gap: 14,
      fill: "#0b5c31",
      opacity: 0.45,
    });

  return (
    backdrop(w, h, { leak: "bottom-right" }) +
    /* Thread panel */
    card({ x: px, y: top, w: panelW, h: panelH, r: 30, shadow: "shadowLift" }) +
    /* Panel header */
    rect({ x: px, y: top, width: panelW, height: 76, rx: 30, fill: P.mint }) +
    rect({ x: px, y: top + 46, width: panelW, height: 30, fill: P.mint }) +
    line({
      x1: px,
      y1: top + 76,
      x2: px + panelW,
      y2: top + 76,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    circle({ cx: px + 44, cy: top + 38, r: 20, fill: P.whatsapp, opacity: 0.2 }) +
    glyph("message", { x: px + 33, y: top + 27, size: 22, color: "#0b5c31", width: 2 }) +
    textLines({ x: px + 78, y: top + 26, widths: [150, 96], h: 9, gap: 10, fill: P.lineSoft }) +
    rect({
      x: px + 78,
      y: top + 26,
      width: 150,
      height: 9,
      rx: 4.5,
      fill: P.inkSoft,
      opacity: 0.72,
    }) +
    pill({
      x: px + panelW - 132,
      y: top + 24,
      w: 104,
      h: 28,
      fill: "#e8f8ee",
      dot: true,
      dotColor: P.whatsapp,
      bar: 0.7,
      barColor: "#0b5c31",
    }) +
    /* Messages — sized to run right down to the composer, no dead panel */
    inbound(top + 100, panelW * 0.6, [panelW * 0.44, panelW * 0.3]) +
    outbound(top + 186, panelW * 0.54, [panelW * 0.38, panelW * 0.24]) +
    inbound(top + 272, panelW * 0.52, [panelW * 0.36]) +
    outbound(top + 336, panelW * 0.4, [panelW * 0.26]) +
    /* Typing indicator */
    group(
      {},
      rect({ x: px + 34, y: top + 402, width: 92, height: 40, rx: 20, fill: P.mint }) +
        many(3, (i) =>
          circle({
            cx: px + 56 + i * 18,
            cy: top + 422,
            r: 5,
            fill: P.graySoft,
            opacity: 0.9 - i * 0.2,
          }),
        ),
    ) +
    /* Composer */
    rect({
      x: px + 28,
      y: top + panelH - 74,
      width: panelW - 56,
      height: 50,
      rx: 25,
      fill: P.tint,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    textLines({ x: px + 54, y: top + panelH - 54, widths: [panelW * 0.34], h: 9, gap: 12 }) +
    circle({ cx: px + panelW - 54, cy: top + panelH - 49, r: 19, fill: "url(#brand)" }) +
    glyph("arrow", {
      x: px + panelW - 64,
      y: top + panelH - 59,
      size: 20,
      color: P.white,
      width: 2.1,
    }) +
    /* Channel cards on the right */
    group(
      {},
      many(3, (i) => {
        const cy = top + 26 + i * 132;
        const colors = [
          { bg: "#e8f8ee", fg: "#047857", name: "message" },
          { bg: "#eff4ff", fg: P.cyan, name: "clock" },
          { bg: P.accentMint, fg: P.accentDeep, name: "pin" },
        ][i];
        return (
          card({
            x: px + panelW + 46,
            y: cy,
            w: w - (px + panelW + 46) - w * 0.07,
            h: 104,
            r: 22,
          }) +
          iconTile({
            x: px + panelW + 46 + 24,
            y: cy + 30,
            size: 44,
            bg: colors.bg,
            glyph: colors.name,
            color: colors.fg,
          }) +
          textLines({
            x: px + panelW + 46 + 84,
            y: cy + 32,
            widths: [116, 168],
            h: 9,
            gap: 13,
          }) +
          rect({
            x: px + panelW + 46 + 84,
            y: cy + 32,
            width: 116,
            height: 9,
            rx: 4.5,
            fill: P.inkSoft,
            opacity: 0.7,
          })
        );
      }),
    )
  );
}

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

/**
 * /locations office cards — a map fragment centred on the office.
 *
 * Deliberately a map rather than a skyline: the office cards next to these are
 * already dense with an address, so the artwork has to stay quiet, and a plan
 * view rhymes with the dot-matrix banner above it. Parks stay brand green in
 * every city while roads, water and the pin take that office's accent, so the
 * three cards read as a set without looking identical.
 */
function cityMapTile(w, h, { accent, seed, water }) {
  const r = rng(seed);

  /* Irregular block grid — the gaps between blocks are the streets */
  const gridLines = (extent, min, max) => {
    const out = [-60];
    while (out.at(-1) < extent + 60) out.push(out.at(-1) + extent * (min + r() * (max - min)));
    return out;
  };
  const xs = gridLines(w, 0.11, 0.2);
  const ys = gridLines(h, 0.13, 0.24);

  /* A few blocks become parks; the rest are built-up */
  const parks = new Set([7, 13, 22, 29]);
  let blocks = "";
  let n = 0;
  for (let i = 0; i < xs.length - 1; i += 1) {
    for (let j = 0; j < ys.length - 1; j += 1) {
      const bx = xs[i] + 9;
      const by = ys[j] + 9;
      const bw = xs[i + 1] - xs[i] - 18;
      const bh = ys[j + 1] - ys[j] - 18;
      n += 1;
      if (bw <= 4 || bh <= 4) continue;
      const isPark = parks.has(n);
      /* Split the odd block with an alley so the grain isn't mechanical */
      if (!isPark && r() > 0.72 && bw > 90) {
        const split = bw * (0.4 + r() * 0.2);
        blocks +=
          rect({
            x: round(bx),
            y: round(by),
            width: round(split),
            height: round(bh),
            rx: 7,
            fill: accent,
            opacity: 0.09,
          }) +
          rect({
            x: round(bx + split + 12),
            y: round(by),
            width: round(bw - split - 12),
            height: round(bh),
            rx: 7,
            fill: accent,
            opacity: 0.13,
          });
        continue;
      }
      blocks += rect({
        x: round(bx),
        y: round(by),
        width: round(bw),
        height: round(bh),
        rx: isPark ? 14 : 7,
        fill: isPark ? P.accent : accent,
        opacity: isPark ? 0.17 : 0.08 + r() * 0.07,
      });
    }
  }

  /* Two arterials: one orthogonal, one on the diagonal */
  const arterialY = ys[Math.floor(ys.length * 0.55)];
  const arterials =
    rect({ x: 0, y: round(arterialY - 13), width: w, height: 26, fill: P.white }) +
    rect({ x: 0, y: round(arterialY - 1), width: w, height: 2, fill: accent, opacity: 0.28 }) +
    pathEl({
      d: `M${round(-w * 0.05)} ${round(h * 0.14)} L${round(w * 1.05)} ${round(h * 0.92)}`,
      stroke: P.white,
      "stroke-width": 24,
      fill: "none",
    }) +
    pathEl({
      d: `M${round(-w * 0.05)} ${round(h * 0.14)} L${round(w * 1.05)} ${round(h * 0.92)}`,
      stroke: accent,
      "stroke-opacity": 0.22,
      "stroke-width": 2,
      "stroke-dasharray": "14 12",
      fill: "none",
    });

  const WATER = {
    /* Muscat: the coast sweeps in from the bottom-right */
    coast: pathEl({
      d: `M${w} ${round(h * 0.46)} C${round(w * 0.8)} ${round(h * 0.56)} ${round(w * 0.72)} ${round(
        h * 0.8,
      )} ${round(w * 0.66)} ${h} L${w} ${h} Z`,
      fill: accent,
      opacity: 0.2,
    }),
    /* Dubai: a creek cutting across the lower third */
    creek: pathEl({
      d: `M0 ${round(h * 0.74)} C${round(w * 0.24)} ${round(h * 0.66)} ${round(w * 0.36)} ${round(
        h * 0.88,
      )} ${round(w * 0.58)} ${round(h * 0.84)} C${round(w * 0.78)} ${round(h * 0.8)} ${round(
        w * 0.88,
      )} ${round(h * 0.96)} ${w} ${round(h * 0.9)} L${w} ${h} L0 ${h} Z`,
      fill: accent,
      opacity: 0.2,
    }),
    /* Bengaluru is inland — two of its lakes instead of a shoreline */
    lakes:
      pathEl({ d: blob(w * 0.17, h * 0.81, w * 0.13, h * 0.1, r), fill: accent, opacity: 0.22 }) +
      pathEl({ d: blob(w * 0.84, h * 0.23, w * 0.1, h * 0.08, r), fill: accent, opacity: 0.22 }),
  }[water];

  /* Office marker, dead centre of the plate */
  const mx = w * 0.5;
  const my = h * 0.47;

  return (
    rect({ width: w, height: h, fill: "#fbfcfb" }) +
    rect({ width: w, height: h, fill: accent, opacity: 0.035 }) +
    blocks +
    WATER +
    arterials +
    /* Walking-radius rings */
    circle({
      cx: round(mx),
      cy: round(my),
      r: round(h * 0.34),
      fill: "none",
      stroke: accent,
      "stroke-opacity": 0.2,
      "stroke-width": 2,
      "stroke-dasharray": "6 10",
    }) +
    circle({
      cx: round(mx),
      cy: round(my),
      r: round(h * 0.2),
      fill: "none",
      stroke: accent,
      "stroke-opacity": 0.28,
      "stroke-width": 2,
      "stroke-dasharray": "6 10",
    }) +
    circle({ cx: round(mx), cy: round(my), r: round(h * 0.2), fill: accent, opacity: 0.05 }) +
    /* Nearby POIs */
    many(4, (i) => {
      const a = -Math.PI / 3 + (i * 2 * Math.PI) / 4.4;
      return circle({
        cx: round(mx + Math.cos(a) * h * 0.27),
        cy: round(my + Math.sin(a) * h * 0.27),
        r: 7,
        fill: P.white,
        stroke: accent,
        "stroke-width": 3,
        "stroke-opacity": 0.5,
      });
    }) +
    circle({ cx: round(mx), cy: round(my), r: 46, fill: accent, opacity: 0.14 }) +
    circle({ cx: round(mx), cy: round(my), r: 33, fill: P.white, filter: "url(#shadowChip)" }) +
    glyph("pin", { x: mx - 18, y: my - 18, size: 36, color: accent, width: 2 }) +
    /* Scale bar */
    group(
      {},
      rect({
        x: round(w - 148),
        y: round(h - 46),
        width: 96,
        height: 5,
        rx: 2.5,
        fill: P.gray,
        opacity: 0.35,
      }) +
        rect({
          x: round(w - 148),
          y: round(h - 56),
          width: 3,
          height: 15,
          rx: 1.5,
          fill: P.gray,
          opacity: 0.35,
        }) +
        rect({
          x: round(w - 55),
          y: round(h - 56),
          width: 3,
          height: 15,
          rx: 1.5,
          fill: P.gray,
          opacity: 0.35,
        }),
    )
  );
}

/** /get-started — the five-step onboarding rail. */
function getStartedRail(w, h) {
  const cx0 = w * 0.11;
  const span = w * 0.78;
  const y = h * 0.46;
  const steps = 5;
  const gap = span / (steps - 1);
  const done = 3;

  const railBase = rect({ x: cx0, y: y - 3, width: span, height: 6, rx: 3, fill: P.line });
  /* The filled rail stops exactly under the active node, never mid-air */
  const railDone = rect({
    x: cx0,
    y: y - 3,
    width: round(gap * done),
    height: 6,
    rx: 3,
    fill: "url(#brand)",
  });

  const nodes = many(steps, (i) => {
    const x = cx0 + gap * i;
    const isDone = i < done;
    const isNow = i === done;
    return (
      (isNow
        ? circle({ cx: round(x), cy: y, r: 46, fill: P.accent, opacity: 0.12 }) +
          circle({ cx: round(x), cy: y, r: 34, fill: P.accent, opacity: 0.18 })
        : "") +
      circle({
        cx: round(x),
        cy: y,
        r: 26,
        fill: isDone || isNow ? "url(#brand)" : P.white,
        stroke: isDone || isNow ? "none" : P.lineSoft,
        "stroke-width": isDone || isNow ? undefined : 2,
        filter: isDone || isNow ? "url(#glowBrand)" : "url(#shadowSoft)",
      }) +
      (isDone
        ? glyph("check", { x: round(x - 12), y: y - 12, size: 24, color: P.white, width: 2.4 })
        : isNow
          ? circle({ cx: round(x), cy: y, r: 8, fill: P.white })
          : circle({ cx: round(x), cy: y, r: 7, fill: P.lineSoft }))
    );
  });

  /* A caption card under every step, alternating above/below the rail */
  const cards = many(steps, (i) => {
    const x = cx0 + gap * i;
    const cw = 196;
    const chY = i % 2 === 0 ? y + 74 : y - 74 - 112;
    return (
      line({
        x1: round(x),
        y1: i % 2 === 0 ? y + 30 : y - 30,
        x2: round(x),
        y2: i % 2 === 0 ? chY : chY + 112,
        stroke: P.line,
        "stroke-width": 2,
      }) +
      card({ x: round(x - cw / 2), y: chY, w: cw, h: 112, r: 20 }) +
      rect({
        x: round(x - cw / 2 + 22),
        y: chY + 22,
        width: 34,
        height: 12,
        rx: 6,
        fill: i < done ? P.accent : P.line,
        opacity: i < done ? 0.9 : 1,
      }) +
      textLines({
        x: round(x - cw / 2 + 22),
        y: chY + 52,
        widths: [cw - 60, cw - 90],
        h: 9,
        gap: 13,
      })
    );
  });

  return (
    backdrop(w, h, { leak: "bottom-left" }) +
    railBase +
    railDone +
    cards +
    nodes +
    floatingChip({ x: w * 0.035, y: h * 0.05, w: 240, h: 78, glyph: "spark" }) +
    floatingChip({
      x: w * 0.735,
      y: h * 0.83,
      w: 240,
      h: 78,
      glyph: "clock",
      color: P.cyan,
      bg: "#eff9fb",
    })
  );
}

/** /help — search, topic tiles, and an open FAQ row. */
function helpCenter(w, h) {
  const px = w * 0.09;
  const cw = w * 0.82;
  const searchH = 68;

  const tiles = many(6, (i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const tw = (cw - 2 * 26) / 3;
    const th = 132;
    const x = px + col * (tw + 26);
    const y = h * 0.29 + row * (th + 22);
    const glyphs = ["spark", "lock", "book", "layers", "clock", "shield"];
    return (
      card({ x: round(x), y: round(y), w: round(tw), h: th, r: 22 }) +
      iconTile({ x: round(x + 24), y: round(y + 24), size: 42, glyph: glyphs[i] }) +
      textLines({
        x: round(x + 24),
        y: round(y + 82),
        widths: [tw * 0.5, tw * 0.72],
        h: 9,
        gap: 12,
      }) +
      rect({
        x: round(x + 24),
        y: round(y + 82),
        width: round(tw * 0.5),
        height: 9,
        rx: 4.5,
        fill: P.inkSoft,
        opacity: 0.7,
      })
    );
  });

  return (
    backdrop(w, h, { leak: "top-right" }) +
    /* Search field */
    rect({
      x: px,
      y: h * 0.12,
      width: cw,
      height: searchH,
      rx: searchH / 2,
      fill: P.white,
      stroke: P.line,
      "stroke-width": 1,
      filter: "url(#shadowSoft)",
    }) +
    glyph("search", {
      x: px + 28,
      y: h * 0.12 + searchH / 2 - 13,
      size: 26,
      color: P.accentDeep,
      width: 2,
    }) +
    textLines({ x: px + 72, y: h * 0.12 + searchH / 2 - 5, widths: [cw * 0.3], h: 10, gap: 12 }) +
    pill({ x: px + cw - 148, y: h * 0.12 + 18, w: 120, h: 32, fill: P.accentMint, bar: 0.6 }) +
    tiles +
    /* Expanded FAQ row */
    group(
      {},
      card({ x: px, y: h * 0.79, w: cw, h: 118, r: 24 }) +
        rect({ x: px, y: h * 0.79, width: 5, height: 118, rx: 2.5, fill: P.accent }) +
        rect({
          x: px + 34,
          y: h * 0.79 + 26,
          width: cw * 0.36,
          height: 11,
          rx: 5.5,
          fill: P.inkSoft,
          opacity: 0.78,
        }) +
        textLines({ x: px + 34, y: h * 0.79 + 58, widths: [cw * 0.68, cw * 0.52], h: 9, gap: 13 }) +
        circle({ cx: px + cw - 44, cy: h * 0.79 + 40, r: 20, fill: P.accentMint }) +
        glyph("chevron", {
          x: px + cw - 55,
          y: h * 0.79 + 30,
          size: 22,
          color: P.accentDeep,
          width: 2.2,
        }),
    )
  );
}

/** /docs — a documentation spread: nav rail, prose, code block. */
function docsSpread(w, h) {
  const px = w * 0.085;
  const cw = w * 0.83;
  const top = h * 0.1;
  const ch = h * 0.8;
  const railW = cw * 0.26;

  const navRows = many(7, (i) => {
    const y = top + 78 + i * 46;
    const active = i === 2;
    return (
      (active
        ? rect({
            x: px + 16,
            y: round(y - 14),
            width: railW - 32,
            height: 38,
            rx: 12,
            fill: P.accentMint,
          })
        : "") +
      circle({ cx: px + 40, cy: round(y + 5), r: 5, fill: active ? P.accentDeep : P.lineSoft }) +
      rect({
        x: px + 56,
        y: round(y),
        width: round(railW * (i % 3 === 0 ? 0.52 : i % 3 === 1 ? 0.44 : 0.36)),
        height: 10,
        rx: 5,
        fill: active ? P.accentDeep : P.line,
        opacity: active ? 0.8 : 1,
      })
    );
  });

  const codeX = px + railW + 44;
  const codeW = cw - railW - 44 - 40;
  const codeY = top + ch * 0.5;
  const codeH = ch * 0.42;
  const tokens = [
    [
      [70, P.accentLime],
      [120, "#7dd3fc"],
      [56, "#fbbf24"],
    ],
    [
      [44, "#7dd3fc"],
      [150, "#f9a8d4"],
      [80, P.accentLime],
    ],
    [
      [110, "#fbbf24"],
      [64, "#7dd3fc"],
    ],
    [
      [86, P.accentLime],
      [130, "#f9a8d4"],
      [48, "#7dd3fc"],
      [70, "#fbbf24"],
    ],
    [
      [58, "#7dd3fc"],
      [96, P.accentLime],
    ],
  ];

  return (
    backdrop(w, h, { leak: "bottom-left" }) +
    card({ x: px, y: top, w: cw, h: ch, r: 30, shadow: "shadowLift" }) +
    /* Window chrome */
    rect({ x: px, y: top, width: cw, height: 56, rx: 30, fill: P.mint }) +
    rect({ x: px, y: top + 26, width: cw, height: 30, fill: P.mint }) +
    line({ x1: px, y1: top + 56, x2: px + cw, y2: top + 56, stroke: P.line, "stroke-width": 1 }) +
    many(3, (i) =>
      circle({
        cx: px + 30 + i * 20,
        cy: top + 28,
        r: 6,
        fill: [P.rose, P.amber, P.emerald][i],
        opacity: 0.55,
      }),
    ) +
    rect({
      x: px + 110,
      y: top + 21,
      width: cw * 0.3,
      height: 14,
      rx: 7,
      fill: P.white,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    /* Nav rail */
    line({
      x1: px + railW,
      y1: top + 56,
      x2: px + railW,
      y2: top + ch,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    rect({ x: px + 24, y: top + 84, width: railW * 0.4, height: 10, rx: 5, fill: P.graySoft }) +
    navRows +
    /* Prose column */
    rect({
      x: codeX,
      y: top + 90,
      width: codeW * 0.52,
      height: 20,
      rx: 10,
      fill: P.inkSoft,
      opacity: 0.82,
    }) +
    textLines({
      x: codeX,
      y: top + 134,
      widths: [codeW * 0.94, codeW * 0.88, codeW * 0.62],
      h: 10,
      gap: 16,
    }) +
    pill({ x: codeX, y: top + 216, w: 128, h: 30, fill: P.accentMint, bar: 0.62 }) +
    pill({
      x: codeX + 142,
      y: top + 216,
      w: 108,
      h: 30,
      fill: P.tint,
      stroke: P.line,
      bar: 0.6,
      barColor: P.graySoft,
    }) +
    /* Code block */
    rect({ x: codeX, y: codeY, width: codeW, height: codeH, rx: 18, fill: "url(#inkFill)" }) +
    rect({ x: codeX, y: codeY, width: codeW, height: 34, rx: 18, fill: P.white, opacity: 0.06 }) +
    rect({ x: codeX, y: codeY + 17, width: codeW, height: 17, fill: P.white, opacity: 0.06 }) +
    many(2, (i) =>
      circle({ cx: codeX + 22 + i * 18, cy: codeY + 17, r: 4.5, fill: P.white, opacity: 0.3 }),
    ) +
    rect({
      x: codeX + codeW - 66,
      y: codeY + 10,
      width: 46,
      height: 14,
      rx: 7,
      fill: P.accentLime,
      opacity: 0.5,
    }) +
    tokens
      .map((row, i) => {
        let x = codeX + 26;
        const y = codeY + 58 + i * 30;
        return (
          rect({
            x: codeX + 14,
            y: round(y + 1),
            width: 8,
            height: 8,
            rx: 4,
            fill: P.white,
            opacity: 0.16,
          }) +
          row
            .map(([tw, color]) => {
              const seg = rect({
                x: round(x),
                y: round(y),
                width: tw,
                height: 10,
                rx: 5,
                fill: color,
                opacity: 0.85,
              });
              x += tw + 14;
              return seg;
            })
            .join("")
        );
      })
      .join("") +
    /* Overhangs the panel's bottom edge rather than crowding inside it */
    floatingChip({ x: w * 0.62, y: h * 0.845, w: 250, h: 82, glyph: "book", color: P.accentDeep })
  );
}

/** /status — uptime bars, SLA ring and a latency trace. */
function statusUptime(w, h) {
  const px = w * 0.075;
  const cw = w * 0.85;
  const r = rng(9);

  /* Uptime strip */
  const bars = 74;
  const barW = (cw * 0.62 - (bars - 1) * 3) / bars;
  const stripY = h * 0.2;
  const stripH = 96;
  const degraded = new Set([31, 32]);
  const strip = many(bars, (i) => {
    const x = px + 34 + i * (barW + 3);
    const dip = degraded.has(i);
    const bh = dip ? stripH * (0.42 + r() * 0.16) : stripH * (0.72 + r() * 0.28);
    return rect({
      x: round(x),
      y: round(stripY + 60 + (stripH - bh)),
      width: round(barW),
      height: round(bh),
      rx: round(Math.min(barW / 2, 4)),
      fill: dip ? P.amber : "url(#lime)",
      opacity: dip ? 0.9 : 0.95,
    });
  });

  /* SLA ring */
  const ringCx = px + cw - 128;
  const ringCy = stripY + 108;
  const ringR = 62;
  const circumference = 2 * Math.PI * ringR;

  /* Latency trace */
  const traceY = h * 0.62;
  const traceH = h * 0.26;
  /* Clamped to the latency card, not the full row — the trace lives inside it */
  const traceW = cw * 0.62 - 68;
  const points = Array.from({ length: 30 }, (_, i) => {
    const x = px + 34 + (traceW * i) / 29;
    const y = traceY + 52 + traceH * 0.5 - (0.35 + r() * 0.6) * traceH * 0.42;
    return `${round(x)},${round(y)}`;
  });
  const trace = pathEl({
    d: `M${points.join(" L")}`,
    fill: "none",
    stroke: P.accentDeep,
    "stroke-width": 3,
    "stroke-linejoin": "round",
    "stroke-linecap": "round",
  });
  const traceFill = pathEl({
    d: `M${points.join(" L")} L${round(px + 34 + traceW)},${round(traceY + 52 + traceH * 0.62)} L${round(
      px + 34,
    )},${round(traceY + 52 + traceH * 0.62)} Z`,
    fill: P.accent,
    opacity: 0.12,
  });

  return (
    backdrop(w, h, { leak: "bottom-right" }) +
    /* Uptime card */
    card({ x: px, y: stripY, w: cw, h: stripH + 96, r: 26, shadow: "shadowLift" }) +
    rect({
      x: px + 34,
      y: stripY + 30,
      width: 168,
      height: 12,
      rx: 6,
      fill: P.inkSoft,
      opacity: 0.8,
    }) +
    pill({
      x: px + 224,
      y: stripY + 24,
      w: 130,
      h: 26,
      fill: "#e9f9ef",
      dot: true,
      dotColor: P.emerald,
      bar: 0.66,
      barColor: "#065f46",
    }) +
    strip +
    /* SLA ring */
    circle({
      cx: round(ringCx),
      cy: round(ringCy),
      r: ringR,
      fill: "none",
      stroke: P.line,
      "stroke-width": 12,
    }) +
    circle({
      cx: round(ringCx),
      cy: round(ringCy),
      r: ringR,
      fill: "none",
      stroke: "url(#brand)",
      "stroke-width": 12,
      "stroke-linecap": "round",
      "stroke-dasharray": `${round(circumference * 0.94)} ${round(circumference)}`,
      transform: `rotate(-90 ${round(ringCx)} ${round(ringCy)})`,
    }) +
    circle({ cx: round(ringCx), cy: round(ringCy), r: ringR - 26, fill: P.accentMint }) +
    glyph("pulse", { x: ringCx - 20, y: ringCy - 20, size: 40, color: P.accentDeep, width: 2.2 }) +
    /* Latency card */
    card({ x: px, y: traceY, w: cw * 0.62, h: traceH + 78, r: 26 }) +
    rect({
      x: px + 34,
      y: traceY + 26,
      width: 132,
      height: 11,
      rx: 5.5,
      fill: P.inkSoft,
      opacity: 0.76,
    }) +
    many(4, (i) =>
      line({
        x1: px + 34,
        y1: round(traceY + 62 + i * (traceH * 0.16)),
        x2: round(px + cw * 0.62 - 34),
        y2: round(traceY + 62 + i * (traceH * 0.16)),
        stroke: P.line,
        "stroke-width": 1,
        "stroke-dasharray": "4 6",
      }),
    ) +
    traceFill +
    trace +
    circle({
      cx: round(px + 34 + traceW),
      cy: Number(points.at(-1).split(",")[1]),
      r: 6,
      fill: P.accentDeep,
    }) +
    /* Service list */
    group(
      {},
      card({ x: px + cw * 0.66, y: traceY, w: cw * 0.34, h: traceH + 78, r: 26 }) +
        many(4, (i) => {
          const y = traceY + 34 + i * 48;
          return (
            circle({
              cx: px + cw * 0.66 + 32,
              cy: round(y + 5),
              r: 7,
              fill: P.emerald,
              opacity: 0.9,
            }) +
            rect({
              x: px + cw * 0.66 + 50,
              y: round(y),
              width: cw * 0.14,
              height: 10,
              rx: 5,
              fill: P.line,
            }) +
            rect({
              x: round(px + cw * 0.66 + cw * 0.34 - 96),
              y: round(y - 4),
              width: 64,
              height: 20,
              rx: 10,
              fill: "#e9f9ef",
            }) +
            glyph("check", {
              x: round(px + cw * 0.66 + cw * 0.34 - 88),
              y: round(y - 2),
              size: 16,
              color: "#047857",
              width: 2.6,
            })
          );
        }),
    )
  );
}

/** Legal pages — a shared frame with a per-document mark. */
function legalPlate(w, h, { mark, tint }) {
  const sheetW = w * 0.3;
  const sheetH = h * 0.72;
  const sx = w * 0.1;
  const sy = h * 0.14;

  const sheets =
    rect({
      x: round(sx + 26),
      y: round(sy + 22),
      width: sheetW,
      height: sheetH,
      rx: 22,
      fill: P.white,
      opacity: 0.55,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    rect({
      x: round(sx + 13),
      y: round(sy + 11),
      width: sheetW,
      height: sheetH,
      rx: 22,
      fill: P.white,
      opacity: 0.8,
      stroke: P.line,
      "stroke-width": 1,
    }) +
    card({
      x: round(sx),
      y: round(sy),
      w: round(sheetW),
      h: round(sheetH),
      r: 22,
      shadow: "shadowLift",
    }) +
    rect({
      x: round(sx + 26),
      y: round(sy + 32),
      width: round(sheetW * 0.44),
      height: 13,
      rx: 6.5,
      fill: P.inkSoft,
      opacity: 0.8,
    }) +
    textLines({
      x: round(sx + 26),
      y: round(sy + 70),
      widths: [sheetW * 0.8, sheetW * 0.72, sheetW * 0.84, sheetW * 0.5],
      h: 8,
      gap: 13,
    }) +
    rect({
      x: round(sx + 26),
      y: round(sy + 196),
      width: round(sheetW * 0.34),
      height: 11,
      rx: 5.5,
      fill: tint,
      opacity: 0.6,
    }) +
    textLines({
      x: round(sx + 26),
      y: round(sy + 226),
      widths: [sheetW * 0.78, sheetW * 0.66, sheetW * 0.74],
      h: 8,
      gap: 13,
    });

  const markX = w * 0.6;
  const markY = h * 0.5;

  const marks = {
    shield:
      circle({ cx: round(markX), cy: round(markY), r: 132, fill: tint, opacity: 0.08 }) +
      circle({ cx: round(markX), cy: round(markY), r: 104, fill: tint, opacity: 0.12 }) +
      glyph("shield", { x: markX - 74, y: markY - 74, size: 148, color: tint, width: 3.2 }) +
      glyph("lock", { x: markX - 34, y: markY - 30, size: 68, color: tint, width: 2.4 }),
    terms:
      circle({ cx: round(markX), cy: round(markY), r: 132, fill: tint, opacity: 0.08 }) +
      circle({ cx: round(markX), cy: round(markY), r: 104, fill: tint, opacity: 0.12 }) +
      glyph("document", { x: markX - 74, y: markY - 74, size: 148, color: tint, width: 3 }) +
      circle({
        cx: round(markX + 62),
        cy: round(markY + 62),
        r: 34,
        fill: P.white,
        filter: "url(#shadowChip)",
      }) +
      glyph("check", { x: markX + 46, y: markY + 46, size: 32, color: tint, width: 3 }),
    cookies:
      circle({ cx: round(markX), cy: round(markY), r: 132, fill: tint, opacity: 0.08 }) +
      circle({ cx: round(markX), cy: round(markY), r: 104, fill: tint, opacity: 0.12 }) +
      glyph("cookie", { x: markX - 74, y: markY - 74, size: 148, color: tint, width: 3 }) +
      /* Consent toggles */
      many(3, (i) => {
        const ty = markY - 44 + i * 46;
        const tx = markX + 118;
        const on = i < 2;
        return (
          rect({
            x: round(tx),
            y: round(ty),
            width: 62,
            height: 30,
            rx: 15,
            fill: on ? tint : P.line,
            opacity: on ? 0.85 : 1,
          }) + circle({ cx: round(tx + (on ? 46 : 16)), cy: round(ty + 15), r: 11, fill: P.white })
        );
      }),
  }[mark];

  /* Clause index on the right — mirrors the sticky TOC the legal pages render,
     and stops the plate from trailing off into empty space. */
  const idxX = w * 0.735;
  const idxW = w * 0.175;
  const index =
    card({
      x: round(idxX),
      y: round(sy + h * 0.06),
      w: round(idxW),
      h: round(sheetH * 0.78),
      r: 20,
    }) +
    rect({
      x: round(idxX + 22),
      y: round(sy + h * 0.06 + 26),
      width: round(idxW * 0.42),
      height: 10,
      rx: 5,
      fill: P.graySoft,
    }) +
    many(5, (i) => {
      const iy = sy + h * 0.06 + 62 + i * 40;
      const on = i === 1;
      return (
        (on
          ? rect({
              x: round(idxX + 14),
              y: round(iy - 12),
              width: round(idxW - 28),
              height: 34,
              rx: 11,
              fill: tint,
              opacity: 0.1,
            })
          : "") +
        rect({
          x: round(idxX + 22),
          y: round(iy - 6),
          width: 3,
          height: 18,
          rx: 1.5,
          fill: on ? tint : P.line,
        }) +
        rect({
          x: round(idxX + 36),
          y: round(iy),
          width: round(idxW * (on ? 0.6 : 0.46 + (i % 3) * 0.08)),
          height: 9,
          rx: 4.5,
          fill: on ? tint : P.line,
          opacity: on ? 0.75 : 1,
        })
      );
    });

  return backdrop(w, h, { leak: "top-right", tone: "url(#page)" }) + sheets + marks + index;
}

/** 404 — a grid with one tile missing. */
function notFoundGrid(w, h) {
  const cols = 4;
  const rows = 3;
  const pad = w * 0.14;
  const cellW = (w - pad * 2) / cols;
  const cellH = (h - pad * 2) / rows;
  const missing = 6;

  const tiles = many(cols * rows, (i) => {
    const c = i % cols;
    const rr = Math.floor(i / cols);
    const x = pad + c * cellW + 10;
    const y = pad + rr * cellH + 10;
    const tw = cellW - 20;
    const th = cellH - 20;
    if (i === missing) {
      return rect({
        x: round(x),
        y: round(y),
        width: round(tw),
        height: round(th),
        rx: 20,
        fill: P.mint,
        stroke: P.lineSoft,
        "stroke-width": 2,
        "stroke-dasharray": "9 9",
      });
    }
    const glyphs = [
      "layers",
      "spark",
      "book",
      "globe",
      "clock",
      "plug",
      "shield",
      "message",
      "lock",
      "pulse",
      "search",
      "pin",
    ];
    return (
      card({ x: round(x), y: round(y), w: round(tw), h: round(th), r: 20 }) +
      iconTile({ x: round(x + 20), y: round(y + 20), size: 34, r: 11, glyph: glyphs[i] }) +
      textLines({
        x: round(x + 20),
        y: round(y + 68),
        widths: [tw * 0.62, tw * 0.44],
        h: 8,
        gap: 11,
      })
    );
  });

  const mx = pad + (missing % cols) * cellW + cellW / 2;
  const my = pad + Math.floor(missing / cols) * cellH + cellH / 2;

  return (
    backdrop(w, h, { leak: "bottom-left" }) +
    tiles +
    circle({ cx: round(mx), cy: round(my), r: 54, fill: P.white, filter: "url(#shadowLift)" }) +
    glyph("search", { x: mx - 26, y: my - 26, size: 52, color: P.accentDeep, width: 2.2 })
  );
}

/* -------------------------------------------------------------------------- */
/* Manifest                                                                   */
/* -------------------------------------------------------------------------- */

/** One ratio for every page banner, so PageHeader needs no per-page special case. */
const BANNER = [1600, 700]; // 16/7 — matches the /products page banner
const CARD = [1200, 675]; // 16/9 — office card headers

const SCENES = [
  { out: "about.webp", size: BANNER, draw: aboutFabric },
  { out: "contact.webp", size: BANNER, draw: contactConversation },
  { out: "locations.webp", size: BANNER, draw: locationsMap },
  { out: "get-started.webp", size: BANNER, draw: getStartedRail },
  { out: "help.webp", size: BANNER, draw: helpCenter },
  { out: "docs.webp", size: BANNER, draw: docsSpread },
  { out: "status.webp", size: BANNER, draw: statusUptime },
  {
    out: "locations-bengaluru.webp",
    size: CARD,
    draw: (w, h) => cityMapTile(w, h, { accent: P.amber, seed: 11, water: "lakes" }),
  },
  {
    out: "locations-muscat.webp",
    size: CARD,
    draw: (w, h) => cityMapTile(w, h, { accent: P.emerald, seed: 23, water: "coast" }),
  },
  {
    out: "locations-dubai.webp",
    size: CARD,
    draw: (w, h) => cityMapTile(w, h, { accent: P.blue, seed: 37, water: "creek" }),
  },
  {
    out: "legal-privacy.webp",
    size: BANNER,
    draw: (w, h) => legalPlate(w, h, { mark: "shield", tint: P.accentDeep }),
  },
  {
    out: "legal-terms.webp",
    size: BANNER,
    draw: (w, h) => legalPlate(w, h, { mark: "terms", tint: P.blue }),
  },
  {
    out: "legal-cookies.webp",
    size: BANNER,
    draw: (w, h) => legalPlate(w, h, { mark: "cookies", tint: P.amber }),
  },
  { out: "not-found.webp", size: [1600, 1000], draw: notFoundGrid },
];

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
