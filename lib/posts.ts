import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  category: string;
  destination: string;
  country: string;
  excerpt: string;
  keywords: string[];
  tldr: string;
  image?: string;
  author?: string;
  factBox: {
    flightTime: string;
    currency: string;
    language: string;
    bestSeason: string;
    dailyBudget: string;
    temperature: string;
  };
  faq: { q: string; a: string }[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  htmlContent: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(postsDir, f), "utf8");
      const { data, content } = matter(raw);
      const result = remark().use(html, { sanitize: false }).processSync(content);
      return {
        frontmatter: data as PostFrontmatter,
        content,
        htmlContent: String(result),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.frontmatter.slug === slug);
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostsByDestination(destination: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.destination === destination);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter(
      (p) =>
        p.frontmatter.slug !== post.frontmatter.slug &&
        (p.frontmatter.category === post.frontmatter.category ||
          p.frontmatter.destination === post.frontmatter.destination)
    )
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.frontmatter.slug);
}
