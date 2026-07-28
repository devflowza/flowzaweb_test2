import { Marquee } from "@/components/motion/marquee";
import { PLATFORM_NAV } from "@/content/platforms-nav";

/**
 * The reference's site-wide text marquee: large display type in a very light
 * grey, each item followed by an accent asterisk. Sits directly above the
 * footer on every page.
 */
export function MarqueeStrip() {
  return (
    <section aria-label="Platforms" className="border-y border-line bg-surface py-5">
      <Marquee duration="40s" fade={false}>
        {PLATFORM_NAV.map((p) => (
          <span
            key={p.slug}
            className="flex shrink-0 items-center whitespace-nowrap text-[clamp(1.6rem,3vw,2.4rem)] font-medium tracking-[-0.033em] text-line"
          >
            {p.shortName}
            <span aria-hidden="true" className="mx-6 translate-y-1.5 text-accent">
              *
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
