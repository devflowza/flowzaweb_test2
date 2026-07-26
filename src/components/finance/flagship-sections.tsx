import { Check } from "lucide-react";
import {
  FINANCE_COMPLIANCE_SECTION,
  FINANCE_COUNTRIES,
  FINANCE_INTEGRATIONS,
  FINANCE_INTEGRATIONS_SECTION,
  FINANCE_MODULES,
  FINANCE_MODULES_SECTION,
  FINANCE_SECURITY,
  FINANCE_SECURITY_SECTION,
} from "@/content/finance";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion";

export function FinanceModules() {
  return (
    <Section tone="white" ghost="ERP">
      <Container>
        <SectionHeading
          badge={FINANCE_MODULES_SECTION.badge}
          title={FINANCE_MODULES_SECTION.title}
          subtitle={FINANCE_MODULES_SECTION.subtitle}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FINANCE_MODULES.map((mod, i) => (
            <li key={mod.title} className="h-full">
              <Reveal delay={(i % 4) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-soft">
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs tracking-widest text-emerald-700"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ink">{mod.title}</h3>
                  <p className="mt-1 text-[0.8125rem] font-medium italic text-emerald-700">
                    {mod.hook}
                  </p>
                  <ul className="mt-4 flex-1 space-y-2 border-t border-line pt-4">
                    {mod.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-body"
                      >
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-emerald-700"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FinanceCompliance() {
  return (
    <Section tone="tint">
      <Container>
        <SectionHeading
          badge={FINANCE_COMPLIANCE_SECTION.badge}
          title={FINANCE_COMPLIANCE_SECTION.title}
          subtitle={FINANCE_COMPLIANCE_SECTION.subtitle}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FINANCE_COUNTRIES.map((country, i) => (
            <li key={country.name} className="h-full">
              <Reveal delay={i * 0.09} className="h-full">
                <div className="flex h-full flex-col rounded-(--radius-shell) border border-line bg-surface p-6 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-1 hover:shadow-soft">
                  <span aria-hidden="true" className="text-3xl leading-none">
                    {country.flag}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{country.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {country.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-body">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-emerald-500"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FinanceIntegrations() {
  return (
    <Section tone="white" compact>
      <Container>
        <SectionHeading
          badge={FINANCE_INTEGRATIONS_SECTION.badge}
          title={FINANCE_INTEGRATIONS_SECTION.title}
          subtitle={FINANCE_INTEGRATIONS_SECTION.subtitle}
        />
        <Reveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {FINANCE_INTEGRATIONS.map((integration) => (
              <li
                key={integration.name}
                className="flex items-center gap-2.5 rounded-full border border-line bg-surface-tint px-5 py-2.5 text-sm font-medium text-body shadow-hairline transition-all duration-400 ease-(--ease-swift) hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-soft"
              >
                <integration.icon
                  className="size-4 text-emerald-700"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {integration.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

export function FinanceSecurity() {
  return (
    <Section tone="tint">
      <Container>
        <SectionHeading
          badge={FINANCE_SECURITY_SECTION.badge}
          title={FINANCE_SECURITY_SECTION.title}
          subtitle={FINANCE_SECURITY_SECTION.subtitle}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FINANCE_SECURITY.map((item, i) => (
            <li key={item.title} className="h-full">
              <Reveal delay={(i % 3) * 0.09} className="h-full">
                <div className="flex h-full items-start gap-4 rounded-(--radius-shell) border border-line bg-surface p-5 shadow-hairline transition-all duration-600 ease-(--ease-swift) hover:-translate-y-0.5 hover:shadow-soft">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <item.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-ink">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-body">{item.description}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
