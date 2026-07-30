import Link from "next/link";
import type { Route } from "next";
import { Clock, Mail, MapPin } from "lucide-react";
import {
  CONTACT,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  SITE,
  SOCIALS,
  TRUST_BADGES,
} from "@/content/site";
import { PLATFORM_NAV } from "@/content/platforms-nav";
import { Logo } from "./logo";
import { WhatsAppIcon, socialIconFor } from "./social-icons";

/**
 * The reference keeps its footer light (#fafafa) with accent-green uppercase
 * column labels — not a dark slab.
 */
export function Footer() {
  return (
    <footer className="bg-surface-tint text-body">
      <div className="section-x">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-body leading-relaxed text-gray">
              AI-powered business operating systems for MEA &amp; India. Nine purpose-built
              platforms. One unified vision.
            </p>
            <div className="mt-7 rounded-card border border-line bg-surface p-5">
              <p className="flex items-center gap-2 text-caption font-medium uppercase tracking-[2px] text-accent-deep">
                <Clock className="size-4" strokeWidth={1.75} aria-hidden="true" />
                Working Hours
              </p>
              <p className="mt-3 text-body text-ink">{CONTACT.hours}</p>
              <p className="mt-1 text-body text-gray">{CONTACT.hoursClosed}</p>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-sm text-caption font-medium tracking-[0.5px] text-accent-deep transition-colors hover:text-accent-deep"
              >
                <WhatsAppIcon className="size-4" />
                Chat with us on WhatsApp
              </a>
            </div>
            <ul className="mt-7 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = socialIconFor(s.label);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-pill border border-line bg-surface text-gray transition-all duration-300 ease-(--ease-1) hover:border-accent hover:text-accent-deep"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <FooterColumn label="Quick Links">
            {FOOTER_QUICK_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn label="Our Platforms">
            {PLATFORM_NAV.map((p) => (
              <FooterLink key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </FooterLink>
            ))}
          </FooterColumn>

          <div>
            <p className="text-caption font-medium uppercase tracking-[1px] text-accent-deep">
              Contact Info
            </p>
            <ul className="mt-6 space-y-4 text-body">
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-sm text-ink transition-colors hover:text-accent-deep"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-accent-deep" />
                  {CONTACT.whatsappDisplay} (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 rounded-sm text-ink transition-colors hover:text-accent-deep"
                >
                  <Mail
                    className="mt-0.5 size-4 shrink-0 text-accent-deep"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-ink">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-accent-deep"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {CONTACT.address}
              </li>
            </ul>
            <p className="mt-8 text-caption font-medium uppercase tracking-[1px] text-accent-deep">
              Policies
            </p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust strip */}
        <ul className="flex flex-wrap items-center justify-center gap-3 border-t border-line py-7">
          {TRUST_BADGES.map((badge) => (
            <li
              key={badge}
              className="rounded-pill border border-line bg-surface px-4 py-2 text-caption text-gray"
            >
              {badge}
            </li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-7 text-caption text-gray sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.legalName}. All Rights Reserved.
          </p>
          <Link
            href="/status"
            className="flex items-center gap-2 rounded-sm transition-colors hover:text-accent-deep"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            All systems operational
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <nav aria-label={label}>
      <p className="text-caption font-medium uppercase tracking-[1px] text-accent-deep">{label}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </nav>
  );
}

/**
 * Generic over the route string so template-literal hrefs (e.g.
 * `/products/${slug}`) keep the type Next's typedRoutes infers at the call site.
 */
function FooterLink<T extends string>({
  href,
  children,
}: {
  href: Route<T>;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="rounded-sm text-body text-ink transition-colors hover:text-accent-deep"
      >
        {children}
      </Link>
    </li>
  );
}
