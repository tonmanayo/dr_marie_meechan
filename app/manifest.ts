import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dr Marie Meechan, PhD — The Fertility Psychotherapist",
    short_name: "Dr Marie Meechan",
    description:
      "Specialist online fertility counselling and coaching with Dr Marie Meechan, PhD — Edinburgh-based, supporting you worldwide.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5EFE6",
    theme_color: "#C47B5A",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
