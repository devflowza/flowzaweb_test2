import { CLIENTS } from "@/content/site";
import { Marquee } from "@/components/motion/marquee";

export function ClientsMarquee() {
  return (
    <section aria-label="Clients" className="border-y border-line bg-surface-tint py-10">
      <h2 className="mb-7 text-center font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
        Powering operations for teams across MEA &amp; India
      </h2>
      <Marquee duration="55s">
        {CLIENTS.map((client) => (
          <span
            key={client.name}
            className="mx-2.5 flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2 pr-4 shadow-hairline"
          >
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-full bg-navy-950 font-mono text-[0.6rem] font-semibold text-white"
            >
              {client.initials}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-body">{client.name}</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
