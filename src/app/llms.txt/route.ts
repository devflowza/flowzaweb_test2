import { CONTACT, SITE, TRUST_BADGES } from "@/content/site";
import { PLATFORMS } from "@/content/products";
import { PRICING_PLANS, YEARLY_DISCOUNT_PERCENT } from "@/content/pricing";
import { HOME_FAQS } from "@/content/faqs";

export const dynamic = "force-static";

/**
 * llms.txt — a machine-readable brief for AI assistants and answer engines,
 * generated from the same content layer that renders the site.
 */
export function GET(): Response {
  const platforms = PLATFORMS.map(
    (p) =>
      `- [${p.name}](${SITE.url}/products/${p.slug}): ${p.tagline}. ${p.description}${p.live ? " (Live today.)" : " (Rolling out — early access via contact.)"}`,
  ).join("\n");

  const plans = PRICING_PLANS.map(
    (p) => `- ${p.name}: $${p.monthlyPrice}/mo — ${p.description}`,
  ).join("\n");

  const faqs = HOME_FAQS.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} ("${SITE.tagline}") is operated by ${SITE.legalName}, Ghala, Muscat, Oman.
Positioning: ${SITE.positioning} ${SITE.manifesto}
Trust: ${TRUST_BADGES.join(" · ")}.
Contact: ${CONTACT.email} · WhatsApp ${CONTACT.whatsappDisplay} · ${CONTACT.hours}.

## Platforms

${platforms}

## Pricing (FlowZa Finance)

${plans}
- Enterprise Plus: custom pricing (contact sales)
- Yearly billing saves ${YEARLY_DISCOUNT_PERCENT}%. Every plan starts as a free trial, no card required.
- Pricing page: ${SITE.url}/pricing

## Key pages

- [Platforms overview](${SITE.url}/products)
- [Pricing](${SITE.url}/pricing)
- [Get started](${SITE.url}/get-started)
- [About](${SITE.url}/about)
- [Locations](${SITE.url}/locations)
- [Help Center](${SITE.url}/help)
- [Contact](${SITE.url}/contact)

## FAQ

${faqs}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
