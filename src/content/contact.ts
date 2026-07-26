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
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export const CONTACT_PAGE = {
  badge: "Contact",
  title: "Let's Build Something Together",
  titleHighlight: "Together",
  subtitle:
    "Whether you're exploring a product, ready to buy, or just have a question — our team responds within one business day.",
  formTitle: "Send us a message",
  // Split so the component can render "Privacy Policy" as a real link.
  consentLead: "By submitting this form you agree to our",
  consentTail:
    ". We never sell your data, and we only use your details to respond to your inquiry.",
  successTitle: "Message sent",
  successBody:
    "Thanks for reaching out — our team will get back to you within one business day. For anything urgent, WhatsApp is the fastest way to reach us.",
  fallbackBody:
    "The form is temporarily unavailable. Please reach us on WhatsApp instead — we respond fast.",
} as const;
