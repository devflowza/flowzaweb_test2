import * as React from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "@/components/motion";

interface PageHeaderProps {
  crumbs: Crumb[];
  badge: string;
  title: React.ReactNode;
  /** Gradient-highlighted trailing part of the title. */
  titleHighlight?: string;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}

/** Standard inner-page hero: breadcrumb → eyebrow → display title → lede. */
export function PageHeader({
  crumbs,
  badge,
  title,
  titleHighlight,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="fx-grid absolute inset-0" />
      <div aria-hidden="true" className="fx-aurora absolute inset-0" />
      <Container className="relative pt-[clamp(2.5rem,5vw,4rem)]">
        <Reveal immediate>
          <Breadcrumbs items={crumbs} />
        </Reveal>
        <Reveal delay={0.08} immediate>
          <div className="mt-8">
            <Eyebrow>{badge}</Eyebrow>
          </div>
        </Reveal>
        <Reveal delay={0.14} immediate>
          <h1 className="mt-4 max-w-3xl text-display-xl text-ink">
            {title}
            {titleHighlight ? (
              <>
                {" "}
                <span className="fx-gradient-text">{titleHighlight}</span>
              </>
            ) : null}
          </h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={0.2} immediate>
            <p className="mt-5 max-w-2xl text-lede text-body">{subtitle}</p>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
