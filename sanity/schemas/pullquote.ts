import { defineField, defineType } from "sanity";

export const pullquote = defineType({
  name: "pullquote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: "text" } },
});
