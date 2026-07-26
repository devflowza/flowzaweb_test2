export interface Faq {
  question: string;
  answer: string;
}

/** Homepage / global FAQ — every answer is assembled strictly from confirmed facts. */
export const HOME_FAQS: Faq[] = [
  {
    question: "How long does it take to go live on FlowZa?",
    answer:
      "Hours, not weeks. Every platform ships with pre-built templates, a guided setup wizard and dedicated onboarding support. FlowZa Finance includes a migration wizard that imports contacts, items and history from Zoho or spreadsheets.",
  },
  {
    question: "Which countries and tax regimes do you support?",
    answer:
      "FlowZa is built for MEA & India. FlowZa Finance ships with GST for India and VAT plus Corporate Tax for the Gulf, with country-specific chart-of-accounts packs and statutory payroll filings built in — not bolted on.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — every plan can be started as a free trial before you buy. FlowZa Club offers a 14-day trial with a six-step setup wizard covering branding, currency, tax, staff roles and facilities.",
  },
  {
    question: "Do you offer yearly billing discounts?",
    answer:
      "Yes. Paying yearly saves 25% compared to monthly billing across Starter, Professional and Enterprise plans.",
  },
  {
    question: "How secure is my business data?",
    answer:
      "FlowZa runs on SOC 2 compliant infrastructure with end-to-end encryption, role-based access control and audit trails on every action, backed by a 99.9% uptime SLA.",
  },
  {
    question: "Can the platforms work together?",
    answer:
      "Yes — that is the point. Seven purpose-built systems share one operating fabric: FlowZa POS posts straight into FlowZa Finance, and every platform shares customer, inventory and ledger data without manual re-entry.",
  },
];
