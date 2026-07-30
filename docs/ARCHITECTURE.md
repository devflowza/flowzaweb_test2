# Flowza.ai — Website Architecture Proposal

**Date:** 2026-07-26 · **Status:** APPROVED — decisions locked 2026-07-26:
Next.js 16.2 · legal entity **SoarTek LLC** (Muscat, Oman jurisdiction) · compliance claims = **SOC 2**
(ISO 27001/GDPR/PDPL wording dropped) · orphaned/fabricated pages excluded at launch (blog/customers
infrastructure built but not routed).

This document is the outcome of a full analysis of `sample-design` (the AQOZA PHP/Twig reference
site) and `website-content` (the current Flowza.ai React/Vite site — the content source of truth).
It defines the architecture, design system, content strategy, and implementation plan for the new
flagship Flowza.ai website, to be built from scratch in this folder.

---

## 1. Executive summary

- **Framework:** Next.js **16.2** (App Router) — see §5 for why 16 over the requested 15.
- **Design:** ported from the `sample-design` reference by measurement — see §15. Plus Jakarta
  Sans at weight 500/300/200, the reference green palette, 51.2px section rhythm, pill radii with
  72px one-sided scoops, image-dominant cards, solid accent bands, light `#fafafa` footer.
- **Content:** a single typed content layer (`src/content/`) that becomes the one source of truth,
  reconciling the inconsistencies found in the current site (pricing tables, legal entities,
  discount claims, product colors).
- **Backend:** the existing Supabase project is preserved untouched — the new contact form writes
  the exact same `contact_submissions` rows via a Server Action, so the existing `/adm` admin
  portal keeps working with zero changes.
- **SEO/AI-SEO:** static-first rendering, per-route metadata, full JSON-LD graph, segmented
  sitemap with images, robots.txt, llms.txt, build-time OG images, breadcrumbs, entity-first IA.
- **Deployment:** Cloudflare Workers via OpenNext adapter, GitHub Actions CI, Dockerfile for
  portability.

---

## 2. What the analysis found (condensed)

### 2.1 Reference site (`sample-design`) — concepts worth re-imagining

The reference is a B2B industrial lead-gen site (AQOZA). Its value to us is conceptual:

| Concept                           | What it is                                                                                                                                                        | How Flowza adopts it                                                                                             |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Fluid token system**            | Everything is `clamp()`: type scale, `--section-space-x/y` (24→64px / 40→128px), radii (`clamp(20px,2vw,30px)`), a `.section` gutter formula centering at 1500px  | Rebuilt as Tailwind v4 `@theme` tokens — fluid type + spacing + radius scales, one container primitive           |
| **Section-primitive composition** | Pages are stacks of ~20 named section patterns (hero, title-div, card-div, CTA band, FAQ)                                                                         | A real React section library — composable, typed, reused across all pages                                        |
| **Motion tokens**                 | `--transition1/2/3` cubic-bezier variables consumed everywhere                                                                                                    | Central motion constants (durations/easings) shared by CSS + Motion                                              |
| **Signature moves**               | Text marquee with `*` separators, ghost watermark type, glass arrow chips, aurora light-leak behind hero, dual-dot eyebrow, gradient stats band, concentric radii | Reinterpreted in Flowza cyan/blue as the brand's visual signatures                                               |
| **Doc-style product page**        | Sticky TOC sidebar + anchored content blocks + stacked Product JSON-LD                                                                                            | The template for the FlowZa Finance flagship page                                                                |
| **Conversion spine**              | Every page drains into one repeated CTA band + lead form; FAQs sit below the form for SEO                                                                         | Repeated CTA band + FAQ accordion pattern across the new site                                                    |
| **SEO scaffolding**               | Per-page `@graph` JSON-LD, BreadcrumbList mirrored in UI, segmented dynamic sitemap with image extensions                                                         | Systematized via a typed JSON-LD builder + `sitemap.ts`                                                          |
| **Four-pillar IA**                | Solutions/Products/Industries/Insights clusters                                                                                                                   | Adapted: Platforms as the product pillar; hub page + 7 detail pages with cross-linking ("Works Better Together") |

Anti-patterns identified and deliberately avoided: 617 KB monolithic CSS, dead AOS attributes,
no lazy loading/srcset, missing skip link, href-less nav anchors, empty-alt-by-default images,
infinite animations not gated by `prefers-reduced-motion`.

### 2.2 Current site (`website-content`) — content source of truth

- **Brand:** "FlowZa AI — Business Operating Systems". Hero: "One Platform. / Infinite Flow."
  Manifesto: "We believe software should disappear into the work…". Positioning: MEA & India.
- **7 platforms:** Finance (flagship, LIVE), Club (LIVE), LogisPro, Spa Master, Fleetza, QRForge,
  POS — each with verbatim taglines, descriptions, 6 features, 3 steps, 4 stats, testimonial,
  per-product accent color, external app URL (`*.flowza.ai`).
- **Live public routes (14):** `/`, `/get-started`, `/products/:id` ×7, `/finance`(+`/finance-demo`),
  `/about`, `/locations`, `/docs`, `/help`, `/status`, `/privacy`, `/terms`, `/cookies`, `/contact`.
- **Orphaned pages (files with no routes, by design per the 2026-07-05 spec):** Blog, Careers,
  Press, CustomerStories, ApiReference — content is largely fabricated (fake press coverage,
  fake $8M Series A, fictional executives).
- **Backend:** Supabase — contact form inserts into `contact_submissions` (anon RLS INSERT);
  an admin portal at `/adm` (login + TOTP 2FA, inbox, SMTP replies, recipients) reads it via
  edge functions. Pricing tables exist in the DB but the UI hardcodes plans.
- **Key facts:** WhatsApp +968 9210 7562 (primary CTA), sales@flowza.ai, Ghala Muscat Oman,
  Sun–Thu 9–6 GST, trials at finance.flowza.ai/trial and club.flowza.ai (14-day),
  25% yearly discount, plans $15/$40/$60 + Enterprise Plus.

### 2.3 Content conflicts that must be reconciled (see §10 for proposed resolutions)

1. **Two Finance pricing tables:** $15/$40/$60 (+25% yearly, matches seeded DB and trial URLs)
   vs $49/$99/Custom on the FinanceDemo page.
2. **Legal entity:** legal pages say "FlowZa AI FZ-LLC · Dubai Internet City, UAE"; Locations
   says CloudValley Solutions OPC Pvt Ltd (Bengaluru, Head Office) + SoarTek LLC (Muscat).
