import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { instrumentSans, plexMono } from "@/lib/fonts";
import { TopBar } from "@/components/layout/top-bar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationNode, webSiteNode } from "@/lib/seo";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    // No `url` here: it would be inherited verbatim by every route. Canonicals
    // in each page's metadata carry the per-page signal instead.
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    description: SITE.ogDescription,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Pre-hydration JS gate: scroll-reveal hidden states only apply when JS runs */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.js="true"` }}
        />
      </head>
      <body>
        <JsonLd data={graph(organizationNode(), webSiteNode())} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
