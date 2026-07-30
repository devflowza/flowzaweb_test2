import { Star } from "lucide-react";
import { HOME_TESTIMONIALS, type Testimonial } from "@/content/testimonials";
import { TESTIMONIALS_SECTION } from "@/content/home";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={className}>
      <span aria-hidden="true" className="flex gap-1 text-accent-deep">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" strokeWidth={0} />
        ))}
      </span>
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card bg-surface p-8 shadow-(--shadow-subtle)",
        className,
      )}
    >
      <Stars />
      <blockquote className="mt-6 flex-1 text-lede leading-relaxed text-gray">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-pill bg-accent-mint text-body font-medium text-accent-deep"
        >
          {testimonial.initials}
        </span>
        <span>
          <span className="block text-body font-medium text-ink">{testimonial.name}</span>
          <span className="block text-caption text-gray">
            {testimonial.role} · {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" tone="tint">
      <Container>
        <SectionHeading
          eyebrow={TESTIMONIALS_SECTION.badge}
          title={TESTIMONIALS_SECTION.title}
          subtitle={
            <span className="flex flex-col gap-3">
              <Stars />
              {TESTIMONIALS_SECTION.subtitle}
            </span>
          }
        />
        <ul className="flex flex-wrap gap-y-8 sm:gap-x-[1.2%]">
          {HOME_TESTIMONIALS.map((t, i) => (
            <li key={t.name} className="w-full lg:w-[32.53%]">
              <Reveal delay={i * 0.1} className="h-full">
                <TestimonialCard testimonial={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