3. **Discounts:** 25% yearly (pricing/FAQ) vs "20% annual + 15% multi-product bundle" (Help).
4. **Compliance claims:** SOC 2 (home/footer) vs ISO 27001 + GDPR/PDPL (help/privacy).
5. **Per-product colors:** Fleetza `#06b6d4` vs `#7c5ff5`; POS `#0ea5e9` vs `#8b5cf6`.
6. **Phone:** +971 4 200 0000 appears on Help/Press — looks like a placeholder.
7. ToS covers 6 products (omits Club); contact form lists an 8th "FlowZa PMS".
8. Club has no local product image (remote Pexels placeholder).
9. Testimonials duplicated with different names/numbers between home and product data.

---

## 3. Design direction — the "Operating Fabric" design language

**Goal:** premium, minimal, confident — a global SaaS brand, not a template. Light-first with
deep-navy dark surfaces (top bar, footer, stats/CTA bands) for rhythm and contrast.

### 3.1 Color system (Tailwind v4 `@theme`, OKLCH ramps)

- **Brand:** cyan `#22d3ee` → blue `#2563eb` gradient (kept from current brand), full 50–950
  ramps generated in OKLCH for consistent lightness.
- **Ink/surfaces:** slate-based neutrals; navy `#0b1120` ("navy-950") for dark sections.
- **Signature washes:** cyan/blue aurora light-leak (the reference's green glow, re-keyed),
  subtle grid-pattern backdrop, pale `blue-50`/`slate-50` section tints alternating with white.
- **Per-product accents** (canonicalized): finance `#10b981`, logispro `#38bdf8`,
  spamaster `#f43f5e`, fleetza `#7c5ff5`, qrforge `#f59e0b`, pos `#8b5cf6`, club `#9333ea`.
- **Semantic tokens** (`--color-surface`, `--color-ink`, `--color-line`, …) so a dark theme can
  be added later without refactoring.
- All text/background pairs contrast-checked to WCAG 2.2 AA.

### 3.2 Typography

- **Primary:** Instrument Sans (variable, self-hosted via `next/font`) — display through body.
  Distinctive without being trendy; excellent at heavy display weights and small UI sizes.
- **Data/accents:** IBM Plex Mono for eyebrows, stat numerals, and badges — a technical
  "operating fabric" voice that also nods to the current IBM Plex heritage.
- **Fluid type scale:** `clamp()`-based (minor-third-ish ratio), h1 ≈ 40→68px, tight negative
  tracking on display sizes, generous 300/400-weight body like the reference.
- Eyebrow convention: mono, uppercase, tracked, with a **dual-node connector** motif (two dots
  joined by a hairline — "systems on one fabric") as Flowza's version of the reference's dual-dot.

### 3.3 Spacing, radius, elevation

- Fluid section rhythm: `--space-section: clamp(4rem, 8vw, 9rem)`, gutter
  `clamp(1.25rem, 4vw, 4rem)`, content max-width 1440px via a single `<Container>` primitive.
- Radius scale with **concentric nesting** (inner = outer − padding), pill CTAs, 20–24px cards.
- Layered shadows: hairline → soft lift → tinted "mega" shadow for hero media/floating cards;
  brand-tinted glows on primary CTAs.

### 3.4 Motion (Motion library + CSS)

- Motion for React via `LazyMotion`/`m` (≈6 KB) — scroll-linked `whileInView` reveals with
  stagger, hero entrance choreography, count-up stats, accordion/menu transitions.
- Pure CSS where cheaper: logo/platform marquee (`animation-composition`-style technique,
  gated behind `prefers-reduced-motion: no-preference`), gradient drift, hover lifts/zooms.
- Central motion tokens (durations 200/450/700ms, three easings) shared across CSS and JS.
- Every animation respects `prefers-reduced-motion`; a `useReducedMotion` gate for JS motion.

### 3.5 Signature moments (Flowza identity, not clones)

1. Hero: grid-pattern + aurora wash, live-dot badge, huge two-line headline with gradient
   second line, product screenshot in a scooped-corner glass card with floating stat chips.
2. Platform marquee strip: "Finance · Logistics · Wellness · …" with cyan node separators.
3. Stats band: navy surface with gradient hairline dividers and mono numerals that count up.
4. Platforms grid: image tiles with frosted icon chips, Live pills, hover reveal.
5. CTA band ("How would you like to begin?") repeated as the conversion spine on every page.
6. Ghost watermark type ("FLOWZA" / section numerals) at very low opacity behind key sections.

---

## 4. Information architecture & routes

### 4.1 Site map (new)

| Route                                                               | Page                         | Rendering              | Notes                                                                                                                                                                       |
| ------------------------------------------------------------------- | ---------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                                                 | Home                         | Static                 | TopBar → Nav → Hero → Client marquee → Platforms grid → How It Works → Why FlowZa + stats → Finance spotlight → Pricing section → Testimonials → Action trio → FAQ → Footer |
| `/products`                                                         | Platforms hub                | Static                 | **New** — entity hub for the 7 platforms (currently only `/#platforms`); improves crawlability + internal linking                                                           |
| `/products/[slug]`                                                  | 7 platform pages             | Static (SSG)           | Hero, stats band, 6 features, 3 steps, testimonial, related platforms, CTA band, FAQ                                                                                        |
| `/products/finance`                                                 | Flagship page                | Static                 | Absorbs the FinanceDemo content: screenshot showcase carousel, 8 back-office modules, multi-country compliance, integrations, security, pricing                             |
| `/pricing`                                                          | Pricing                      | Static                 | **New** dedicated page (plans + toggle + FAQ + Enterprise Plus); home keeps a pricing section linking here                                                                  |
| `/get-started`                                                      | Trial funnel                 | Static                 | Live trials (Finance, Club) + coming-soon → tagged contact leads                                                                                                            |
| `/about`                                                            | Company                      | Static                 | Story, mission, values, stats                                                                                                                                               |
| `/locations`                                                        | Offices                      | Static                 | 3 offices with entity names                                                                                                                                                 |
| `/contact`                                                          | Contact                      | Static + Server Action | Form → Supabase `contact_submissions`; `?service=` pre-select preserved                                                                                                     |
| `/docs`, `/help`, `/status`                                         | Support hub, FAQ hub, status | Static                 | Rebuilt honestly (see §10.6)                                                                                                                                                |
| `/privacy`, `/terms`, `/cookies`                                    | Legal                        | Static (MDX)           | TOC + scroll-spy preserved                                                                                                                                                  |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` | Machine endpoints            | Build-time             |                                                                                                                                                                             |
| 404 / error pages                                                   |                              | Static                 | Branded, with recovery links                                                                                                                                                |

**Redirects (permanent):** `/finance` → `/products/finance`, `/finance-demo` → `/products/finance`.

**Deferred (infrastructure built, routes enabled only when real content exists):**
`/customers` (customer stories), `/blog` (MDX pipeline), `/careers`. The current files for these
are orphaned and largely fabricated — shipping fake press/funding stories is a brand risk.

### 4.2 Navigation

- **Top utility bar** (navy): WhatsApp, email, hours, location, "All systems operational" → `/status`.
- **Header** (white, sticky, hide-on-scroll-down/reveal-on-scroll-up): logo block, Home,
  Platforms (accessible mega-menu, 7 items + hub link), Pricing, About, Contact; gradient
  "Start Free Trial" CTA. Radix NavigationMenu → full keyboard/ARIA support.
- **Footer** (navy): brand + hours card + socials | Quick Links | Platforms | Contact info,
  trust-badge strip, legal links, copyright.
- **Breadcrumbs** on all inner pages (UI + BreadcrumbList JSON-LD).
- **Floating WhatsApp pill** bottom-right, dismissible, on every page.

---

## 5. Technology stack

| Layer            | Choice                                          | Version        | Rationale                                                                                                                                                                                                                                                                                 |
| ---------------- | ----------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework        | **Next.js (App Router)**                        | **16.2.x**     | 15.x moved to the maintenance/backport line (15.5.22); 16 is the current stable with stable Turbopack builds, Cache Components, and improved image pipeline. Same App Router model as 15 — this _is_ the "latest stable" the brief asks for. Fallback to 15.5 possible if you require it. |
| UI               | React                                           | 19.2.x         | Server Components by default; client islands only where interactive                                                                                                                                                                                                                       |
| Language         | TypeScript (strict)                             | 5.9.x          | TS 7 (native compiler) is too new for full ecosystem safety; 5.9 is the stable line                                                                                                                                                                                                       |
| Styling          | Tailwind CSS                                    | 4.3.x          | CSS-first `@theme` tokens = the design-token system                                                                                                                                                                                                                                       |
| Components       | shadcn/ui (Radix)                               | latest         | Fully restyled to the Flowza language; only the primitives we need (button, accordion, navigation-menu, sheet, select, input, textarea, badge, tabs, sonner)                                                                                                                              |
| Motion           | Motion                                          | 12.x           | `LazyMotion` + `m` for a ~6 KB footprint                                                                                                                                                                                                                                                  |
| Icons            | lucide-react                                    | latest         | Tree-shaken imports                                                                                                                                                                                                                                                                       |
| Fonts            | next/font (self-hosted variable)                | —              | Instrument Sans + IBM Plex Mono, subsetted, zero layout shift                                                                                                                                                                                                                             |
| Content          | Typed TS modules + MDX (`@next/mdx`)            | —              | Content is small and developer-managed → no CMS. Sanity can be added later behind the same content interfaces if non-dev editing is ever needed                                                                                                                                           |
| Forms/validation | Server Actions + zod                            | —              | Progressive enhancement; honeypot + minimal rate limiting                                                                                                                                                                                                                                 |
| Backend          | Existing Supabase project                       | supabase-js v2 | Same table, same RLS path — admin portal untouched                                                                                                                                                                                                                                        |
| Deploy           | Cloudflare Workers via `@opennextjs/cloudflare` | —              | Official Cloudflare-supported Next.js path; full SSR/Server Action support                                                                                                                                                                                                                |
| CI               | GitHub Actions                                  | —              | typecheck → lint → build → Lighthouse CI budget                                                                                                                                                                                                                                           |
| Container        | Dockerfile (standalone output)                  | Node 24 LTS    | Portability outside Cloudflare                                                                                                                                                                                                                                                            |

Deliberately **not** included: GSAP/three.js/Lenis (heavy, unneeded), CMS, analytics (none exist
today; cookieless Cloudflare Web Analytics can be enabled later — see §10.8), i18n/Arabic (out of
scope per the previous spec).

---

## 6. Folder structure

```
flowzaweb/
├─ .github/workflows/ci.yml          # typecheck, lint, build, Lighthouse budget
├─ docs/                             # this document + future ADRs
├─ public/                           # favicons, brand images, product screenshots (optimized)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  # root: fonts, theme, TopBar/Header/Footer shell
│  │  ├─ page.tsx                    # home
│  │  ├─ products/page.tsx           # platforms hub
│  │  ├─ products/[slug]/page.tsx    # generateStaticParams over 7 platforms
│  │  ├─ pricing/ get-started/ about/ locations/ contact/
│  │  ├─ docs/ help/ status/
│  │  ├─ (legal)/privacy|terms|cookies/  # MDX-backed
│  │  ├─ not-found.tsx  error.tsx
│  │  ├─ sitemap.ts  robots.ts  manifest.ts
│  │  ├─ llms.txt/route.ts
│  │  └─ opengraph-image.tsx (+ per-route og images via next/og)
│  ├─ components/
│  │  ├─ ui/            # customized shadcn primitives
│  │  ├─ layout/        # TopBar, Header, MegaMenu, Footer, Breadcrumbs, WhatsAppFloat, SkipLink
│  │  ├─ sections/      # Hero, PlatformsGrid, StatsBand, HowItWorks, WhyFlowza,
│  │  │                 # FinanceSpotlight, PricingTable, Testimonials, ActionTrio,
│  │  │                 # FaqAccordion, CtaBand, LogoMarquee, SectionHeading, Eyebrow
│  │  ├─ motion/        # Reveal, Stagger, CountUp, Marquee, motion tokens
│  │  └─ seo/           # JsonLd component + typed schema builders
│  ├─ content/
│  │  ├─ site.ts        # brand, contacts, socials, nav, trust badges  ← single source of truth
│  │  ├─ products.ts    # 7 platforms: full typed records (features, steps, stats, colors, images)
│  │  ├─ pricing.ts     # plans, features, yearly discount, CTAs
│  │  ├─ testimonials.ts, faqs.ts, stats.ts, values.ts, locations.ts
│  │  └─ legal/*.mdx
│  ├─ lib/
│  │  ├─ actions/contact.ts          # Server Action → Supabase insert
│  │  ├─ supabase.ts                 # server-side client, isConfigured guard
│  │  ├─ seo.ts                      # metadata factory (title template, canonical, OG)
│  │  └─ utils.ts
│  └─ styles/globals.css             # @theme tokens: colors, type, spacing, radius, motion
├─ next.config.ts  tsconfig.json  eslint.config.mjs  prettier.config.mjs
├─ open-next.config.ts  wrangler.jsonc
├─ Dockerfile
└─ README.md
```

---

## 7. Component & design-system strategy

- **Server-first:** every page is a Server Component; client islands are limited to: header
  (scroll behavior + mega menu + mobile sheet), accordion, pricing toggle, contact form,
  screenshot carousel, count-up/reveal wrappers. Everything else ships zero JS.
- **Three tiers:** `ui/` (primitives, shadcn-derived, fully restyled) → `sections/`
  (marketing patterns, content-agnostic, take typed props) → pages (compose sections and feed
  them from `content/`). No copy lives in components.
- **Variants** via `class-variance-authority` (comes with shadcn): button
  (primary-gradient / whatsapp / outline / ghost × sizes), badge, card treatments.
- **One `<Section>`/`<Container>` primitive** owns rhythm (fluid padding, tint variants,
  optional ghost-text/watermark slot) so every page inherits identical spacing.
- **Per-product theming** through a `--product-accent` CSS variable set at the page level —
  the same section components render each platform in its accent color.

---

## 8. SEO & AI-SEO plan

- **Metadata:** `lib/seo.ts` factory → unique title/description per route, title template
  (`%s — FlowZa AI`), canonical URLs, OG + Twitter cards with **generated OG images** (next/og,
  branded per page), `metadataBase` from env.
- **Structured data** (typed builders, one `@graph` per page):
  `Organization` (logo, sameAs, contactPoint) + `WebSite` on all pages;
  `SoftwareApplication` (with `offers` for Finance pricing) per platform;
  `FAQPage` wherever FAQs render; `BreadcrumbList` on inner pages; `AboutPage`,
  `ContactPage`, `CollectionPage` (products hub), `OfferCatalog` (pricing).
- **Sitemap:** `sitemap.ts` with lastmod + image entries; robots.txt allowing AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) explicitly.
- **llms.txt:** generated from the content layer — brand summary, platform inventory with
  one-line descriptions, canonical URLs, contact facts. (An `llms-full.txt` with full page
  content can be added later.)
- **Entity-first IA:** `/products` hub ↔ 7 platform pages ↔ pricing ↔ FAQs cross-linked;
  consistent entity naming ("FlowZa Finance" etc.) in headings, alt text, and schema.
- **Semantic HTML:** one `<h1>` per page, sequential headings, `<main>/<nav>/<footer>` landmarks,
  descriptive alt text on every meaningful image (fixing the reference's empty-alt habit).
- **Machine-readable content:** FAQs and feature lists rendered as real text in the HTML
  (static rendering means no JS required to read anything).

## 9. Accessibility, performance, quality gates

**Accessibility (WCAG 2.2 AA):** skip link; Radix-powered keyboard-accessible menus/accordions;
`:focus-visible` rings everywhere; `aria-live` form errors + `aria-invalid` styling; 16px+ form
inputs (no iOS zoom); contrast-checked tokens; `prefers-reduced-motion` honored globally;
correct landmark/heading structure; alt-text discipline enforced in the content layer.

**Performance:** fully static pages (Server Actions are the only dynamic path); `next/image`
with AVIF/WebP, explicit dimensions (zero CLS), `priority` hero only, lazy everything else;
self-hosted subsetted variable fonts; LazyMotion; CSS marquees instead of JS; route-level code
splitting; preconnect only where needed; long-cache immutable assets. Existing PNG screenshots
re-encoded to AVIF/WebP at build-appropriate sizes.
**Budgets (CI-enforced):** Lighthouse ≥ 95 all categories on `/`, `/products/finance`, `/pricing`;
LCP < 1.8s, CLS < 0.05, INP < 200ms on mid-tier mobile emulation.

**Quality:** strict TS (`noUncheckedIndexedAccess`), ESLint 9 + typescript-eslint,
Prettier, CI on every push; browser QA pass (desktop/tablet/mobile) before handover.

---

## 10. Content reconciliation — proposed resolutions

These change presentation, not business meaning, unless flagged ⚠ (needs your confirmation):

1. **Pricing:** canonical = **$15 / $40 / $60 + Enterprise Plus, 25% yearly discount** (matches
   seeded DB + live trial URLs). The $49/$99 FinanceDemo table is dropped. ⚠ confirm.
2. **Legal entity:** ⚠ needs your answer — which entity signs the legal pages and copyright
   (FlowZa AI FZ-LLC Dubai vs SoarTek LLC / CloudValley). Locations page keeps all three offices.
3. **Discount claims:** 25% yearly everywhere; drop "20% annual + 15% bundle" from Help. ⚠ confirm.
4. **Compliance claims:** ⚠ needs your answer — keep only claims you can substantiate
   (SOC 2 vs ISO 27001 vs both). Default if unanswered: soften to "enterprise-grade security,
   encryption at rest/in transit, role-based access, audit trails" and drop certification names.
5. **Product colors:** canonical = detail-page palette (fleetza `#7c5ff5`, pos `#8b5cf6`).
6. **Status page:** rebuilt as an honest "operational overview" without fabricated uptime
   decimals/incidents (real status can be wired to an API later). Docs/Help keep only real
   facts; fictional article counts and video tutorials are dropped; the dead `/api-reference`
   link is removed.
7. **Fabricated content:** Press/Blog/Careers/CustomerStories stay out of the launch route
   graph (fake funding/press is a liability). Blog + customers infrastructure is built and
   ready for real content. ⚠ if the 6 Omani client stories (Root Projects, Dhofartec, Defenders
   LLC, Star Safe Solutions, Future Space LLC, Suwaiq Modern) are real, say so and `/customers`
   ships at launch.
8. **Phone +971 4 200 0000:** dropped (placeholder-looking); WhatsApp + emails remain.
9. **Club image:** a branded gradient/screenshot-style tile is designed in-code until a real
   `/product-club.webp` asset exists.
10. **Testimonials:** homepage keeps the home set (Khalid Al-Rashid, Lena Voss, Omar Hassan);
    product pages keep their productDetails set — treated as different customers, numbers not
    mixed. "FlowZa PMS" stays in the contact service list (lead tagging parity).

---

## 11. Forms & backend integration

- Contact form fields, mapping (`company` prepended to message, service → subject), and the
  `?service=` pre-select behavior are preserved exactly → `contact_submissions` insert with the
  anon key (same RLS path), executed in a **Server Action** (adds honeypot, zod validation, and
  basic rate limiting; still works without JS).
- Graceful degradation: if Supabase env vars are absent, the form renders a WhatsApp fallback
  (same behavior as today).
- Env contract unchanged: `SUPABASE_URL` + `SUPABASE_ANON_KEY` (server-side now, not `VITE_*`).
- `/adm` portal, edge functions, and all service-role tables are untouched. If the portal stays
  on the old origin, its CORS `SITE_URL` env needs no change; flag when domains switch.

## 12. Deployment

- **Primary:** Cloudflare Workers via `@opennextjs/cloudflare` + `wrangler.jsonc`; static assets
  on Cloudflare's edge cache, Server Actions run in the Worker.
- **CI/CD:** GitHub Actions — PR: typecheck/lint/build/Lighthouse; main: deploy (gated, only
  after your approval — no auto-deploy will be configured without it).
- **Docker:** multi-stage Dockerfile (Node 24, `output: 'standalone'`) for non-Cloudflare hosting.

---

## 13. Implementation plan (after approval)

| Phase              | Scope                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Foundation      | Scaffold Next 16 + TS strict + Tailwind v4 tokens + fonts + shadcn primitives + motion tokens; layout shell (TopBar, Header/mega-menu, Footer, WhatsApp float, breadcrumbs) |
| 2. Content layer   | Typed content modules with all reconciled copy/facts; image pipeline (re-encode screenshots)                                                                                |
| 3. Home            | All 10 home sections, fully polished                                                                                                                                        |
| 4. Platforms       | Hub page + product template + 7 pages incl. the Finance flagship build-out                                                                                                  |
| 5. Conversion      | Pricing page, Get Started, Contact (Server Action + Supabase)                                                                                                               |
| 6. Company/support | About, Locations, Docs, Help, Status                                                                                                                                        |
| 7. Legal           | MDX pipeline + 3 legal pages with TOC                                                                                                                                       |
| 8. SEO/AI layer    | Metadata factory, JSON-LD builders, sitemap/robots/llms.txt, OG images                                                                                                      |
| 9. Hardening       | A11y sweep, performance audit vs budgets, cross-device browser QA, 404/error pages                                                                                          |
| 10. Ship-ready     | CI workflow, Dockerfile, Cloudflare config, README + docs                                                                                                                   |

Each phase ends with a working, reviewable state. Nothing is pushed/deployed without approval.

---

## 14. Hardening log (2026-07-26)

A 5-dimension audit (accessibility, SEO/structured data, content parity, code
correctness, performance) ran over the finished build, with every finding put through an
adversarial verifier before being accepted: **49 findings raised, 43 confirmed, 6 refuted.**
All 43 are fixed. The substantive ones:

**Colour contrast (WCAG 1.4.3 / 1.4.11).** The brand gradients were too light to carry
text. The design system now separates them by purpose, each documented with its measured
ratio: `fx-gradient` (surfaces with white text, 5.4–6.7:1), `fx-gradient-text` (large
display text only, 3.7–5.2:1), `fx-gradient-text-strong` (small text, ≥5.4:1),
`fx-gradient-text-light` (dark surfaces, ≥10.5:1), and `fx-gradient-vivid` (decorative,
never text). Measured after the fix: primary CTA 5.4–6.7:1 (was 2.4:1), "Live" badge
7.8:1 (was 2.5:1), homepage step numerals 5.5–7.0:1 (one was 2.5:1), hero pills 7.6:1.

**Per-product accents.** Every platform gained a `colorDeep` field — a 700/800 shade that
is safe both as text on white and behind white text. The bright `color` is now
decorative-only (tints, dots, icon tiles, washes). The platform stats band moved from a
per-product gradient to navy with an accent wash, taking its labels from ~2.0:1 to 18.8:1;
the "Launch" CTA and step numerals now derive from `colorDeep` (5.5–9.0:1, were 2.1–3.9:1).

**LCP was gated on hydration.** All above-fold content sat at `opacity: 0` until React
hydrated. `Reveal` gained an `immediate` mode backed by a pure-CSS keyframe animation that
runs at stylesheet parse time; hero, page headers and platform heroes use it, so first
paint no longer waits on JS. The reveal transition also dropped its `filter: blur()`, which
was forcing full repaints of full-width screenshots.

**Contact form data loss.** React 19 resets uncontrolled fields once a form action
resolves, so any validation error wiped everything typed. The action now echoes submitted
values back through `ContactFormState` and every field rehydrates from them. Separately,
`useSearchParams` was forcing a client-side bailout that stripped the entire form out of
the prerendered HTML — the `?service=` preselect now runs in a post-hydration effect, and
the form ships in static HTML. The honeypot was renamed off `website`, a field name browser
autofill recognises, which could have silently discarded real submissions.

**Other fixes.** Exact yearly pricing ($11.25, not a rounded $11 nobody is charged);
`motion` removed as a dependency (CountUp is now a hand-rolled rAF tween writing
`textContent`, so stat bands cost no React renders); the Finance showcase gained a WCAG
2.2.2 pause control, the full ARIA tabs keyboard pattern (roving tabindex, arrows,
Home/End) and now mounts 3 images instead of 9; marquees pause on hover and focus; correct
intrinsic image dimensions (1013px, not 980px) to remove CLS on the LCP element;
per-tile `sizes` for the double-width flagship tile; duplicate `FAQPage` markup removed
from `/pricing`; `og:url` no longer inherited site-wide; `OfferCatalog.provider` replaced
with per-offer `seller`; structured data added to `/get-started`; `og:image:alt` on platform
OG images; sitemap no longer stamps every URL with the build time; `<dl>` markup corrected
so labels precede values; a real `<h1>` on the 404 page; and several content-parity
restorations (24/7 support highlight, "Other Locations" label, curated client initials,
short landing-grid taglines, exact "Customer Obsession" wording).

**Known tradeoff (accepted).** `PricingSection` is a client component for its
monthly/yearly toggle, so its plan markup hydrates on `/`, `/pricing` and
`/products/finance`. Splitting the toggle into a leaf component with CSS-driven price
switching is a worthwhile future optimisation; the current cost is a few milliseconds and
was not worth a late-stage refactor.

**Verified in the production build:** all 16 routes return correctly with exactly one `<h1>`
and a unique title; the contact form is present in static HTML; structured data resolves to
one `FAQPage`, one `Organization`, one `WebSite` and one `WebPage` on the homepage; the
Cloudflare worker builds; `format:check`, `lint`, `typecheck` and `build` all pass clean.

### 14.1 Client-bundle split (follow-up)

Measuring the shipped bundle surfaced one more issue the audit had flagged only in
principle: `Header` is a client component and imported `PLATFORMS`, so every page shipped
all seven platforms' long descriptions, features, steps, stats and testimonials to the
browser. The nav-facing fields now live in `src/content/platforms-nav.ts` — the single
definition of slug, name, taglines, colours, icon, `appUrl`, `live` and image — which
`products.ts` spreads into the full records. The client header imports only that module.

Measured on the production build (modern browsers, gzipped, excluding the `noModule`
legacy polyfill chunk which modern browsers never execute):

|                      |                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| First-load JS        | **192 KB** (~160 KB of that is the React 19 + Next 16 App Router floor)                                         |
| App code share       | ~30 KB                                                                                                          |
| Homepage HTML        | 38 KB                                                                                                           |
| Runtime dependencies | 17 (`motion`, `@radix-ui/react-label`, `@radix-ui/react-select` and `@mdx-js/react` were all removed as unused) |

Product copy is verified absent from every client chunk.

---

## 15. Redesign to the sample-design language (2026-07-26)

The first build reinterpreted the reference rather than adopting it, and was
rejected. The root cause was method: the design system was derived from a written
analysis of `sample-design` without the reference ever being rendered.

**Correction.** `sample-design`'s Twig templates were rendered to static HTML (in
the scratchpad — the folder itself is never written to) and served with its real
compiled stylesheet, then every value was read off the live page with
`getComputedStyle`. The design system is now ported from those measurements
rather than approximated.

### What the reference actually is

|                | Reference                                                                  | First build (wrong)             |
| -------------- | -------------------------------------------------------------------------- | ------------------------------- |
| Family         | Plus Jakarta Sans alone                                                    | Instrument Sans + IBM Plex Mono |
| Heading weight | **500**                                                                    | 600–640                         |
| Body weight    | **300**, lede **200**                                                      | 400                             |
| Hero h1        | 51.07px, tracking −1.92→−2.25px                                            | heavier, looser                 |
| Section rhythm | **51.2px** (`clamp(2.5rem,4vw,8rem)`)                                      | 72–144px                        |
| Footer         | light **#fafafa**                                                          | dark navy slab                  |
| Punctuation    | solid accent full-bleed bands                                              | dark navy bands                 |
| Radii          | pill 25.6px on cards _and_ FAQ rows; 15px chips; **72px one-sided scoops** | small uniform radii             |
| Cards          | the image _is_ the card, 60px frosted arrow chip rotated −45°              | navy tiles with overlay         |
| Grid           | flex-wrap with **1.2%** gutters                                            | CSS grid                        |
| Marquee        | 38.4px/500/−1.28px in **#dadae0** with accent `*` separators               | small pills                     |
| Signature FX   | green radial `.shade` leak; conic `.glow` ring (blur 200px, 4s)            | cyan/blue aurora                |

### Verified after the rebuild

Measured on the running site against the reference's numbers: hero h1 **51.07px
/ 500 / −2.25px** with the same `background-clip` gradient; section padding
**51.2px**; h2 **29.79px / 500** (ref 29.81); lede **19.84px / weight 200** (ref
20.15/200); buttons **25.6px radius, 0.5px tracking, weight 500** with the inset
bevel; card radius **25.6px**; arrow chip **60px, 100% radius, −45°**; number
chips **50×50 at 15px radius** with the tinted shadow; FAQ rows **25.6px on
#fafafa**; marquee **38.4px / 500 / −1.27px in #dadae0**; footer **#fafafa**.

### Two deliberate departures

**Contrast.** The reference's bright green `#40B657` under white text measures
**2.61:1** — below the 4.5:1 this project requires. Rather than invent a colour,
text-bearing surfaces (filled buttons, solid bands, Live pills, numerals, accent
text) use the reference's _own_ secondary teal `#137865`, which measures
**5.38:1**. Bright `#40B657` is retained wherever it is decorative: the radial
shade, dots, borders, card scrims, hover states and the marquee asterisks. To
trade contrast back for exact fidelity, point `--color-accent-deep` at `#40b657`
in `globals.css`.

**Photography.** The branded shoot in `../images` is wired in. One WebP per
photograph at its native 3:2 lives in `public/images/photos/` (75–120 KB, down
from ~2 MB PNGs), and every crop — 1:1 card, 4:5 hero, 16:7 banner — is done in
CSS via `object-fit`/`object-position`, so no photo is stored twice and changing a
ratio costs nothing. `ImageSlot.focal` lets the content layer set the crop window
per photo; `ImageFrame` still falls back to a labelled placeholder for any slot
without a `src`. Run `npm run optimize:photos` to re-encode after a new shoot.

| Photo             | Used for                                     | Card focal    | Banner focal  |
| ----------------- | -------------------------------------------- | ------------- | ------------- |
| `brand-expo.webp` | homepage hero (4:5) + `/products` hub banner | `left center` | `left center` |
| `finance.webp`    | Finance card + page banner                   | `88% center`  | centre        |
| `logispro.webp`   | LogisPro card + banner                       | `14% center`  | centre        |
| `spamaster.webp`  | Spa Master card + banner                     | `left center` | centre        |
| `fleetza.webp`    | Fleetza card + banner                        | centre        | `center 12%`  |
| `qrforge.webp`    | QRForge card + banner                        | centre        | centre        |
| `pos-cafe.webp`   | POS card                                     | centre        | —             |
| `pos-retail.webp` | POS page banner                              | —             | centre        |
| `club.webp`       | Club card + banner                           | `85% center`  | `center 85%`  |

`Finance2.png` is deliberately **unused**: it is a marketing poster with a
baked-in headline, feature icon strip and QR code, which would fight the page's
own H1, be unreadable at card size, and put meaningful text inside an image. It
also spells the brand "Flowza" rather than "FlowZa". It remains a good
social/print asset.

Focal points were chosen by rendering each actual crop and inspecting it. A
centre crop slices the Club standee, the Finance wall sign and the Spa Master
sign mid-word, and cuts the top off the Fleetza driver's head — all of which read
as mistakes rather than as crops. The homepage hero uses `brand-expo.webp`
specifically so that no photograph appears twice on one page; `/` and `/products`
each render eight distinct photos (verified by parsing the built HTML).

**Overlay contrast over photography.** Card chrome (Live pill, index numeral,
arrow chip) sits on photographs, not flat colour, so a scrim alone is not
sufficient: measured against the brightest pixel beneath each glyph, the index
numeral fell to **1.02:1** on Spa Master and **1.03:1** on Club — white on white.
Both the numeral and the arrow chip now carry their own dark frost
(`fx-frost`, and `fx-arrow-chip::before` inverted from the reference's _light_
5 % frost to `rgb(4 22 10 / 0.62)`), and the arrow's hover fill moved from
`--color-accent` to `--color-accent-deep`. Worst case across all 14 overlays is
now **5.35:1**. Re-measure with the canvas-sampling snippet if the photography
changes: sample the peak-luminance pixel under each glyph, composite the frost
over it, and require ≥ 4.5:1.

**Alt text.** Every alt describes only what is literally visible. The imagery is
AI-generated, so on-screen UI contains pseudo-text: alts name the _kind_ of panel
shown, never invented figures, and they do not attribute product branding to a
photograph that does not display it.

### Note on `tailwind-merge`

Custom `text-*` tokens are ambiguous to `tailwind-merge` — it treated `text-h2`
(size) and `text-ink` (colour) as conflicting and silently dropped one, which
rendered every section heading at 16px. `src/lib/utils.ts` now registers both
token groups explicitly. Worth remembering before adding new `text-*` tokens.

---

## 16. Platform roster: seven → nine (2026-07-28)

QRForge went live, and **FlowZa RentFlow** (`08`, `/products/rentflow`) and
**FlowZa PMS** (`09`, `/products/pms`) were added from client-supplied copy. Both
are marked live. Three live platforms became five: Finance, QRForge, Club,
RentFlow, PMS.

**Naming.** The supplied PMS copy called the product "PerfOS" throughout while
the brief called it "PMS". Resolved to **FlowZa PMS** — it is also the name
already present in `SERVICE_OPTIONS`. "PerfOS" appears nowhere in the site.

**Adding a platform touches more than the content file.** For the next one:

| Place                          | What changes                                                                                                                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `platforms-nav.ts`             | `PlatformSlug` union, `PLATFORM_NAV_MAP` entry, `PLATFORM_NAV` array                                                               |
| `products.ts`                  | full record: descriptions, badges, features, steps, stats, `related`                                                               |
| `contact.ts`                   | `SERVICE_OPTIONS` — **schema-adjacent**, becomes `contact_submissions.subject`                                                     |
| `terms.mdx` + `terms/page.tsx` | covered-services list, changelog entry, `version`/`lastUpdated`                                                                    |
| `privacy.mdx`                  | platform count                                                                                                                     |
| Count-bearing copy             | `site.ts`, `home.ts`, `about.ts`, `faqs.ts`, `support.ts`, `footer.tsx`, both OG routes, `/products` + `/about` + `/docs` metadata |

Sitemap, `llms.txt`, JSON-LD, `generateStaticParams`, the mega-menu and the
homepage grid all derive from `PLATFORMS` and needed no edits. The grid is
`flex-wrap` at `lg:w-[32.53%]`, so nine tiles fill three rows exactly.

**Two count bugs this surfaced**, both from hardcoded numbers in copy that should
have been derived:

- `PlatformSteps` hard-coded "Up and Running in **Three** Steps"; PMS runs a
  four-step loop. Now derived from `platform.steps.length`.
- The Finance tour subtitle said "**Nine** powerful modules" — a number that had
  to be maintained by hand and broke the moment a tenth screenshot was wired in.
  Reworded to carry no count.

A blind `seven` → `nine` regex would have rewritten "nine-figure budgets" on
`/about`, so the sweep used explicit string pairs that fail loudly on a miss.

**Two deliberate omissions.**

1. **No testimonials.** `Platform.testimonial` is now optional and
   `PlatformTestimonial` returns `null` without one. Inventing a customer quote
   for a product that launched days ago is fabrication; the section simply does
   not render.
2. **No photography, at first.** Both slots rendered the labelled `ImageFrame`
   placeholder until real shots landed two turns later — see the photography
   addendum below.

**Accents.** RentFlow teal (`#14b8a6` / deep `#0f766e`, **5.47:1**) and PMS indigo
(`#6366f1` / deep `#4338ca`, **7.90:1**) — both `colorDeep` values honour the
4.5:1 contract on that field. The bright values sit below it by design;
`colorSecondary` is used only for OG-card washes, never behind text.

**One content conflict left standing by client decision.** The supplied PMS copy
read "SOC 2 — in progress… no certifications we don't hold", contradicting the
site's existing SOC 2 claim. Raised; the client chose to keep the SOC 2 claim as
complete, so the "in progress" wording was dropped rather than propagated. The
copy's other scope caveat — GCC wage-protection figures computed today, WPS
bank-file export on the roadmap — **is** preserved verbatim on the PMS page.

### 16.1 RentFlow and PMS photography (2026-07-28)

No image-generation tool is available in this session, so the client generated
five AI renders externally from prompts built to match the existing shoot's
lighting/style and the site's teal accent (`optimize-photos.mjs` comment block
has the full prompt), and dropped them in `../images/v2`. Four were selected
from five; one ("Shared style lock" — a generic "+24% Revenue" dashboard) was
excluded for not depicting either product and risking visual overlap with the
real Finance screenshot.

Unlike the first nine photos, RentFlow and PMS each use **two different source
photos** — one for the card, one for the banner — rather than two crops of one
shot. This isn't a new pattern: `pos-cafe.webp` / `pos-retail.webp` already do
this. It reads better here too: the card shows the product's primary screen
(application list / calibration chart) for grid scanning, and the banner shows
the narrative differentiator (screening-and-decide detail / letter
verification) that a product page can afford to spend more space on.

| Photo                  | Used for           | Focal        |
| ---------------------- | ------------------ | ------------ |
| `rentflow.webp`        | RentFlow card      | `85% center` |
| `rentflow-review.webp` | RentFlow page hero | `center 40%` |
| `pms.webp`             | PMS card           | `30% center` |
| `pms-verify.webp`      | PMS page hero      | `center 25%` |

Focals were chosen the same way as before: render the actual crop, verify no
UI element is cut mid-word, confirm overlay contrast against the brightest
pixel beneath each glyph. Worst case across the four new overlays is **5.36:1**
(RentFlow arrow chip) — all clear 4.5:1.

This batch's on-screen UI is markedly cleaner than the first nine: short,
consistent, correctly spelled labels rather than dense pseudo-text, so no crop
needed to dodge illegible text. One cosmetic note for the client: the mock data
shows dates in 2024 (e.g. "Applied on May 24, 2024"), which will read as stale
next to a 2026 site if anyone looks closely — not corrected here since it's
baked into the source render, not something CSS can fix.

Alt text follows the same discipline as §15: describe only what's visible
(an applicant's initials and a blurred name, not an invented full name; "a
colleague visible in a meeting room," not "a calibration session in progress").

---

## 17. Page imagery for the routes with no photography (2026-07-29)

Eleven routes carried no image at all: `/about`, `/contact`, `/pricing`,
`/locations`, `/get-started`, `/help`, `/docs`, `/status`, the three legal
documents and the 404. The branded shoot in `../images` covers products, not
these — there is no photograph of an onboarding path or an uptime record — so
these fifteen images are **drawn**, by `scripts/generate-page-images.mjs`
(`npm run generate:page-images`), and land in `public/images/pages/`.

**Why drawn rather than sourced.** Composing them from the same tokens as
`globals.css` means the accent ramp, the card radius, the elevation tiers and
the 28px lattice `ImageFrame`'s placeholder already draws are shared by
construction, not by eye — and a token change can be pushed through the whole
set by re-running one script. Every scene is emitted as SVG and rasterised
through sharp's librsvg, so output is 9–56 KB per banner against 75–120 KB for
a photograph, and a seeded PRNG (`rng()`) keeps re-runs byte-identical.

**Text-free by rule.** No scene contains a glyph of type. A headline baked into
a raster can't be translated, re-cropped or read by a screen reader, and it goes
stale independently of the copy beside it. Structure is carried by the UI
skeleton idiom — grey bars where text would sit — which is also why the set
needs no font installed on the machine that renders it. It follows that alts
here describe the _kind_ of panel and its state, never a figure the image
appears to quote.

**One ratio.** Every banner is authored at 16/7, matching the `/products` hub
banner that already existed, so `PageHeader` grew a single `image?: ImageSlot`
prop instead of a per-page crop. `/products` was refactored onto that prop and
its inline `ImageFrame` block deleted. Only the office cards differ (16/9, sized
for a card header).

| Image                   | Route              | Shows                                                              |
| ----------------------- | ------------------ | ------------------------------------------------------------------ |
| `about.webp`            | `/about`           | nine platforms orbiting one shared core                            |
| `contact.webp`          | `/contact`         | a WhatsApp-style thread mid-reply, beside the three contact routes |
| `locations.webp`        | `/locations`       | dot-matrix regional map, three hubs, dashed routes between them    |
| `locations-{city}.webp` | `/locations` cards | street plan per office, tinted with that office's `accent`         |
| `get-started.webp`      | `/get-started`     | the five onboarding steps, three done and one in progress          |
| `help.webp`             | `/help`            | search, six topic tiles, one answer expanded                       |
| `docs.webp`             | `/docs`            | contents rail, prose column, dark code sample                      |
| `status.webp`           | `/status`          | daily uptime bars with one amber dip, SLA ring, latency trace      |
| `pricing.webp`          | `/pricing`         | monthly vs yearly billing over 12 months, and the saving           |
| `legal-{doc}.webp`      | legal pages        | the document, its mark (shield / page+tick / cookie), clause index |
| `not-found.webp`        | 404                | a card grid with one tile missing                                  |

**Two judgement calls worth keeping.** The office cards started as skylines;
flat saturated blocks read as clip-art next to this design system and fought the
address text under them, so they became plan views instead — which also rhyme
with the dot-matrix banner higher up the page. And `/pricing` started as a
drawing of three plan columns, which put an illustration of the plan grid
directly above the real plan grid; it now shows the billing comparison and the
yearly saving, the part of the pricing story the component below doesn't tell.

The `/pricing` banner renders only when `PricingSection` has `standalone` set —
the homepage instance of that section sits below the hero and doesn't need a
second piece of artwork.

---

## 18. Pricing: one Finance table → nine independently priced products (2026-07-30)

`/pricing` quoted three FlowZa Finance tiers and nothing else, so eight of the
nine platforms had no price anywhere on the site. It is now one section per
product, each sourced from that product's **own billing table**, read over the
Supabase MCP connection rather than transcribed.

### What the databases actually said

| Product        | Source                                          | Published                                  |
| -------------- | ----------------------------------------------- | ------------------------------------------ |
| Finance        | `Flowza_Finance_PRD · public.plans`             | $16 / $44 / $66 + Enterprise Plus (custom) |
| LogisPro       | `Flowza_LogisPro · public.subscription_plans`   | $299 / $699 / $1,499                       |
| PMS            | `Flowza_PMS · public.subscription_plans`        | Free / $49 / $149 / $399                   |
| QRForge        | `Flowza_QR_Dev · public.subscription_plans`     | Free / $9 / $29 / $79                      |
| Spa Master     | `Flowza_SpaManager · public.subscription_tiers` | **withheld** — see below                   |
| Club, RentFlow | no plan table exists                            | quoted                                     |
| POS, Fleetza   | no database in the account                      | quoted                                     |

### Three findings that changed the work

**The site was under-quoting Finance.** The page said $15 / $40 / $60; the
billing table says **$16 / $44 / $66**. A marketing page that quotes less than
the invoice charges is worse than one that quotes nothing, so the published
figures now come from the table.

**Yearly totals must be stored, not computed.** The old code derived yearly from
monthly with a flat 25%. That is wrong for Finance Enterprise ($66/mo, $600/yr —
the formula predicts $594) and wrong for every other product, whose real
discounts are 17% (LogisPro, structured as ten months' price), 20% (PMS) and
18–21% (QRForge). `PricingTier.yearly` is now the number the invoice shows, and
`yearlySavingPercent()` derives the _percentage_ from it, never the reverse.

**Spa Master's ladder is inverted.** `subscription_tiers` has Starter $149 >
Professional $119 > Enterprise $99, while `max_branches`, `max_staff` and
`max_users` all ascend correctly. That reads as a data fault rather than a
pricing strategy, so Spa Master publishes no number and routes to sales. Nothing
was written back to that database — the fix belongs to whoever owns it.

### Structure

All nine products render in the DOM at once, under a sticky anchor nav, rather
than behind tabs — the whole price list stays crawlable and Cmd-F-able.

The monthly/yearly switch carries **no pricing data**. Each tier renders both
figures server-side inside `[data-price="monthly"]` / `[data-price="yearly"]`
spans; `BillingToggle` flips `data-billing` on one wrapper and two rules in
globals.css reveal the matching set. So nine products' prices ship in the static
HTML, and with JS off the page still shows monthly — the server-rendered
default — instead of nothing.

`PricingSection` reverted to what its name implies: a Finance-only teaser for the
homepage and the Finance product page, now a server component with no toggle,
pointing at `/pricing` as the single place every platform's price is stated.
`offerCatalogNode()` emits a nested OfferCatalog per product, and `softwareNode()`
attaches offers to any platform that publishes a list price — quoted platforms
get none, since a zero-price Offer reads to Google as free.

Prices that came from a **dev** database (QRForge) or from a table with no
currency column (LogisPro, PMS — USD inferred from the Stripe/provider price IDs
beside them) are flagged in `pricing.ts` at the point of use. Re-verify those
before they go to production.
