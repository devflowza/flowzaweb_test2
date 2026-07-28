import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Container, Section } from "@/components/layout/container";
import { Reveal } from "@/components/motion";
import { LegalToc } from "./legal-toc";

interface LegalLayoutProps {
  badge: string;
  title: string;
  lastUpdated: string;
  version?: string;
  children: React.ReactNode;
}

/** Shared frame for legal documents: header, sticky TOC (scroll-spy), prose body. */
export function LegalLayout({ badge, title, lastUpdated, version, children }: LegalLayoutProps) {
  return (
    <>
      <PageHeader
        crumbs={[{ label: title }]}
        badge={badge}
        title={title}
        subtitle={
          <>
            Last updated: {lastUpdated}
            {version ? ` · Version ${version}` : ""}
          </>
        }
      />
      <Section tone="white" className="pt-(--spacing-section-sm)">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
            <LegalToc />
            <Reveal>
              <article
                id="legal-body"
                className={[
                  "max-w-3xl",
                  // Prose styling without @tailwindcss/typography — scoped element selectors.
                  "[&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-h4 [&_h2]:text-ink first:[&_h2]:mt-0",
                  "[&_h3]:mt-8 [&_h3]:text-[1.0625rem] [&_h3]:font-semibold [&_h3]:text-ink",
                  "[&_p]:mt-4 [&_p]:text-[0.9375rem] [&_p]:leading-relaxed [&_p]:text-gray",
                  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:text-[0.9375rem] [&_li]:leading-relaxed [&_li]:text-gray",
                  "[&_strong]:font-semibold [&_strong]:text-ink",
                  "[&_a]:font-medium [&_a]:text-accent-deep [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-deep",
                  "[&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
                  "[&_th]:border-b [&_th]:border-line-soft [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink",
                  "[&_td]:border-b [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:text-gray",
                  "[&_hr]:my-10 [&_hr]:border-line",
                ].join(" ")}
              >
                {children}
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
