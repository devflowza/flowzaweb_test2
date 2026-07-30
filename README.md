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
| Deploy     | Cloudflare Pages (static export) · Docker (standalone) fallback |

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — site runs without Supabase (WhatsApp fallback)
npm run dev
```

| Script                         | Purpose                                    |
| ------------------------------ | ------------------------------------------ |
| `npm run dev`                  | Dev server (Turbopack)                     |
| `npm run build` / `start`      | Production build / serve                   |
| `npm run lint`                 | ESLint (flat config, next/core-web-vitals) |
| `npm run typecheck`            | `tsc --noEmit`                             |
| `npm run format`               | Prettier                                   |
| `npm run optimize:images`      | Re-run the sharp asset pipeline            |
| `npm run generate:page-images` | Redraw the generated page illustrations    |
| `npm run pages:preview`        | Build + serve `out/` on the Pages emulator |
| `npm run pages:deploy`         | Build + deploy `out/` to Cloudflare Pages  |

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

**Cloudflare Pages (primary):** the site is a full static export — `npm run build`
writes `out/` (`output: "export"`), and Pages hosts it as plain files. There is no
server at request time: legacy redirects live in `public/_redirects`, OG-image MIME
types in `public/_headers`, and the contact form submits to Supabase **from the
browser** (anon key + RLS, exactly the security model the server action had).

Git-connected Pages project — Settings → Build:

| Setting          | Value                     |
| ---------------- | ------------------------- |
| Build command    | `npm run build`           |
| Build output dir | `out`                     |
| Node version     | from `.node-version` (24) |

Build-time environment variables (Settings → Environment variables — these are
inlined into the bundle, so set them for Production _and_ Preview):

| Variable                        | Value                                    |
| ------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | `https://flowza.ai`                      |
| `NEXT_PUBLIC_SUPABASE_URL`      | project URL (contact form)               |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key — public by design, RLS-guarded |

Without the Supabase vars the site still builds and runs; the contact form shows
its WhatsApp fallback. Manual deploys: `npm run pages:deploy` (needs
`CLOUDFLARE_API_TOKEN`; adjust `--project-name`). Local preview of the exact
artifact: `npm run pages:preview` (pass `--compatibility-date=<recent>` if the
bundled workerd rejects today's date).

CI (`.github/workflows/ci.yml`) runs format/lint/typecheck/build on every push;
deployment stays with the Pages Git integration.

Do not use `@cloudflare/next-on-pages` — it's deprecated, unsupported on Next 16, and its
`@cloudflare/workers-types@^4` peer conflicts with `wrangler@^4.114`. The previous
Workers/OpenNext deploy chain (`wrangler.jsonc`, `open-next.config.ts`,
`@opennextjs/cloudflare`) was removed with the move to Pages; see git history if a
server runtime is ever needed again.

**Docker (fallback):** `docker build -t flowzaweb . && docker run -p 3000:3000 flowzaweb`
(standalone output via `NEXT_OUTPUT=standalone`, Node 24 alpine, non-root).

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
