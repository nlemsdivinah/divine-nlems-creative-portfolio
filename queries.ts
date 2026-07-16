import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(plateNumber asc) {
    _id, plateNumber, title, slug, client, industry, year, summary, coverImage, featured
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(plateNumber asc) {
    _id, plateNumber, title, slug, client, industry, year, summary, coverImage
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ...,
    testimonial->{name, role, photo, quote, rating}
  }
`;

export const allProjectSlugsQuery = groq`*[_type == "project"]{ "slug": slug.current }`;

export const allServicesQuery = groq`*[_type == "service"] | order(order asc)`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc){
    _id, name, role, photo, rating, quote
  }
`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc){
    _id, title, slug, excerpt, coverImage, publishedAt
  }
`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`;
export const allPostSlugsQuery = groq`*[_type == "post"]{ "slug": slug.current }`;
