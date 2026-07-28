import Link from "next/link";
import type { Route } from "next";
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

/**
 * The reference places breadcrumbs inside the page title block as a simple
 * slash-separated trail in light-weight type.
 */
export function Breadcrumbs({ items, className, dark = false }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-caption font-light",
          dark ? "text-white/70" : "text-gray-soft",
        )}
      >
        <li>
          <Link
            href="/"
            className={cn(
              "rounded-sm transition-colors",
              dark ? "hover:text-white" : "hover:text-accent-deep",
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-sm transition-colors",
                    dark ? "hover:text-white" : "hover:text-accent-deep",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className={dark ? "text-white" : "text-accent-deep"}>
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
