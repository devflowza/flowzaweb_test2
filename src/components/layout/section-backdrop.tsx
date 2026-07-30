import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Full-bleed background photograph under a white wash. The wash carries the
 * contrast duty: keep it at least via-white/85 on whichever side holds text.
 */
export function SectionBackdrop({ src, wash }: { src: string; wash: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      <div className={cn("absolute inset-0", wash)} />
    </div>
  );
}
