import { HOME_FAQS, type Faq } from "@/content/faqs";
import { FAQ_SECTION } from "@/content/home";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion";

interface FaqSectionProps {
  faqs?: Faq[];
  standalone?: boolean;
}

/**
 * The reference's FAQ: pill-radius rows on the light tint, capped around 1000px,
 * with a circular chevron chip on the right.
 */
export function FaqSection({ faqs = HOME_FAQS, standalone = false }: FaqSectionProps) {
  return (
    <Section id="faq" tone="white">
      <Container>
        <SectionHeading
          eyebrow={FAQ_SECTION.badge}
          title={FAQ_SECTION.title}
          subtitle={FAQ_SECTION.subtitle}
          layout="center"
          as={standalone ? "h1" : "h2"}
        />
        <Reveal className="mx-auto max-w-[62.5rem]">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="text-lede text-gray">{FAQ_SECTION.closer}</p>
            <Button asChild variant="whatsapp" size="xl">
              <a href={FAQ_SECTION.closerCta.href} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4.5" />
                {FAQ_SECTION.closerCta.label}
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
