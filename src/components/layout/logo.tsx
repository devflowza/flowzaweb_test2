import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/content/site";

interface LogoProps {
  dark?: boolean;
  className?: string;
}

export function Logo({ dark = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 rounded-input", className)}
      aria-label={`${SITE.name} — home`}
    >
      <Image
        src="/images/brand/logo.webp"
        alt=""
        width={44}
        height={44}
        className="size-10 rounded-chip object-cover lg:size-11"
        priority
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-h5 font-semibold tracking-[-0.02em]",
            dark ? "text-white" : "text-ink",
          )}
        >
          FlowZa <span className="text-accent-deep">AI</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-medium uppercase tracking-[2px]",
            dark ? "text-white/60" : "text-gray",
          )}
        >
          {SITE.tagline}
        </span>
      </span>
    </Link>
  );
}
