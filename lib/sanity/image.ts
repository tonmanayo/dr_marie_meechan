import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlForImage(source: SanityImageSource | undefined): string {
  if (!builder || !source) return "";
  return builder.image(source).auto("format").fit("max").url();
}
