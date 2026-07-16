import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "stats", title: "Stats & Trust" },
    { name: "contact", title: "Contact" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string", group: "hero" }),
    defineField({ name: "heroSubheadline", title: "Hero subheadline", type: "text", group: "hero" }),
    defineField({ name: "heroPortrait", title: "Portrait photo", type: "image", options: { hotspot: true }, group: "hero" }),
    defineField({ name: "availability", title: "Availability status", type: "string", group: "hero", description: "e.g. 'Booking September' or 'Not currently available'" }),
    defineField({ name: "resumeFile", title: "Resume (PDF)", type: "file", group: "about" }),
    defineField({ name: "bio", title: "Full biography", type: "array", of: [{ type: "block" }], group: "about" }),
    defineField({ name: "mission", title: "Mission statement", type: "text", group: "about" }),
    defineField({ name: "values", title: "Values", type: "array", of: [{ type: "string" }], group: "about" }),
    defineField({
      name: "timeline",
      title: "Career timeline",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Skill", type: "string" },
            { name: "level", title: "Level (0-100)", type: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "process",
      title: "Workflow steps",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Step title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Animated stats",
      type: "array",
      group: "stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "number" },
            { name: "suffix", title: "Suffix", type: "string", description: "e.g. '+', '%'" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Client logos",
      type: "array",
      group: "stats",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "awards",
      title: "Awards & certifications",
      type: "array",
      group: "stats",
      of: [{ type: "string" }],
    }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string", group: "contact" }),
    defineField({ name: "location", title: "Location", type: "string", group: "contact" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "contact" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "contact" }),
    defineField({ name: "behance", title: "Behance URL", type: "url", group: "contact" }),
    defineField({ name: "dribbble", title: "Dribbble URL", type: "url", group: "contact" }),
    defineField({ name: "calendlyUrl", title: "Calendly URL", type: "url", group: "contact" }),
    defineField({ name: "metaTitle", title: "Default meta title", type: "string", group: "seo" }),
    defineField({ name: "metaDescription", title: "Default meta description", type: "text", group: "seo" }),
    defineField({ name: "ogImage", title: "Default social share image", type: "image", group: "seo" }),
  ],
  preview: { select: { title: "siteName" } },
});
