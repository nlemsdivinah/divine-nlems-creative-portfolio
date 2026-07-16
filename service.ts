import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display order", type: "number" }),
    defineField({ name: "icon", title: "Icon name (lucide)", type: "string", description: "e.g. 'palette', 'package', 'layout'" }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string", initialValue: "Start a project" }),
    defineField({ name: "startingPrice", title: "Starting price (optional)", type: "string" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title" } },
});
