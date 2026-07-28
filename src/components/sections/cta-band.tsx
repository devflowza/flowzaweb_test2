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

/**
 * The conversion spine. The reference uses a tinted, hairline-bordered inner
 * panel on a light background rather than a dark slab.
 */
export function CtaBand({ eyebrow, title, subtitle, children, className }: CtaBandProps) {
  return (
    <section className={cn("bg-surface section-y", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-card border border-brand-100 bg-gradient-to-br from-[#f6fff8] to-surface-tint px-6 py-16 text-center sm:px-12 lg:py-20">
          <span
            aria-hidden="true"
            className="fx-ghost absolute -bottom-6 left-0 select-none text-[12vw] leading-none"
          >
            FlowZa
          </span>
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            {eyebrow ? (
              <Reveal>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            ) : null}
            <Reveal delay={0.06}>
              <h2 className="text-h2 text-ink">{title}</h2>
            </Reveal>
            {subtitle ? (
              <Reveal delay={0.12}>
                <p className="text-lede text-gray">{subtitle}</p>
              </Reveal>
            ) : null}
            <Reveal delay={0.18}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                {children}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
