# Homepage Spec — /

## Structure (top to bottom)

1. **Hero**: "לאן טסים היום?" + subtitle + fadeUp animations
2. **Editorial intro**: 300-500 words with internal links to categories and destinations
3. **Destinations grid**: Countries only (from `getAllDestinations()`), asymmetric grid, first card spans 2 rows with "הכי מחופש" badge
4. **Kosher callout**: CTA banner linking to /kosher
5. **Latest articles**: 6 most recent posts in 3-column grid
6. **Cruise banner**: Gradient CTA linking to /cruises

## SEO

- Title: "חופשה היום — לאן טסים היום? מדריכי יעדים, טיולים והפלגות"
- Description: "הבלוג הישראלי לטיולים: מדריכי יעדים מקיפים, טיולים מאורגנים, הפלגות, כשר בחו״ל — הכל בעברית."
- Schema: WebSite + SearchAction

## /destinations Index Page

- Lists ALL countries sorted by article count (most articles first)
- Each card shows: country name, flight time, article count
- Breadcrumbs: דף הבית / יעדים
- Schema: CollectionPage
