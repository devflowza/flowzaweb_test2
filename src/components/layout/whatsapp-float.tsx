import { CONTACT } from "@/content/site";
import { WhatsAppIcon } from "./social-icons";

/** Persistent WhatsApp pill, bottom-right on every page. */
export function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2.5 rounded-pill bg-whatsapp py-3.5 pl-4 pr-5 text-body font-medium tracking-[0.5px] text-emerald-950 shadow-(--shadow-lift) transition-all duration-500 ease-(--ease-btn) hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.985] sm:bottom-7 sm:right-7"
    >
      <WhatsAppIcon className="size-5 transition-transform duration-500 ease-(--ease-btn) group-hover:rotate-[8deg]" />
      <span className="max-sm:sr-only">WhatsApp Us</span>
    </a>
  );
}
