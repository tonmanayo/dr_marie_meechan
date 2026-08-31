import type { LetterPost } from "@/components/LetterFilters";
import { urlForImage } from "./image";
import type { LetterListItem } from "./queries";
import { TOPIC_LABELS } from "./topics";

export function letterToPost(letter: LetterListItem): LetterPost {
  return {
    slug: letter.slug,
    topic: letter.topic,
    topicLabel: TOPIC_LABELS[letter.topic] ?? letter.topic,
    img: urlForImage(letter.heroImage),
    alt: letter.alt ?? "",
    title: letter.title,
    excerpt: letter.excerpt,
    meta: `A letter · ${letter.readTime}`,
  };
}
