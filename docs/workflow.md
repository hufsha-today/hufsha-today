# Workflow — Research, Writing, Publishing

## 1. Research (required before every article)

```bash
npx tsx scripts/research.ts "נושא בעברית" "slug-in-english"
```

- Uses **gemini-3.1-pro-preview** model (configured in scripts/research.ts)
- Saves research to `research/[slug].md`
- Cross-reference rule: use only facts confirmed by 2+ sources
- Prices: use the widest range found across sources

## 2. Writing

1. Read the relevant spec in `docs/` (spec-article.md, spec-country.md, etc.)
2. Read the research file in `research/[slug].md`
3. Write content following CLAUDE.md rules
4. Verify all budget tables add up (min=sum of mins, max=sum of maxes)
5. Add internal links per `docs/linking-rules.md`
6. Generate hero image via `scripts/generate-images.ts` (direct Gemini API)

## 3. Pre-commit Checklist

- [ ] Budget tables: all rows add up to total, TL;DR = Fact Box = body = FAQ
- [ ] No number appears in two different versions in the article
- [ ] Internal links exist and point to real pages
- [ ] Hero image exists in public/images/ and is <150KB JPEG
- [ ] `npm run build` passes with no errors
- [ ] No API keys or secrets in committed code

## 4. Publishing

- **CRITICAL**: User reviews and approves BEFORE push. Never auto-push.
- Commit message format: descriptive, English, with Co-Authored-By
- After push: verify build succeeds on deployment
