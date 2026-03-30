/**
 * One-time migration script: converts destinations.ts and cities.ts
 * TypeScript constants into content/countries/*.md and content/cities/*.md
 * markdown files with YAML frontmatter + body sections.
 */
import { destinations } from '../lib/destinations';
import { cities } from '../lib/cities';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const countriesDir = path.join(process.cwd(), 'content', 'countries');
const citiesDir = path.join(process.cwd(), 'content', 'cities');

fs.mkdirSync(countriesDir, { recursive: true });
fs.mkdirSync(citiesDir, { recursive: true });

// Convert destinations to markdown
for (const dest of destinations) {
  const { articleSections, ...frontmatterData } = dest;

  // Build body from articleSections
  const body = articleSections
    .map((s) => `## ${s.title}\n\n${s.content}`)
    .join('\n\n');

  const output = matter.stringify('\n' + body + '\n', frontmatterData);
  const filePath = path.join(countriesDir, `${dest.slug}.md`);
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Created: content/countries/${dest.slug}.md`);
}

// Convert cities to markdown
for (const city of cities) {
  const { articleSections, ...frontmatterData } = city;

  const body = articleSections
    .map((s) => `## ${s.title}\n\n${s.content}`)
    .join('\n\n');

  const output = matter.stringify('\n' + body + '\n', frontmatterData);
  const filePath = path.join(citiesDir, `${city.slug}.md`);
  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`Created: content/cities/${city.slug}.md`);
}

console.log(
  `\nDone! Created ${destinations.length} country files and ${cities.length} city files.`
);
