import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface CtaBandProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/** The conversion spine — a navy aurora band with CTAs, closing most pages. */
export function CtaBand({ eyebrow, title, subtitle, children, className }: CtaBandProps) {
  return (
    <section className={cn("fx-aurora-dark relative overflow-hidden bg-navy-950", className)}>
      <span
        aria-hidden="true"
        className="fx-ghost-text absolute -bottom-10 left-0 select-none text-[15vw] leading-none text-white opacity-[0.04]"
      >
        FLOWZA
      </span>
      <Container className="relative flex flex-col items-center gap-6 py-(--spacing-section-sm) text-center">
        {eyebrow ? (
          <Reveal>
            <Eyebrow dark>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal delay={0.06}>
          <h2 className="max-w-3xl text-display-lg text-white">{title}</h2>
        </Reveal>
        {subtitle ? (
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-lede text-white/70">{subtitle}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.18}>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}
