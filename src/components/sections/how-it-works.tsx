import Link from "next/link";
import { HOW_IT_WORKS } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

/**
 * Numbered steps using the reference's chip treatment: a 50px white square with
 * a 15px radius, hairline border, deep tinted shadow and an accent numeral.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="tint">
      <Container>
        <SectionHeading
          eyebrow={HOW_IT_WORKS.badge}
          title={HOW_IT_WORKS.title}
          subtitle={HOW_IT_WORKS.subtitle}
          action={
            <Button asChild size="lg">
              <Link href="/contact">{HOW_IT_WORKS.cta.label}</Link>
            </Button>
          }
        />
        <ol className="flex flex-wrap gap-y-10 sm:gap-x-[1.2%]">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <li key={step.title} className="w-full lg:w-[32.53%]">
              <Reveal delay={i * 0.1}>
                <div className="flex flex-col gap-5">
                  <span className="grid size-[50px] shrink-0 place-items-center rounded-chip border border-line bg-surface text-h4 font-medium text-accent-deep shadow-(--shadow-chip)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h4 text-ink">{step.title}</h3>
                    <p className="mt-3 text-body font-light leading-relaxed text-gray">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
