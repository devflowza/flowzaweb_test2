import type { Metadata } from "next";
import TermsContent from "@/content/legal/terms.mdx";
import { LegalLayout } from "@/components/legal/legal-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the FlowZa AI platforms — billing, trials, data ownership, intellectual property and governing law (Sultanate of Oman).",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/terms",
            "FlowZa Terms of Service",
            "The terms governing use of the FlowZa AI platforms.",
          ),
          breadcrumbNode("/terms", [{ label: "Terms of Service", href: "/terms" }]),
        )}
      />
      <LegalLayout badge="Legal" title="Terms of Service" lastUpdated="July 26, 2026" version="4.0">
        <TermsContent />
      </LegalLayout>
    </>
  );
}
