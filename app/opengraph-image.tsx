import { ImageResponse } from "next/og";

// Default social share card for the whole site. Next adds og:image and
// twitter:image tags pointing at this generated 1200x630 PNG.
export const alt = "Dr Marie Meechan, PhD — The Fertility Psychotherapist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "96px",
        background: "#F5EFE6",
        color: "#7A3E2E",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: 8,
          color: "#C9918A",
          marginBottom: 32,
        }}
      >
        THE FERTILITY PSYCHOTHERAPIST
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 92,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 28,
        }}
      >
        Dr Marie Meechan, PhD
      </div>
      <div style={{ display: "flex", fontSize: 34, color: "#C47B5A", maxWidth: 920 }}>
        Specialist fertility counselling & coaching — Edinburgh & worldwide online
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 56,
          height: 8,
          width: 160,
          background: "#C47B5A",
          borderRadius: 4,
        }}
      />
    </div>,
    { ...size },
  );
}
