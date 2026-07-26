import { Star } from "lucide-react";
import { HOME_TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import { TESTIMONIALS_SECTION } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

export function Stars({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={className}>
      <span aria-hidden="true" className="flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  accentColor = "#2563eb",
}: {
  testimonial: Testimonial;
  accentColor?: string;
}) {
  return (
    <figure className="flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-7 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-soft">
      <Stars />
      <blockquote className="mt-5 flex-1 text-[0.9875rem] leading-relaxed text-body">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full font-mono text-sm font-semibold text-white"
          style={{ backgroundColor: accentColor }}
        >
          {testimonial.initials}
        </span>
        <span>
          <span className="block text-sm font-semibold text-ink">{testimonial.name}</span>
          <span className="block text-[0.8125rem] text-muted">
            {testimonial.role} · {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

const ACCENTS = ["#2563eb", "#f43f5e", "#7c5ff5"];

export function Testimonials() {
  return (
    <Section id="testimonials" tone="tint">
      <Container>
        <SectionHeading
          badge={TESTIMONIALS_SECTION.badge}
          title={TESTIMONIALS_SECTION.title}
          subtitle={
            <span className="flex flex-col items-center gap-3">
              <Stars />
              {TESTIMONIALS_SECTION.subtitle}
            </span>
          }
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {HOME_TESTIMONIALS.map((t, i) => (
            <li key={t.name} className="h-full">
              <Reveal delay={i * 0.1} className="h-full">
                <TestimonialCard testimonial={t} accentColor={ACCENTS[i % ACCENTS.length]} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
