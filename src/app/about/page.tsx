import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { AboutHero, MissionSection, ValuesSection } from "@/components/about/about-sections";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us — Built to Transform Every Business",
  description:
    "FlowZa AI builds nine purpose-built AI business platforms for MEA & India, on the belief that powerful AI shouldn't be reserved for nine-figure budgets.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/about",
            "About FlowZa AI",
            "The story, mission and values behind FlowZa AI.",
            "AboutPage",
          ),
          breadcrumbNode("/about", [{ label: "About", href: "/about" }]),
        )}
      />
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <CtaBand
        eyebrow="Join Us"
        title="Ready to transform your business?"
        subtitle="Join 100+ businesses already using FlowZa AI to work smarter."
      >
        <Button asChild size="xl" variant="white">
          <Link href="/get-started">
            Get Started
            <ArrowRight strokeWidth={2} />
          </Link>
        </Button>
        <Button asChild size="xl" variant="whatsapp">
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="size-4.5" />
            Get in Touch
          </a>
        </Button>
      </CtaBand>
    </>
  );
}
