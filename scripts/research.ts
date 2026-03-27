#!/usr/bin/env node
/**
 * 🧠 Article Research Engine — hufsha.today
 * 
 * מערכת מחקר רב-מוחית לפני כתיבת מאמרים.
 * שולחת שאלות מחקר ל-3 מוחות AI (Claude, Gemini, ChatGPT),
 * אוספת תשובות, ומייצרת דף מחקר מאוחד.
 * 
 * שימוש:
 *   npx tsx scripts/research.ts "בודפשט עם ילדים" "budapest-with-kids"
 * 
 * דרישות:
 *   .env.local עם:
 *     ANTHROPIC_API_KEY=sk-ant-...
 *     GEMINI_API_KEY=AIza...
 *     OPENAI_API_KEY=sk-...       (אופציונלי)
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// ═══════════════════════════════════════
// שאלות המחקר — נשלחות לכל 3 המוחות
// ═══════════════════════════════════════

function buildResearchPrompt(topic: string): string {
  return `
אתה עוזר לכתוב מאמר מקצועי בעברית לבלוג טיולים ישראלי בנושא: "${topic}"
המאמר צריך להיות מדויק, מקצועי, עם מידע פרקטי אמיתי בלבד.

ענה על כל השאלות הבאות בעברית. אל תמציא שום עובדה — רק מידע שאתה בטוח ב-100% שנכון.

1. **אטרקציות מומלצות** — רשימה של 10-15 אטרקציות/פעילויות, כולל:
   - שם המקום (בעברית + שם מקורי)
   - למי מתאים (גילאים, סוג טיול)
   - טווח מחירים משוער
   - האם צריך להזמין מראש

2. **מסלול מומלץ** — מסלול יום-יום (4 ימים), עם קצב מתאים. כל יום: בוקר, צהריים, אחר הצהריים.

3. **תקציב מפורט** — טווחי מחירים ל:
   - טיסות מישראל
   - לינה (מלון/דירה, לזוג ולמשפחה)
   - אוכל (ארוחה במסעדה, סטריט פוד, סופרמרקט)
   - תחבורה (כרטיס יומי, מונית, uber)
   - כניסה לאטרקציות
   - סה"כ יומי ממוצע

4. **טיפים ייחודיים** — 5-7 טיפים שלא נמצאים בכל מדריך. דברים שרק מי שהיה שם יודע.

5. **טעויות נפוצות** — 5 טעויות שמטיילים ישראלים עושים ביעד הזה.

6. **עונות ומזג אוויר** — מהי העונה הכי טובה ולמה. טמפרטורות לפי חודש.

7. **כשרות ואוכל** — אפשרויות כשרות (בתי חב"ד, מסעדות), אוכל מקומי שחובה לטעום, אלרגנים שצריך לשים לב אליהם.

8. **תחבורה** — איך להתנייד, אפליקציות מומלצות, כרטיסים מוזלים, טיפים.

9. **FAQ — 5 שאלות** שאנשים ישראלים באמת שואלים על "${topic}", עם תשובות מפורטות של 3-4 משפטים לפחות.

10. **מה ייחודי** — מה מייחד את היעד הזה לעומת יעדים דומים באירופה? למה דווקא פה?

חשוב: ציין מתי אתה לא בטוח במשהו. עדיף לכתוב "לא בטוח, כדאי לבדוק" מאשר להמציא.
`;
}

// ═══════════════════════════════════════
// API Calls
// ═══════════════════════════════════════

async function askClaude(prompt: string): Promise<string> {
  if (!ANTHROPIC_KEY) return '⚠️ ANTHROPIC_API_KEY חסר ב-.env.local';

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 8192,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || '❌ תשובה ריקה מ-Claude';
  } catch (e: any) {
    return `❌ שגיאת Claude: ${e.message}`;
  }
}

async function askGemini(prompt: string): Promise<string> {
  if (!GEMINI_KEY) return '⚠️ GEMINI_API_KEY חסר ב-.env.local';

  const models = ['gemini-3-ultra', 'gemini-3.1-pro-preview'];

  for (const model of models) {
    try {
      console.log(`   🟢 מנסה Gemini: ${model}...`);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await res.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log(`   🟢 הצליח עם: ${model}`);
        return data.candidates[0].content.parts[0].text;
      }
      if (data.error) {
        console.log(`   ⚠️ ${model} נכשל: ${data.error.message}. מנסה הבא...`);
        continue;
      }
    } catch (e: any) {
      console.log(`   ⚠️ ${model} שגיאה: ${e.message}. מנסה הבא...`);
      continue;
    }
  }
  return '❌ כל מודלי Gemini נכשלו';
}

async function askChatGPT(prompt: string): Promise<string> {
  if (!OPENAI_KEY) return '⚠️ OPENAI_API_KEY חסר ב-.env.local — דלג על ChatGPT';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300_000); // 5 min timeout
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 8192,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '❌ תשובה ריקה מ-ChatGPT';
  } catch (e: any) {
    return `❌ שגיאת ChatGPT: ${e.message}`;
  }
}

// ═══════════════════════════════════════
// Main
// ═══════════════════════════════════════

async function main() {
  const topic = process.argv[2];
  const slug = process.argv[3];

  if (!topic || !slug) {
    console.log(`
🧠 Article Research Engine — hufsha.today

שימוש:
  npx tsx scripts/research.ts "נושא המאמר" "article-slug"

דוגמה:
  npx tsx scripts/research.ts "בודפשט עם ילדים" "budapest-with-kids"
  npx tsx scripts/research.ts "מלון כשר בקפריסין" "kosher-hotel-cyprus"
  npx tsx scripts/research.ts "הפלגות מחיפה 2026" "cruises-from-haifa-2026"

דרישות:
  הוסף ל-.env.local:
    ANTHROPIC_API_KEY=sk-ant-...
    GEMINI_API_KEY=AIza...
    OPENAI_API_KEY=sk-...  (אופציונלי)
`);
    process.exit(1);
  }

  const prompt = buildResearchPrompt(topic);
  const outDir = path.join(process.cwd(), 'research');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log(`\n🧠 מתחיל מחקר על: "${topic}"\n`);
  console.log(`📡 שולח שאלות ל-3 מוחות במקביל...\n`);

  // שולח לכולם במקביל
  const [claude, gemini, chatgpt] = await Promise.all([
    askClaude(prompt).then(r => { console.log('✅ Claude סיים'); return r; }),
    askGemini(prompt).then(r => { console.log('✅ Gemini סיים'); return r; }),
    askChatGPT(prompt).then(r => { console.log('✅ ChatGPT סיים'); return r; }),
  ]);

  // בונה דף מחקר מאוחד
  const timestamp = new Date().toISOString().split('T')[0];
  const researchDoc = `# 🧠 דף מחקר: ${topic}
# נוצר: ${timestamp}
# slug: ${slug}

---

# 🔵 Claude (Anthropic)

${claude}

---

# 🟢 Gemini (Google)

${gemini}

---

# 🟡 ChatGPT (OpenAI)

${chatgpt}

---

# 📝 הוראות לכתיבה

השתמש בדף מחקר זה כבסיס לכתיבת המאמר.
קרא את שלוש התשובות, שלב את המידע הטוב ביותר מכל אחת:

1. קח עובדות שמופיעות ב-2 מקורות לפחות (הצלבה)
2. כשיש סתירה — בחר את הגרסה הזהירה יותר
3. מחירים — השתמש בטווח הרחב ביותר עם "משוער, נכון ל-2026"
4. שמות מקומות — רק אם מופיעים ב-2 מקורות לפחות
5. טיפים — שלב את הייחודיים מכל מקור

כתוב לפי CLAUDE.md ו-TEXTBOOK.md.
`;

  const outPath = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(outPath, researchDoc, 'utf-8');

  console.log(`\n✨ דף מחקר נשמר: ${outPath}`);
  console.log(`\n📊 סיכום:`);
  console.log(`   Claude:  ${claude.length} תווים`);
  console.log(`   Gemini:  ${gemini.length} תווים`);
  console.log(`   ChatGPT: ${chatgpt.length} תווים`);
  console.log(`\n🔜 השלב הבא: כתוב את המאמר על בסיס דף המחקר.`);
  console.log(`   הפעל: claude "Read research/${slug}.md, CLAUDE.md, and TEXTBOOK.md. Write the article for ${slug}."`);
}

main().catch(console.error);
