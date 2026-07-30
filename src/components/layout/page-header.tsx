import * as React from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { ImageFrame, type ImageSlot } from "@/components/ui/image-frame";
import { Reveal } from "@/components/motion";

interface PageHeaderProps {
  crumbs: Crumb[];
  badge: string;
  title: React.ReactNode;
  /** Gradient-highlighted trailing part of the title. */
  titleHighlight?: string;
  subtitle?: React.ReactNode;
  /**
   * Page banner shown under the lede, always at 16/7 with the signature
   * one-sided scoop. Every generated page image is authored at that ratio, so
   * inner pages stay in one rhythm instead of each inventing a crop.
   */
  image?: ImageSlot;
  children?: React.ReactNode;
}

/** Standard inner-page hero: breadcrumb → eyebrow → display title → lede → banner. */
export function PageHeader({
  crumbs,
  badge,
  title,
  titleHighlight,
  subtitle,
  image,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0" />
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
          <h1 className="mt-4 max-w-3xl text-h1 text-ink">
            {title}
            {titleHighlight ? (
              <>
                {" "}
                <span className="fx-accent-gradient">{titleHighlight}</span>
              </>
            ) : null}
          </h1>
        </Reveal>
        {subtitle ? (
          <Reveal delay={0.2} immediate>
            <p className="mt-5 max-w-2xl text-lede text-gray">{subtitle}</p>
          </Reveal>
        ) : null}
        {image ? (
          <Reveal immediate delay={0.28} className="mt-12">
            <ImageFrame
              image={image}
              ratio="16/7"
              priority
              sizes="(max-width: 1600px) 92vw, 1500px"
              rounded="rounded-card lg:rounded-[0_10vh_0_10vh]"
            />
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
