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

export function FaqSection({ faqs = HOME_FAQS, standalone = false }: FaqSectionProps) {
  return (
    <Section id="faq" tone="tint">
      <Container className="max-w-4xl">
        <SectionHeading
          badge={FAQ_SECTION.badge}
          title={FAQ_SECTION.title}
          subtitle={FAQ_SECTION.subtitle}
          as={standalone ? "h1" : "h2"}
        />
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-[0.9375rem] font-medium text-body">{FAQ_SECTION.closer}</p>
            <Button asChild variant="whatsapp" size="lg">
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
