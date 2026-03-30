import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCountries } from "@/lib/countries";
import { getAllCities } from "@/lib/cities-md";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hufsha.today";

  const posts = getAllPosts().map((p) => ({
    url: `${base}/${p.frontmatter.slug}`,
    lastModified: new Date(p.frontmatter.date),
  }));

  const destinations = getAllCountries().map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: new Date("2026-03-27"),
  }));

  const cities = getAllCities().map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: new Date("2026-03-27"),
  }));

  const staticPages = [
    { url: base, lastModified: new Date("2026-03-28") },
    { url: `${base}/kosher`, lastModified: new Date("2026-03-27") },
    { url: `${base}/cruises`, lastModified: new Date("2026-03-27") },
    { url: `${base}/organized-tours`, lastModified: new Date("2026-03-27") },
    { url: `${base}/with-kids`, lastModified: new Date("2026-03-27") },
    { url: `${base}/about`, lastModified: new Date("2026-03-27") },
    { url: `${base}/privacy-policy`, lastModified: new Date("2026-03-27") },
  ];

  return [...staticPages, ...destinations, ...cities, ...posts];
}
