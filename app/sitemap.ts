import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllDestinations } from "@/lib/destinations";
import { getAllCities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hufsha.today";

  const posts = getAllPosts().map((p) => ({
    url: `${base}/${p.frontmatter.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const destinations = getAllDestinations().map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const cities = getAllCities().map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: base, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${base}/kosher`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/cruises`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/organized-tours`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/with-kids`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  return [...staticPages, ...destinations, ...cities, ...posts];
}
