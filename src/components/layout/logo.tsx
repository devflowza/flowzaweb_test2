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
      className={cn("group flex items-center gap-3 rounded-xl", className)}
      aria-label={`${SITE.name} — home`}
    >
      <span className={cn("rounded-xl p-px", dark ? "bg-white/15" : "bg-slate-900/8")}>
        <Image
          src="/images/brand/logo.webp"
          alt=""
          width={44}
          height={44}
          className="size-10 rounded-[calc(0.75rem-1px)] object-cover sm:size-11"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.06rem] font-semibold tracking-tight",
            dark ? "text-white" : "text-ink",
          )}
        >
          FlowZa {/* 17px counts as small text, so it needs the 4.5:1 gradient variants. */}
          <span className={dark ? "fx-gradient-text-light" : "fx-gradient-text-strong"}>AI</span>
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em]",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {SITE.tagline}
        </span>
      </span>
    </Link>
  );
}
