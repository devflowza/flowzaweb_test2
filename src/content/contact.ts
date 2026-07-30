/**
 * Contact page content. SERVICE_OPTIONS feed the "Service of Interest" select —
 * the selected value becomes contact_submissions.subject, which the admin portal
 * filters on, so treat changes here as schema-adjacent.
 */

export const SERVICE_OPTIONS = [
  "General Inquiry",
  "Sales Inquiry",
  "Technical Support",
  "FlowZa Finance",
  "FlowZa Club",
  "FlowZa QRForge",
  "FlowZa Fleetza",
  "FlowZa LogisPro",
  "FlowZa Spa Master",
  "FlowZa POS",
  "FlowZa PMS",
  "FlowZa RentFlow",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const CONTACT_PAGE = {
  badge: "Contact",
  title: "Let's Build Something Together",
  titleHighlight: "Together",
  subtitle:
    "Whether you're exploring a product, ready to buy, or just have a question — our team responds within one business day.",
  formTitle: "Send us a message",
  formSubtitle: "We'd love to hear from you. Fill out the form and we'll get back soon.",
  /* The word "privacy" links to the policy, so the mockup's one-liner still
     carries the legal path the old consent sentence had. */
  privacyNote: "We respect your privacy. Your information is safe with us.",
  successTitle: "Message sent",
  successBody:
    "Thanks for reaching out — our team will get back to you within one business day. For anything urgent, WhatsApp is the fastest way to reach us.",
  fallbackBody:
    "The form is temporarily unavailable. Please reach us on WhatsApp instead — we respond fast.",
} as const;
