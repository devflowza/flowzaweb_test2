import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { CONTACT } from "@/content/site";
import { WhatsAppIcon } from "./social-icons";

/** Navy utility strip above the header. */
export function TopBar() {
  return (
    <div className="bg-navy-950 text-[0.8125rem] text-white/75">
      <div className="mx-auto flex h-10 w-full max-w-[90rem] items-center justify-between gap-4 px-(--spacing-gutter)">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-sm text-white/90 transition-colors hover:text-whatsapp"
          >
            <WhatsAppIcon className="size-3.5 text-whatsapp" />
            <span className="font-mono tracking-tight">{CONTACT.whatsappDisplay}</span>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden items-center gap-1.5 rounded-sm transition-colors hover:text-white sm:flex"
          >
            <Mail className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.email}
          </a>
          <span className="hidden items-center gap-1.5 lg:flex">
            <Clock className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.hours}
          </span>
          <span className="hidden items-center gap-1.5 xl:flex">
            <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {CONTACT.address}
          </span>
        </div>
        <Link
          href="/status"
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1 pl-2.5 pr-3 transition-colors hover:border-white/25 hover:text-white"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-emerald-400" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="hidden sm:inline">All systems operational</span>
          <span className="sm:hidden">Status</span>
        </Link>
      </div>
    </div>
  );
}
