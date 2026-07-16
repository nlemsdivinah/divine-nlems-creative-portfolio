import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Client name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / company", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required().max(500) }),
    defineField({ name: "relatedProject", title: "Related project", type: "reference", to: [{ type: "project" }] }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
