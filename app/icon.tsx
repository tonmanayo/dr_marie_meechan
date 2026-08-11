import { ImageResponse } from "next/og";

// Brand favicon/app-icon: a terracotta serif "M" on aged parchment,
// matching the palette used in opengraph-image.tsx.
const BG = "#F5EFE6";
const FG = "#7A3E2E";

export function generateImageMetadata() {
  return [
    { id: "favicon", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

const SIZES: Record<string, number> = { favicon: 32, "192": 192, "512": 512 };

export default async function Icon({ id }: { id: Promise<string> }) {
  const iconId = await id;
  const dimension = SIZES[iconId] ?? 32;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        color: FG,
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontWeight: 700,
        fontSize: Math.round(dimension * 0.64),
        lineHeight: 1,
      }}
    >
      M
    </div>,
    { width: dimension, height: dimension },
  );
}
