import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity.client";
import { allProjectSlugsQuery, allPostSlugsQuery } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
  const [projects, posts]: [{ slug: string }[], { slug: string }[]] = await Promise.all([
    client.fetch(allProjectSlugsQuery).catch(() => []),
    client.fetch(allPostSlugsQuery).catch(() => []),
  ]);

  const staticRoutes = ["", "/about", "/services", "/portfolio", "/contact", "/blog"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
