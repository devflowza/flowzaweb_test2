import { ImageResponse } from "next/og";
import { getPlatform, PLATFORM_SLUGS } from "@/content/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return PLATFORM_SLUGS.map((slug) => ({ slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  return [
    {
      id: "og",
      size,
      contentType,
      alt: platform ? `${platform.name} — ${platform.tagline}` : "FlowZa AI platform",
    },
  ];
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  const name = platform?.name ?? "FlowZa AI";
  const tagline = platform?.tagline ?? "Business Operating Systems";
  const accent = platform?.color ?? "#22d3ee";
  const accentDeep = platform?.colorSecondary ?? "#2563eb";
  const index = platform?.index ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0b1120",
        backgroundImage: `radial-gradient(680px 400px at 90% 5%, ${accent}45, transparent 62%), radial-gradient(560px 340px at 5% 100%, ${accentDeep}35, transparent 62%)`,
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: accent,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 46,
              height: 2,
              backgroundImage: `linear-gradient(90deg,${accent},${accentDeep})`,
            }}
          />
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: accentDeep,
            }}
          />
          <div style={{ display: "flex", marginLeft: 8 }}>FlowZa AI Platform</div>
        </div>
        <div style={{ display: "flex", fontSize: 30 }}>{index}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
          {name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "rgba(255,255,255,0.8)" }}>
          {tagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <div style={{ display: "flex" }}>Seven Systems. One Operating Fabric.</div>
        <div style={{ display: "flex" }}>flowza.ai</div>
      </div>
    </div>,
    size,
  );
}
