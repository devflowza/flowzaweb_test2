import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/content/site";
import { WhatsAppIcon } from "./social-icons";

/**
 * Slim utility strip above the navbar. The reference keeps its chrome light, so
 * this sits on the mint tint with accent icons rather than a dark bar.
 */
export function TopBar() {
  return (
    <div className="hidden border-b border-line bg-surface-mint text-caption text-gray lg:block">
      <div className="section-x flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-accent-deep"
          >
            <WhatsAppIcon className="size-3.5 text-accent-deep" />
            {CONTACT.whatsappDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-1.5 rounded-sm transition-colors hover:text-accent-deep"
          >
            <Mail className="size-3.5 text-accent-deep" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.email}
          </a>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-accent-deep" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.hours}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent-deep" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.address}
          </span>
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
    </div>
  );
}
