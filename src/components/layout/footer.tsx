import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import {
  CONTACT,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  SITE,
  SOCIALS,
  TRUST_BADGES,
} from "@/content/site";
import { PLATFORMS } from "@/content/products";
import { Logo } from "./logo";
import { WhatsAppIcon, socialIconFor } from "./social-icons";

export function Footer() {
  return (
    <footer className="fx-aurora-dark relative overflow-hidden bg-navy-950 text-white/70">
      <div className="mx-auto w-full max-w-[90rem] px-(--spacing-gutter)">
        {/* Main columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-5 text-sm leading-relaxed">
              AI-powered business operating systems for MEA &amp; India. Seven purpose-built
              platforms. One unified vision.
            </p>
            <div className="mt-6 rounded-(--radius-card) border border-white/10 bg-white/5 p-4 text-sm">
              <p className="flex items-center gap-2 font-medium text-white/90">
                <Clock className="size-4 text-accent-400" strokeWidth={1.75} aria-hidden="true" />
                Working Hours
              </p>
              <p className="mt-2">{CONTACT.hours}</p>
              <p className="mt-1 text-rose-300/90">{CONTACT.hoursClosed}</p>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block rounded-sm text-whatsapp transition-colors hover:text-emerald-300"
              >
                Chat with us on WhatsApp
              </a>
            </div>
            <ul className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => {
                const Icon = socialIconFor(s.label);
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 ease-(--ease-swift) hover:border-white/30 hover:text-white"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-400">
              Quick Links
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Platforms */}
          <nav aria-label="Platforms">
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-400">
              Our Platforms
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {PLATFORMS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="rounded-sm transition-colors hover:text-white"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-400">
              Contact Info
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 rounded-sm transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                  {CONTACT.whatsappDisplay} (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2.5 rounded-sm transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {CONTACT.address}
              </li>
            </ul>
            <p className="mt-7 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-400">
              Policies
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="rounded-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-white/8 py-6">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white/60"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 text-[0.8125rem] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.legalName}. All Rights Reserved.
          </p>
          <Link
            href="/status"
            className="flex items-center gap-2 rounded-sm transition-colors hover:text-white"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-400" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </Link>
        </div>
      </div>
    </footer>
  );
}
