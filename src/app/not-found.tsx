import Link from "next/link";
import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";

/**
 * 404. The generated placeholder illustration came off with the rest of them;
 * a lost visitor is better served by routes than by a picture, so the page
 * offers the four destinations that cover everything the site does.
 */
const DESTINATIONS: { href: Route; label: string; description: string }[] = [
  { href: "/products", label: "Platforms", description: "All nine, and what each one runs" },
  { href: "/pricing", label: "Pricing", description: "Plans and capacities per platform" },
  { href: "/help", label: "Help Center", description: "Answers and direct lines to a human" },
  { href: "/contact", label: "Contact", description: "WhatsApp, email or the form" },
];

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-[clamp(4rem,10vw,8rem)] text-center">
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-accent-deep">
        Error 404
      </p>
      <h1 className="mt-4 text-hero font-semibold text-ink">Page not found</h1>
      <p className="mt-5 max-w-md text-lede text-gray">
        This page doesn&apos;t exist — it may have moved, or the link may be mistyped.
      </p>

      <ul className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {DESTINATIONS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full items-center justify-between gap-4 rounded-card border border-line bg-surface px-6 py-5 text-left shadow-(--shadow-hairline) transition-all duration-500 ease-(--ease-1) hover:-translate-y-0.5 hover:border-accent hover:shadow-(--shadow-soft)"
            >
              <span>
                <span className="block font-semibold text-ink">{item.label}</span>
                <span className="mt-0.5 block text-sm text-gray">{item.description}</span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-accent-deep transition-transform duration-500 ease-(--ease-btn) group-hover:translate-x-1"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-10 text-sm font-semibold text-accent-deep underline underline-offset-4"
      >
        Back to home
      </Link>
    </Container>
  );
}
