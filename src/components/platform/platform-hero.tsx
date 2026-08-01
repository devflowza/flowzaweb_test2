import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Platform } from "@/content/products";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Container } from "@/components/layout/container";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

/**
 * Product hero in the reference's `pageContentBannerSection` shape: breadcrumb,
 * headline and framing copy stacked at the top, then a wide media banner beneath
 * that runs the full content width and scoops one corner.
 */
export function PlatformHero({ platform }: { platform: Platform }) {
  return (
    <section className="relative overflow-hidden bg-surface pt-10">
      <span aria-hidden="true" className="fx-shade" />
      <Container className="relative">
        <Reveal immediate>
          <Breadcrumbs
            items={[{ label: "Platforms", href: "/products" }, { label: platform.shortName }]}
          />
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Reveal immediate delay={0.06}>
              <p className="flex flex-wrap items-center gap-2.5 text-caption font-medium uppercase tracking-[3px] text-accent-deep">
                <platform.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                {platform.tagline}
              </p>
            </Reveal>
            <Reveal immediate delay={0.12}>
              <h1 className="fx-ink-gradient mt-5 text-h1 tracking-[-0.035em]">{platform.name}</h1>
            </Reveal>
            <Reveal immediate delay={0.18}>
              <p className="mt-5 text-lede text-gray">{platform.description}</p>
            </Reveal>
          </div>

          <Reveal immediate delay={0.24} className="lg:pb-2">
            <ul className="flex flex-col gap-3">
              {platform.badges.map((badge) => (
                <li key={badge} className="flex items-center gap-3 text-body text-ink">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
                  {badge}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal immediate delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="xl">
              <a href={platform.appUrl} target="_blank" rel="noopener noreferrer">
                Launch {platform.shortName}
                <ArrowUpRight className="size-4.5" strokeWidth={2} aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4.5" />
                Ask on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outlined" size="xl">
              <Link href={`/contact?service=${encodeURIComponent(platform.name)}`}>
                Talk to Sales
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal immediate delay={0.36} className="fx-glow mt-14">
          <ImageFrame
            image={platform.screenshot}
            ratio="16/7"
            priority
            sizes="(max-width: 1600px) 92vw, 1500px"
            rounded="rounded-card lg:rounded-[0_10vh_0_10vh]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
