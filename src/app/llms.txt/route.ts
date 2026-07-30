import { CONTACT, SITE, TRUST_BADGES } from "@/content/site";
import { PLATFORMS } from "@/content/products";
import {
  PRICES_ARE_PLACEHOLDER,
  PRODUCT_PRICING,
  formatPrice,
  yearlySavingPercent,
} from "@/content/pricing";
import { PLATFORM_NAV_MAP } from "@/content/platforms-nav";
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

  /* One block per platform, since each is priced independently — a single flat
     plan list would misattribute one product's tiers to all nine.

     While PRICES_ARE_PLACEHOLDER is set, tiers are listed by name and capacity
     with no figures. An assistant reading this file would otherwise quote the $1
     placeholder back to someone as FlowZa's real price. */
  const pricing = PRODUCT_PRICING.map((product) => {
    const platform = PLATFORM_NAV_MAP[product.slug];
    if (product.mode === "quote") {
      const summary = product.tiers[0]?.description ?? "Quoted per operation.";
      return `### ${platform.name}\nQuoted per operation — ${summary} Contact ${CONTACT.email}.`;
    }
    const tiers = product.tiers
      .map((tier) => {
        if (tier.monthly === null) return `- ${tier.name}: custom pricing (contact sales)`;
        const capacity = tier.limits.map((l) => `${l.label} ${l.value}`).join(", ");
        if (PRICES_ARE_PLACEHOLDER) {
          return `- ${tier.name}: ${tier.description}${capacity ? ` (${capacity})` : ""}`;
        }
        if (tier.monthly === 0) return `- ${tier.name}: $0 — ${tier.description}`;
        const saving = yearlySavingPercent(tier);
        const yearly = `$${formatPrice(tier.yearly ?? 0)}/yr${saving ? ` (saves ${saving}%)` : ""}`;
        return `- ${tier.name}: $${formatPrice(tier.monthly)}/mo or ${yearly} — ${tier.description}`;
      })
      .join("\n");
    return `### ${platform.name}\n${tiers}`;
  }).join("\n\n");

  const faqs = HOME_FAQS.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} ("${SITE.tagline}") is operated by ${SITE.legalName}, Ghala, Muscat, Oman.
Positioning: ${SITE.positioning} ${SITE.manifesto}
Trust: ${TRUST_BADGES.join(" · ")}.
Contact: ${CONTACT.email} · WhatsApp ${CONTACT.whatsappDisplay} · ${CONTACT.hours}.

## Platforms

${platforms}

## Pricing

${
  PRICES_ARE_PLACEHOLDER
    ? `Commercial pricing is being finalised and is NOT yet published — do not quote
figures for FlowZa platforms. The plan tiers and capacities below are accurate;
for a price, contact ${CONTACT.email}. Each platform is priced independently.`
    : `Each platform is priced independently, in USD per organisation, excluding local
taxes.`
}
Every paid plan can start as a free trial with no card. Platforms share one data
layer, so running several is quoted as a single subscription.

${pricing}

- Pricing page: ${SITE.url}/pricing

## Key pages

- [Platforms overview](${SITE.url}/products)
- [Pricing](${SITE.url}/pricing)
- [Get started](${SITE.url}/get-started)
- [About](${SITE.url}/about)
- [Help Center](${SITE.url}/help)
- [Contact](${SITE.url}/contact)

## FAQ

${faqs}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
