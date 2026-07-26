import type { Metadata } from "next";
import CookiesContent from "@/content/legal/cookies.mdx";
import { LegalLayout } from "@/components/legal/legal-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies FlowZa AI uses across flowza.ai and the FlowZa platforms — essential, analytics, functional and marketing — and how to manage them.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/cookies",
            "FlowZa Cookie Policy",
            "The cookies FlowZa AI uses and how to manage them.",
          ),
          breadcrumbNode("/cookies", [{ label: "Cookie Policy", href: "/cookies" }]),
        )}
      />
      <LegalLayout badge="Legal" title="Cookie Policy" lastUpdated="July 26, 2026">
        <CookiesContent />
      </LegalLayout>
    </>
  );
}
