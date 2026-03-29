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
    lastModified: new Date("2026-03-27"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const cities = getAllCities().map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: new Date("2026-03-27"),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: base, changeFrequency: "daily" as const, priority: 1.0, lastModified: new Date("2026-03-28") },
    { url: `${base}/kosher`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: new Date("2026-03-27") },
    { url: `${base}/cruises`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: new Date("2026-03-27") },
    { url: `${base}/organized-tours`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: new Date("2026-03-27") },
    { url: `${base}/with-kids`, changeFrequency: "weekly" as const, priority: 0.7, lastModified: new Date("2026-03-27") },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.3, lastModified: new Date("2026-03-27") },
    { url: `${base}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.2, lastModified: new Date("2026-03-27") },
  ];

  return [...staticPages, ...destinations, ...cities, ...posts];
}
