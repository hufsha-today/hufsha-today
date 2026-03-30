import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const citiesDir = path.join(process.cwd(), "content", "cities");

export interface City {
  slug: string;
  name: string;
  countrySlug: string;
  countryName: string;
  flag: string;
  description: string;
  tldr: string;
  flightTime: string;
  currency: string;
  language: string;
  bestSeason: string;
  dailyBudget: string;
  temperature: string;
  articleSections: { title: string; content: string }[];
  faq: { q: string; a: string }[];
}

function parseArticleSections(
  content: string
): { title: string; content: string }[] {
  const sections: { title: string; content: string }[] = [];
  const parts = content.split(/^## /m).filter(Boolean);
  for (const part of parts) {
    const newlineIndex = part.indexOf("\n");
    if (newlineIndex === -1) continue;
    const title = part.substring(0, newlineIndex).trim();
    const sectionContent = part.substring(newlineIndex + 1).trim();
    if (title && sectionContent) {
      const processed = remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .processSync(sectionContent);
      sections.push({ title, content: String(processed) });
    }
  }
  return sections;
}

export function getAllCities(): City[] {
  if (!fs.existsSync(citiesDir)) return [];
  return fs
    .readdirSync(citiesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(citiesDir, f), "utf8");
      const { data, content } = matter(raw);
      const articleSections = parseArticleSections(content);
      return {
        ...(data as Omit<City, "articleSections">),
        articleSections,
      };
    });
}

export function getCityBySlug(slug: string): City | undefined {
  return getAllCities().find((c) => c.slug === slug);
}

export function getCitiesByCountry(countrySlug: string): City[] {
  return getAllCities().filter((c) => c.countrySlug === countrySlug);
}
