# Flowza.ai — Website

The flagship marketing website for **FlowZa AI** ("Business Operating Systems") — seven
purpose-built AI platforms on one operating fabric, built for MEA & India.

Fully static-first Next.js App Router site with a typed content layer, a custom
"Operating Fabric" design system, complete SEO/AI-SEO scaffolding, and a Supabase-backed
contact pipeline that remains compatible with the existing `/adm` admin portal.

## Stack

| Layer      | Choice                                                          |
| ---------- | --------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack), React 19, TypeScript strict |
| Styling    | Tailwind CSS v4 — design tokens in `src/styles/globals.css`     |
| Components | Radix primitives, restyled (`src/components/ui`)                |
| Motion     | CSS keyframes/transitions + rAF count-ups — zero animation deps |
| Content    | Typed TS modules + MDX (`src/content`)                          |
| Backend    | Supabase (contact form → `contact_submissions`, RLS insert)     |
| Deploy     | Cloudflare Workers via OpenNext · Docker (standalone) fallback  |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site runs without Supabase (WhatsApp fallback)
npm run dev
```

| Script                    | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| `npm run dev`             | Dev server (Turbopack)                        |
| `npm run build` / `start` | Production build / serve                      |
| `npm run lint`            | ESLint (flat config, next/core-web-vitals)    |
| `npm run typecheck`       | `tsc --noEmit`                                |
| `npm run format`          | Prettier                                      |
| `npm run optimize:images` | Re-run the sharp asset pipeline               |
| `npm run cf:build`        | Build the Cloudflare worker (`.open-next/`)   |
| `npm run cf:preview`      | Preview on the workerd runtime locally        |
| `npm run cf:deploy`       | Deploy to Cloudflare Workers (approval-gated) |

## Project layout

```
src/
├─ app/          # routes (all static), sitemap/robots/manifest/llms.txt, OG images
├─ components/
│  ├─ ui/        # button, badge, accordion, inputs (Radix + cva)
│  ├─ layout/    # TopBar, Header (mega menu), Footer, PageHeader, breadcrumbs…
│  ├─ sections/  # homepage + shared marketing sections (CtaBand, pricing…)
│  ├─ platform/  # product-page template sections (per-product accent theming)
│  ├─ finance/   # flagship-only sections (showcase carousel, modules…)
│  ├─ contact/   # contact form (Server Action client)
│  ├─ legal/     # MDX legal frame + scroll-spy TOC
│  ├─ motion/    # Reveal (CSS + IntersectionObserver), CountUp, Marquee
│  └─ seo/       # JsonLd renderer
├─ content/      # ← SINGLE SOURCE OF TRUTH for all copy, products, pricing, FAQs
├─ lib/          # seo builders, supabase client, server actions, fonts, utils
└─ styles/       # globals.css — the entire design-token system (@theme)
```

**Editing content:** everything user-visible lives in `src/content/*.ts` and
`src/content/legal/*.mdx`. Components take typed props from these modules; no copy is
hardcoded in components.

## Environment

| Variable               | Purpose                                                          |
| ---------------------- | ---------------------------------------------------------------- |
| `SUPABASE_URL`         | Supabase project URL (contact form). Optional — degrades safely. |
| `SUPABASE_ANON_KEY`    | Public anon key (RLS-enforced INSERT only).                      |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonicals/OG (default `https://flowza.ai`). |

The contact form inserts rows shaped exactly as the existing admin portal expects
(`name`, `email`, `phone`, `subject` = service of interest, `message` with `Company:`
prefix). Do not change `src/content/contact.ts` service options or the insert mapping in
`src/lib/actions/contact.ts` without checking the portal.

## Deployment

**Cloudflare Workers (primary):** `npm run cf:build` produces `.open-next/`; deploy with
`npm run cf:deploy` (needs `CLOUDFLARE_API_TOKEN`; set `SUPABASE_URL`/`SUPABASE_ANON_KEY`
via `wrangler secret put`). CI (`.github/workflows/ci.yml`) runs format/lint/typecheck/build
on every push.

**Workers Builds (git-connected):** this must be a **Workers** project, not Pages —
`wrangler.jsonc` declares a worker (`main`, `assets`), not a `pages_build_output_dir`.
Settings → Build:

| Setting        | Value                     |
| -------------- | ------------------------- |
| Build command  | `npm run cf:build`        |
| Deploy command | `npx wrangler deploy`     |
| Node version   | from `.node-version` (24) |

`wrangler deploy` detects `open-next.config.ts` and delegates to
`opennextjs-cloudflare deploy`, so the build command **must** be `cf:build` — plain
`npm run build` skips the worker bundle and the deploy fails with "Could not find compiled
Open Next config". Secrets are not read from `wrangler.jsonc`; set them with
`wrangler secret put` or in the dashboard.

Do not use `@cloudflare/next-on-pages` — it's deprecated, unsupported on Next 16, and its
`@cloudflare/workers-types@^4` peer conflicts with `wrangler@^4.114`.

**Docker (fallback):** `docker build -t flowzaweb . && docker run -p 3000:3000 flowzaweb`
(standalone output, Node 24 alpine, non-root).

## SEO & AI-SEO

- Per-route metadata + canonicals, build-time OG images (`opengraph-image.tsx`)
- JSON-LD graphs on every page (`src/lib/seo.ts`): Organization, WebSite,
  SoftwareApplication (per platform, with offers), FAQPage, BreadcrumbList, OfferCatalog
- `sitemap.xml` (with image entries), `robots.txt` (AI crawlers explicitly allowed),
  `llms.txt` generated from the content layer
- Legacy redirects: `/finance`, `/finance-demo` → `/products/finance` (308)

## Architecture decisions

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full proposal, design system
definition, content reconciliation log (legal entity, compliance claims, pricing
canonicalization) and the phase plan this site was built against.
