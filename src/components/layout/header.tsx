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
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const measure = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 160 && y > lastY);
      lastY = y;
      frame = 0;
    };
    measure();
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-surface",
        "transition-[transform,box-shadow] duration-300 ease-(--ease-header)",
        scrolled && "shadow-(--shadow-soft)",
        hidden && !mobileOpen && "-translate-y-full",
      )}
    >
      <div className="section-x flex h-[4.75rem] items-center justify-between gap-6 lg:h-[6.25rem]">
        <Logo />

        <NavigationMenu.Root className="relative hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-1">
            <NavItem href="/" label="Home" active={isActive("/")} />
            <NavigationMenu.Item>
              <NavigationMenu.Trigger
                className={cn(
                  "group flex items-center gap-1 rounded-pill px-4 py-2.5 text-[0.9375rem] font-semibold",
                  "text-ink transition-colors duration-300 ease-(--ease-1)",
                  "hover:text-accent-deep data-[state=open]:text-accent-deep",
                  pathname.startsWith("/products") && "text-accent-deep",
                )}
              >
                Platforms
                <ChevronDown
                  className="size-3.5 transition-transform duration-300 ease-(--ease-1) group-data-[state=open]:rotate-180"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-1/2 top-full w-[44rem] -translate-x-1/2 pt-4">
                <div className="overflow-hidden rounded-card border border-line bg-surface shadow-(--shadow-mega)">
                  <ul className="grid grid-cols-2 gap-1 p-4">
                    {PLATFORM_NAV.map((p) => (
                      <li key={p.slug}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={`/products/${p.slug}`}
                            className="group/item flex items-start gap-3.5 rounded-input p-3 transition-colors duration-300 hover:bg-surface-mint"
                          >
                            <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-chip border border-line bg-surface text-accent-deep shadow-(--shadow-subtle)">
                              <p.icon className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <span className="flex min-w-0 flex-col gap-1">
                              <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                                {p.name}
                                {p.live ? <LivePill /> : null}
                              </span>
                              <span className="truncate text-caption text-gray">
                                {p.cardTagline}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-tint px-6 py-4">
                    <span className="text-caption font-medium uppercase tracking-[2px] text-gray">
                      {SITE.positioning}
                    </span>
                    <NavigationMenu.Link asChild>
                      <Link
                        href="/products"
                        className="flex items-center gap-1.5 text-caption font-semibold tracking-[1px] text-accent-deep transition-colors hover:text-accent-deep"
                      >
                        All platforms
                        <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
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

        <div className="flex items-center gap-3">
          <Button asChild size="md" className="hidden sm:inline-flex">
            <Link href="/get-started">Start Free Trial</Link>
          </Button>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-pill border border-line text-ink transition-colors hover:bg-surface-mint lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" strokeWidth={1.75} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=open]:fade-in" />
              <Dialog.Content
                className={cn(
                  "fixed inset-y-0 right-0 z-50 flex w-[min(26rem,92vw)] flex-col bg-surface shadow-(--shadow-mega) outline-none",
                  "data-[state=open]:animate-in data-[state=open]:slide-in-from-right duration-500",
                )}
              >
                <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
                <div className="flex items-center justify-between border-b border-line px-6 py-4">
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-pill border border-line text-ink transition-colors hover:bg-surface-mint"
                      aria-label="Close menu"
                    >
                      <X className="size-5" strokeWidth={1.75} />
                    </button>
                  </Dialog.Close>
                </div>
                <nav className="flex-1 overflow-y-auto px-6 py-7" aria-label="Mobile">
                  <p className="mb-3 text-caption font-medium uppercase tracking-[3px] text-gray">
                    Platforms
                  </p>
                  <ul className="mb-8 space-y-1">
                    {PLATFORM_NAV.map((p, i) => (
                      <li
                        key={p.slug}
                        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both"
                        style={{ animationDelay: `${80 + i * 45}ms`, animationDuration: "500ms" }}
                      >
                        <Link
                          href={`/products/${p.slug}`}
                          className="flex items-center gap-3 rounded-input px-2 py-3 transition-colors hover:bg-surface-mint"
                        >
                          <span className="grid size-9 place-items-center rounded-chip border border-line text-accent-deep">
                            <p.icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                          </span>
                          <span className="flex items-center gap-2 text-body font-medium text-ink">
                            {p.name}
                            {p.live ? <LivePill /> : null}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mb-3 text-caption font-medium uppercase tracking-[3px] text-gray">
                    Company
                  </p>
                  <ul className="space-y-1">
                    {NAV_LINKS.map((link, i) => (
                      <li
                        key={link.href}
                        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:fill-mode-both"
                        style={{ animationDelay: `${420 + i * 45}ms`, animationDuration: "500ms" }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "block rounded-input px-2 py-3 text-body font-medium transition-colors hover:bg-surface-mint",
                            isActive(link.href) ? "text-accent-deep" : "text-ink",
                          )}
                          aria-current={isActive(link.href) ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t border-line p-6">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/get-started">Start Free Trial</Link>
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

function LivePill() {
  return (
    <span className="rounded-pill bg-accent-deep px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[1px] text-white">
      Live
    </span>
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
            "rounded-pill px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors duration-300 ease-(--ease-1) hover:text-accent-deep",
            active ? "text-accent-deep" : "text-ink",
          )}
        >
          {label}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
