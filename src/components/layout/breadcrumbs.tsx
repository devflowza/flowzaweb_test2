import Link from "next/link";
import type { Route } from "next";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: Route;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
  dark?: boolean;
}

/** Visual breadcrumb — pair with the BreadcrumbList JSON-LD from lib/seo. */
export function Breadcrumbs({ items, className, dark = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 font-mono text-[0.72rem] uppercase tracking-[0.1em]",
          dark ? "text-white/55" : "text-muted",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "rounded-sm transition-colors",
              dark ? "hover:text-white" : "hover:text-ink",
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              <ChevronRight className="size-3 opacity-60" strokeWidth={1.75} aria-hidden="true" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-sm transition-colors",
                    dark ? "hover:text-white" : "hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={dark ? "text-white/85" : "text-ink"}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
