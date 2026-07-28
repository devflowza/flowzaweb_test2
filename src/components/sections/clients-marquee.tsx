import { CLIENTS } from "@/content/site";
import { Marquee } from "@/components/motion/marquee";
import { Kicker } from "@/components/layout/eyebrow";

/**
 * Client social proof. The reference keeps logo strips quiet — small, greyscale
 * and centred beneath a tracked uppercase kicker.
 */
export function ClientsMarquee() {
  return (
    <section aria-label="Clients" className="bg-surface-tint py-14">
      <Kicker className="mb-9 text-center">
        Powering operations for teams across MEA &amp; India
      </Kicker>
      <Marquee duration="55s">
        {CLIENTS.map((client) => (
          <span
            key={client.name}
            className="mx-3 flex shrink-0 items-center gap-3 rounded-pill border border-line bg-surface py-2.5 pl-2.5 pr-5"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-pill bg-accent-mint text-[0.62rem] font-semibold text-accent-deep"
            >
              {client.initials}
            </span>
            <span className="whitespace-nowrap text-body font-light text-gray">{client.name}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
