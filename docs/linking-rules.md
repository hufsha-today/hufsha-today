# Internal Linking Rules

Every page links UP (to parent) and DOWN (to children). No orphan pages.

## Article → (outbound links)

- Country page (parent): `/[countrySlug]`
- Category page: `/[category-slug]` (with-kids, kosher, cruises, organized-tours)
- City page (if relevant): `/[destinationSlug]`
- 2+ related articles in same country or category
- Breadcrumbs: דף הבית / [category] / [title]

## Country → (outbound links)

- All city cards: `/[city-slug]` for each subDestination
- All articles where `country === name` (auto-filtered by CountryPage)
- 2-3 similar countries: chips linking to `/[similar-slug]`
- Breadcrumbs: דף הבית / [country]

## City → (outbound links)

- Country page (parent): `/[countrySlug]`
- All articles where `destination === name` (auto-filtered by CityPage)
- Sibling cities in same country (auto-rendered)
- Breadcrumbs: דף הבית / [country] / [city]

## Category → (outbound links)

- All articles in this category (auto-filtered)
- Breadcrumbs: דף הבית / [category]

## Homepage → (outbound links)

- All countries via destination cards
- 6 latest articles via post cards
- /kosher (callout banner)
- /cruises (cruise banner)
- /with-kids, /organized-tours (editorial intro links)

## Destinations Index (/destinations)

- All countries sorted by article count
- Breadcrumbs: דף הבית / יעדים
