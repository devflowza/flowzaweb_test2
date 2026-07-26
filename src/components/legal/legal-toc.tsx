"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocEntry {
  id: string;
  label: string;
}

/** Sticky table of contents built from the rendered document's h2 anchors, with scroll-spy. */
export function LegalToc() {
  const [entries, setEntries] = React.useState<TocEntry[]>([]);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("#legal-body h2[id]"),
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the rendered DOM once after mount
    setEntries(headings.map((h) => ({ id: h.id, label: h.textContent ?? "" })));

    const io = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  if (entries.length === 0) return <div className="hidden lg:block" aria-hidden="true" />;

  return (
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
          On this page
        </p>
        <ul className="mt-4 space-y-1 border-l border-line">
          {entries.map((entry) => (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors duration-300",
                  active === entry.id
                    ? "border-brand-600 font-medium text-brand-700"
                    : "border-transparent text-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
