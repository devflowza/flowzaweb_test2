import Link from "next/link";
import { HERO } from "@/content/home";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ImageFrame } from "@/components/ui/image-frame";
import { Eyebrow } from "@/components/layout/eyebrow";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

/**
 * Reference hero: a near-full-height band where the media panel bleeds off the
 * right edge with a large one-sided scoop, a green radial light-leak sits behind
 * the copy, and the headline is filled with a gradient via background-clip.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <span aria-hidden="true" className="fx-shade" />

      <div className="section-x relative flex flex-col-reverse items-center gap-12 pb-(--spacing-section-y) pt-10 lg:min-h-[38rem] lg:flex-row lg:gap-16 lg:pb-0 lg:pr-0 lg:pt-0">
        {/* Copy */}
        <div className="w-full max-w-2xl lg:py-(--spacing-section-y)">
          <Reveal immediate>
            <Eyebrow>{HERO.badge}</Eyebrow>
          </Reveal>

          <Reveal immediate delay={0.08}>
            <h1 className="fx-ink-gradient mt-6 text-hero tracking-[-0.044em]">
              {HERO.headline[0]}
              <br />
              {HERO.headline[1]}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.16}>
            <p className="mt-6 text-caption font-medium uppercase tracking-[3px] text-accent-deep">
              {HERO.verticals}
            </p>
          </Reveal>

          <Reveal immediate delay={0.22}>
            <p className="mt-6 max-w-xl text-lede text-gray">{HERO.subhead}</p>
          </Reveal>

          <Reveal immediate delay={0.3}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {HERO.pills.map((pill) => (
                <li
                  key={pill}
                  className="rounded-pill border border-line bg-surface px-4 py-2 text-caption font-light text-gray"
                >
                  {pill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal immediate delay={0.38}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="xl">
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button asChild variant="whatsapp" size="xl">
                <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4.5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outlined" size="xl">
                <a href="#platforms">Explore Platforms</a>
              </Button>
            </div>
          </Reveal>

          <Reveal immediate delay={0.46}>
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-caption font-medium uppercase tracking-[3px] text-gray-soft">
                Trusted across industries
              </span>
              <ul className="flex flex-wrap gap-2">
                {HERO.industries.map((industry) => (
                  <li key={industry} className="text-caption font-light text-ink">
                    {industry}
                    <span aria-hidden="true" className="ml-2 text-accent">
                      *
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Media — scoops on the left edge and bleeds off the right on desktop */}
        <Reveal
          immediate
          delay={0.25}
          className="fx-glow w-full self-stretch lg:w-[42%] lg:min-w-[22rem]"
        >
          <ImageFrame
            image={HERO.image}
            ratio="4/5"
            priority
            sizes="(max-width: 1024px) 92vw, 42vw"
            rounded="rounded-card lg:rounded-[10vh_0_0_10vh]"
            className="h-full lg:aspect-auto"
          />
        </Reveal>
      </div>
    </section>
  );
}
