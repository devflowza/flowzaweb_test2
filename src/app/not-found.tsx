import Link from "next/link";
import { ImageFrame } from "@/components/ui/image-frame";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center gap-8 py-24 text-center">
      <div className="w-full max-w-2xl">
        <ImageFrame
          image={{
            src: "/images/pages/not-found.webp",
            alt: "A grid of platform cards with one tile missing, a dashed outline and a magnifier where it should be.",
          }}
          ratio="16/10"
          priority
          sizes="(max-width: 768px) 92vw, 42rem"
        />
      </div>
      <h1 className="fx-accent-gradient text-hero font-semibold">404</h1>
      <p className="text-lede text-gray">
        This page doesn&apos;t exist — it may have moved or never existed.
      </p>
      <Link href="/" className="text-accent-deep underline underline-offset-4">
        Back to home
      </Link>
    </Container>
  );
}
