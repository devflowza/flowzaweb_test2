import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        backgroundImage:
          "radial-gradient(640px 360px at 8% 0%, rgba(34,211,238,0.22), transparent 62%), radial-gradient(760px 420px at 95% 15%, rgba(37,99,235,0.30), transparent 62%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#22d3ee",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 46,
              height: 2,
              backgroundImage: "linear-gradient(90deg,#22d3ee,#2563eb)",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#2563eb",
            }}
          />
          <div style={{ display: "flex", marginLeft: 8 }}>{SITE.tagline}</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, letterSpacing: -4 }}>
          <span>FlowZa&nbsp;</span>
          <span
            style={{
              backgroundImage: "linear-gradient(94deg, #22d3ee, #60a5fa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 42, color: "rgba(255,255,255,0.85)" }}>
          One Platform. Infinite Flow.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
