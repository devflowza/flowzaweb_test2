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
- **Design:** a new "Operating Fabric" design language — Flowza's cyan→blue brand on a
  light, editorial, fluid-token system inspired by the reference site's _concepts_ (not its code):
  clamp-based fluid type/spacing/radius, section primitives, signature marquee, aurora light-leaks,
  glass accents, stats bands, doc-style flagship product page.
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
