# City Page Spec — /[city-slug]

Rendered by `CityPage` in `app/[slug]/page.tsx`. Data lives in `lib/cities.ts`.

## Data Structure

```typescript
{
  slug: 'athens',
  name: 'אתונה',
  countrySlug: 'greece',
  countryName: 'יוון',
  flag: 'gr',
  description: '1-2 sentences',
  tldr: '2-3 sentences with facts',
  flightTime: 'X:XX שעות',
  currency: 'שם מטבע (CODE)',
  language: 'שפה',
  bestSeason: 'חודש-חודש',
  dailyBudget: '$XXX-XXX לזוג (משוער, נכון ל-2026)',
  temperature: 'XX-XX°C',
  articleSections: [{ title: 'H2 question?', content: 'paragraphs...' }],
  faq: [{ q: 'שאלה?', a: '3-4 sentences' }],
}
```

## Content Requirements

- **Word count**: 400-600 words across all articleSections
- **TL;DR**: 2-3 sentences — what to expect, how many days, budget
- **Fact Box**: All 6 fields filled
- **H2 questions** (recommended):
  1. כמה ימים צריך ב[עיר]?
  2. מה חייבים לראות ב[עיר]?
  3. איך מגיעים ל[עיר]?
- **FAQ**: 2-3 questions

## Links

- Breadcrumbs: דף הבית / [country] / [city]
- **Articles section**: Posts where `destination === name` (auto-filtered)
- **Sibling cities**: Other cities in same country (auto-rendered)
- **Parent country link**: "כל [country] ←" chip

## Schema

Place + Article + FAQ + BreadcrumbList (auto-generated)

## Hero Image

City pages use gradient fallback (no dedicated hero image). The country's hero image is used for OG/social sharing.
