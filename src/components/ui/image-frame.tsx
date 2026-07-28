import * as React from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageSlot {
  /** Set once a real photo exists; until then a labelled placeholder renders. */
  src?: string;
  /** Always required — becomes the alt text, and labels the placeholder. */
  alt: string;
  /** Guidance shown in the placeholder, e.g. "1600×1000 · dashboard screenshot". */
  hint?: string;
  /**
   * CSS object-position for this photograph, e.g. "72% center". Set where a
   * centre crop would cut the subject or slice through signage mid-word.
   */
  focal?: string;
}

interface ImageFrameProps {
  image: ImageSlot;
  /** CSS aspect-ratio, e.g. "16/10". Reserves space so nothing shifts. */
  ratio?: string;
  className?: string;
  /** Passed to next/image; ignored by the placeholder. */
  sizes?: string;
  priority?: boolean;
  /** Rounded corners; defaults to the card radius. */
  rounded?: string;
}

/**
 * Renders a photo when `image.src` is set, and a labelled placeholder when it
 * isn't — so layout, spacing and aspect ratios are final before the real
 * photography lands. Drop a `src` into the content layer and the frame fills in
 * with no layout change.
 */
export function ImageFrame({
  image,
  ratio = "16/10",
  className,
  sizes = "100vw",
  priority = false,
  rounded,
}: ImageFrameProps) {
  const shell = cn("relative overflow-hidden", rounded ?? "rounded-card", className);

  if (image.src) {
    return (
      <div className={shell} style={{ aspectRatio: ratio }}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={image.focal ? { objectPosition: image.focal } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(shell, "border border-dashed border-line-soft bg-surface-mint")}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Image placeholder: ${image.alt}`}
    >
      {/* Faint grid so the empty area still reads as a deliberate frame */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(8 8 8 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(8 8 8 / 0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <ImageIcon className="size-6 text-accent-deep" strokeWidth={1.5} aria-hidden="true" />
        <span className="max-w-xs text-caption font-medium text-ink">{image.alt}</span>
        {image.hint ? (
          <span className="text-micro uppercase tracking-[2px] text-gray-soft">{image.hint}</span>
        ) : null}
      </span>
    </div>
  );
}
