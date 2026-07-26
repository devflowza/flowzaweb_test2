import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOW_IT_WORKS } from "@/content/home";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

// Deep shades: the white numerals need >=4.5:1 (emerald-500 was 2.5:1).
const STEP_COLORS = ["#1d4ed8", "#7e22ce", "#047857"];

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="white">
      <Container>
        <SectionHeading
          badge={HOW_IT_WORKS.badge}
          title={HOW_IT_WORKS.title}
          subtitle={HOW_IT_WORKS.subtitle}
        />
        <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-8">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-px bg-gradient-to-r from-brand-600/30 via-purple-600/30 to-emerald-600/30 lg:block"
          />
          {HOW_IT_WORKS.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 0.12} className="flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full text-white shadow-lift [box-shadow:var(--shadow-lift),inset_0_1px_1px_rgb(255_255_255/0.3)]"
                  style={{ backgroundColor: STEP_COLORS[i] }}
                >
                  <span className="font-mono text-xl font-semibold">0{i + 1}</span>
                </span>
                <h3 className="mt-6 text-display-sm text-ink">{step.title}</h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-body">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal delay={0.3} className="mt-14 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              {HOW_IT_WORKS.cta.label}
              <ButtonIcon>
                <ArrowRight strokeWidth={2} />
              </ButtonIcon>
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
