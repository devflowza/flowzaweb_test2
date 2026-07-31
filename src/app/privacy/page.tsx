import type { Metadata } from "next";
import PrivacyContent from "@/content/legal/privacy.mdx";
import { LegalLayout } from "@/components/legal/legal-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbNode, graph, webPageNode } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How FlowZa AI (SoarTek LLC) collects, uses, protects and retains your data — including your rights to access, export and erase it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageNode(
            "/privacy",
            "FlowZa Privacy Policy",
            "How FlowZa AI collects, uses and protects your data.",
          ),
          breadcrumbNode("/privacy", [{ label: "Privacy Policy", href: "/privacy" }]),
        )}
      />
      <LegalLayout badge="Legal" title="Privacy Policy" lastUpdated="July 26, 2026">
        <PrivacyContent />
      </LegalLayout>
    </>
  );
}
