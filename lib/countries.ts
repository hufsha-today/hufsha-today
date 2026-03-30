import fs from "fs";
import path from "path";
import matter from "gray-matter";

const countriesDir = path.join(process.cwd(), "content", "countries");

export interface Country {
  slug: string;
  name: string;
  country: string;
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
  subDestinations: { name: string; slug: string }[];
  faq: { q: string; a: string }[];
  similarDestinations: string[];
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
      sections.push({ title, content: sectionContent });
    }
  }
  return sections;
}

export function getAllCountries(): Country[] {
  if (!fs.existsSync(countriesDir)) return [];
  return fs
    .readdirSync(countriesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(countriesDir, f), "utf8");
      const { data, content } = matter(raw);
      const articleSections = parseArticleSections(content);
      return {
        ...(data as Omit<Country, "articleSections">),
        articleSections,
      };
    });
}

export function getCountryBySlug(slug: string): Country | undefined {
  return getAllCountries().find((c) => c.slug === slug);
}
