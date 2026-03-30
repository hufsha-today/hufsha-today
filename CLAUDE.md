@AGENTS.md

# hufsha.today — Content & Development Rules

For page-specific specs, read the relevant file in `docs/` folder:
- `docs/spec-article.md` — Article pages
- `docs/spec-country.md` — Country/destination pages
- `docs/spec-city.md` — City pages
- `docs/spec-category.md` — Category pages
- `docs/spec-homepage.md` — Homepage + destinations index
- `docs/workflow.md` — Research, writing, publishing process
- `docs/linking-rules.md` — Internal linking requirements

---

## Rule 1: Don't Fabricate

- Never invent hotel/restaurant names, addresses, phone numbers, or people's names
- Prices always as ranges + "משוער, נכון ל-2026"
- When unsure: "באזור X ניתן למצוא..." / "מומלץ לבדוק מראש"
- Never mention competitor names (tour companies, booking sites, other blogs)
- Chabad: OK to mention existence, always link to chabad.org for details

## Rule 2: Hebrew Quality

- Short sentences (max 25 words), paragraphs of 3-5 sentences
- Address reader as אתם/תוכלו/תמצאו (second person plural)
- No cliches: "פנינה נסתרת", "חוויה שלא תשכחו", "עוצר נשימה"
- No AI patterns: "בין אם...ובין אם", "מציע מגוון רחב של", "מהווה יעד אידיאלי"
- Read aloud test: if it sounds like Wikipedia or a brochure, rewrite it

## Rule 3: SEO & AEO

- H2 headings phrased as questions ("כמה ימים צריך ב...?")
- Primary keyword: 3-5 times (H1, TL;DR, one H2, body, FAQ)
- Title tag: <60 chars. Meta description: <155 chars.
- Every page: TL;DR box, Fact Box (6 fields), FAQ with schema
- FAQ answers: 3-4 sentences minimum, not one-liners

## Rule 4: Images

- VIVID suffix on every prompt (defined in scripts/generate-images.ts)
- Model: gemini-3-pro-image-preview via direct Gemini API (NOT MCP nano-banana)
- Compress with sharp: posts 1200px wide, destinations 1920px wide, JPEG 85%, target <150KB
- Prompt format: "Photorealistic photograph of [subject], [details], [lighting]" + VIVID
- No people close-up, no text in images, no logos

## Rule 5: Research First

- Before every article: `npx tsx scripts/research.ts "topic" "slug"`
- Model: gemini-3.1-pro-preview (configured in scripts/research.ts)
- Use only facts confirmed by 2+ sources. When sources conflict, use the cautious version.
- Prices: use the widest range across sources

## Rule 6: Pre-commit Checks

- Budget tables: min total = sum of row mins, max total = sum of row maxes
- TL;DR = Fact Box = body = FAQ (all numbers consistent)
- Internal links point to real pages
- Images exist and are compressed
- `npm run build` passes
- User reviews and approves BEFORE push. Never auto-push.
