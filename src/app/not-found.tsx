import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-40 text-center">
      <h1 className="fx-accent-gradient text-hero font-semibold">404</h1>
      <p className="text-lede text-gray">
        This page doesn&apos;t exist — it may have moved or never existed.
      </p>
      <Link href="/" className="text-accent-deep underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
