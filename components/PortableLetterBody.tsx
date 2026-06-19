import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
  },
  types: {
    pullquote: ({ value }: { value: { text: string } }) => (
      <div className="pullquote" style={{ margin: "var(--space-4) auto" }}>
        <span className="quote-mark" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote>{value.text}</blockquote>
      </div>
    ),
    image: ({ value }: { value: { alt?: string } }) => (
      <figure className="media media--landscape" style={{ margin: "var(--space-8) auto" }}>
        <img src={urlForImage(value)} alt={value.alt ?? ""} />
      </figure>
    ),
  },
};

export function PortableLetterBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
