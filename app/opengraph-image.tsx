import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f7f8fa 0%, #eef3ea 45%, #e8eef8 100%)",
          color: "#111318",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: "#2f6bff" }}>
          WEEKEND ESCAPES · ROAD TRIPS · INDIA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>
            HarshOnRoads
          </div>
          <div style={{ marginTop: 16, fontSize: 32, color: "#5f6673" }}>
            {siteConfig.tagline}
          </div>
        </div>
        <div
          style={{
            alignSelf: "flex-start",
            borderRadius: 999,
            background: "#b6f04a",
            color: "#14200a",
            padding: "14px 28px",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Find your next escape
        </div>
      </div>
    ),
    size,
  );
}
