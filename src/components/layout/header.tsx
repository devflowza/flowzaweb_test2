"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/content/site";
import { PLATFORM_NAV } from "@/content/platforms-nav";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 12);
        // Hide when scrolling down past the hero top, reveal on any upward scroll.
        setHidden(y > 140 && y > lastY);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change (adjust-state-during-render pattern).
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/88 backdrop-blur-xl",
        "transition-[transform,border-color,box-shadow] duration-500 ease-(--ease-swift)",
        scrolled ? "border-line shadow-hairline" : "border-transparent",
        hidden && !mobileOpen && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[90rem] items-center justify-between gap-4 px-(--spacing-gutter)">
        <Logo />

        {/* Desktop navigation */}
        <NavigationMenu.Root className="relative hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-1">
            <NavItem href="/" label="Home" active={isActive("/")} />
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(
                  "group flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-body",
                  "transition-colors hover:bg-slate-900/5 hover:text-ink",
                  "data-[state=open]:bg-slate-900/5 data-[state=open]:text-ink",
                  pathname.startsWith("/products") && "text-brand-700",
                )}
              >
                Platforms
                <ChevronDown
                  className="size-3.5 transition-transform duration-300 ease-(--ease-swift) group-data-[state=open]:rotate-180"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                className={cn(
                  "absolute left-1/2 top-full w-[42rem] -translate-x-1/2 pt-3",
                  "data-[state=open]:animate-in data-[motion=from-start]:duration-300",
                )}
              >
                <div className="overflow-hidden rounded-(--radius-shell) border border-line bg-white shadow-mega">
                  <ul className="grid grid-cols-2 gap-1 p-3">
                    {PLATFORM_NAV.map((p) => (
                      <li key={p.slug}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={`/products/${p.slug}`}
                            className="group/item flex items-start gap-3 rounded-(--radius-card) p-3 transition-colors hover:bg-surface-tint"
                          >
                            <span
                              className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl"
                              style={{ backgroundColor: `${p.color}1a`, color: p.colorDeep }}
                            >
                              <p.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <span className="flex min-w-0 flex-col gap-0.5">
                              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                                {p.name}
                                {p.live ? <Badge variant="live">Live</Badge> : null}
                              </span>
                              <span className="truncate text-[0.8125rem] text-muted">
                                {p.tagline}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between border-t border-line bg-surface-tint px-6 py-3.5">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      {SITE.positioning}
                    </span>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/products"
                        className="flex items-center gap-1 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
                      >
                        All platforms
                        <ArrowRight className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            {NAV_LINKS.filter((l) => l.label !== "Home").map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <div className="flex items-center gap-2">
          <Button asChild size="md" className="hidden sm:inline-flex">
            <Link href="/get-started">
              Start Free Trial
              <ButtonIcon>
                <ArrowRight strokeWidth={2} />
              </ButtonIcon>
            </Link>
          </Button>

          {/* Mobile menu */}
          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-tint lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.75} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/45 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
              <Dialog.Content
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-[min(24rem,92vw)] flex-col bg-white shadow-mega outline-none",
                  "data-[state=open]:animate-in data-[state=open]:slide-in-from-right duration-500",
                )}
              >
                <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface-tint"
                      aria-label="Close menu"
                    >
                      <X className="size-5" strokeWidth={1.75} />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    Platforms
                  </p>
                  <ul className="mb-6 space-y-0.5">
                    {PLATFORM_NAV.map((p, i) => (
                      <li
                        key={p.slug}
                        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both"
                        style={{ animationDelay: `${80 + i * 45}ms`, animationDuration: "550ms" }}
                      >
                        <Link
                          href={`/products/${p.slug}`}
                          className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-surface-tint"
                        >
                          <span
                            className="flex size-8 items-center justify-center rounded-lg"
                            style={{ backgroundColor: `${p.color}1a`, color: p.colorDeep }}
                          >
                            <p.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                            {p.name}
                            {p.live ? <Badge variant="live">Live</Badge> : null}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                    Company
                  </p>
                  <ul className="space-y-0.5">
                    {NAV_LINKS.map((link, i) => (
                      <li
                        key={link.href}
                        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both"
                        style={{ animationDelay: `${420 + i * 45}ms`, animationDuration: "550ms" }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-xl px-2 py-2.5 text-[0.9375rem] font-medium transition-colors hover:bg-surface-tint",
                            isActive(link.href) ? "text-brand-700" : "text-ink",
                          )}
                          aria-current={isActive(link.href) ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t border-line p-5">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/get-started">
                      Start Free Trial
                      <ButtonIcon>
                        <ArrowRight strokeWidth={2} />
                      </ButtonIcon>
                    </Link>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function NavItem({ href, label, active }: { href: Route; label: string; active: boolean }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link asChild active={active}>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-900/5 hover:text-ink",
            active ? "text-brand-700" : "text-body",
          )}
        >
          {label}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
