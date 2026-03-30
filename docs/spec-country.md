# Country Page Spec — /[country-slug]

Rendered by `CountryPage` in `app/[slug]/page.tsx`. Data lives in `lib/destinations.ts`.

## Data Structure

```typescript
{
  slug: 'greece',
  name: 'יוון',
  country: 'יוון',
  flag: 'gr',              // flagcdn.com code
  description: '1-2 sentences',
  tldr: '2-3 sentences with facts and numbers',
  flightTime: 'X:XX שעות',
  currency: 'שם מטבע (CODE)',
  language: 'שפה',
  bestSeason: 'חודש-חודש',
  dailyBudget: '$XXX-XXX לזוג (משוער, נכון ל-2026)',
  temperature: 'XX-XX°C',
  articleSections: [{ title: 'H2 as question?', content: 'paragraphs...' }],
  subDestinations: [{ name: 'עיר', slug: 'city-slug' }],
  faq: [{ q: 'שאלה?', a: '3-4 sentences' }],
  similarDestinations: ['slug1', 'slug2'],
}
```

## Content Requirements

- **Word count**: 500-800 words across all articleSections
- **TL;DR**: 2-3 sentences — why go, how long, how much
- **Fact Box**: All 6 fields filled
- **5 H2 questions** (recommended):
  1. למה [מדינה] פופולרית/מתאימה?
  2. מה העונה הכי טובה?
  3. כמה עולה חופשה ב[מדינה]?
  4. מה חייבים לראות ב[מדינה]?
  5. האם יש כשרות ב[מדינה]?
- **FAQ**: 3-5 questions with 3-4 sentence answers

## Links

- **Cities section**: Cards linking to all subDestinations
- **Articles section**: All posts where `country === name` (auto-filtered)
- **Similar destinations**: 2-3 related country slugs (renders as link chips)

## Schema

Place + Article + FAQ + BreadcrumbList (auto-generated)

## Hero Image

- Saved to `public/images/destinations/[slug].jpg`
- Prompt in `scripts/generate-images.ts` destinationPrompts map
- Compressed: max 1920px wide, JPEG 85%
