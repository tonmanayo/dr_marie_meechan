import { ImageResponse } from "next/og";

// Apple touch icon (iOS applies its own rounded mask over this square).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5EFE6",
        color: "#7A3E2E",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontWeight: 700,
        fontSize: 116,
        lineHeight: 1,
      }}
    >
      M
    </div>,
    { ...size },
  );
}
