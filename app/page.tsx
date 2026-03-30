import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCountries } from "@/lib/countries";
import DestinationCard from "@/components/DestinationCard";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "חופשה היום — לאן טסים היום?",
  description:
    "הבלוג הישראלי לטיולים וחופשות. מדריכי יעדים, טיולים מאורגנים, הפלגות, כשר — הכל בעברית.",
  alternates: { canonical: "https://hufsha.today" },
};

export default function HomePage() {
  const posts = getAllPosts();
  const destinations = getAllCountries();

  function getPostCount(destName: string, country?: string) {
    return posts.filter(
      (p) =>
        p.frontmatter.destination === destName ||
        p.frontmatter.country === destName ||
        (country && p.frontmatter.country === country)
    ).length;
  }

  return (
    <>
      {/* Hero */}
      <section className="text-center pt-20 pb-16 px-7 max-w-[700px] mx-auto max-md:pt-12 max-md:pb-10 max-md:px-5">
        <div className="inline-block text-xs font-medium text-teal bg-teal-light py-[5px] px-3.5 rounded-[20px] mb-6 opacity-0 animate-[fadeUp_0.5s_0.1s_forwards]">
          ✈ המדריך שלך לחופשה הבאה
        </div>
        <h1 className="text-[54px] font-black text-dark leading-[1.15] mb-[18px] animate-[fadeUp_0.5s_0.2s_forwards] max-md:text-[38px]">
          לאן טסים <span className="text-orange">היום</span>?
        </h1>
        <p className="text-[19px] text-muted leading-[1.7] mb-9 opacity-0 animate-[fadeUp_0.5s_0.3s_forwards]">
          מדריכי יעדים, טיולים מאורגנים, הפלגות וכשר בחו&quot;ל — הכל במקום אחד, בעברית.
        </p>
      </section>

      {/* Editorial intro */}
      <section className="max-w-[740px] mx-auto px-7 pb-14 text-text text-[17px] leading-[1.85] max-md:px-5">
        <h2 className="text-[22px] font-[800] text-dark mb-4">מה תמצאו בחופשה היום?</h2>
        <p className="mb-4">
          חופשה היום הוא הבלוג הישראלי שעוזר לכם לתכנן את הטיול הבא — בלי לבזבז שעות על חיפושים.
          אנחנו מרכזים מדריכי יעדים מפורטים עם תקציבים, טיפים מעשיים ותוכניות יום-יום,
          כדי שתוכלו להגיע מוכנים ולהתמקד בחוויה עצמה.
        </p>
        <p className="mb-4">
          אם אתם מחפשים <Link href="/kosher" className="text-teal font-semibold hover:underline">חופשה כשרה בחו&quot;ל</Link>,
          תמצאו אצלנו מדריכים עם מסעדות כשרות, מלונות ידידותיים לשומרי שבת ובתי חב&quot;ד — בכל יעד.
          אנחנו מקפידים לציין מה מאומת ומה דורש בדיקה מראש, כי בנושא כשרות אין מקום לניחושים.
        </p>
        <p className="mb-4">
          טסים <Link href="/with-kids" className="text-teal font-semibold hover:underline">עם ילדים</Link>?
          המדריכים שלנו כוללים אטרקציות מתאימות לכל גיל, המלצות על קצב נכון לטיול משפחתי,
          ותקציבים שלוקחים בחשבון את כל המשפחה. בין אם מדובר
          ב<Link href="/budapest" className="text-teal font-semibold hover:underline">בודפשט</Link>,
          {" "}<Link href="/greece" className="text-teal font-semibold hover:underline">יוון</Link> או
          {" "}<Link href="/cyprus" className="text-teal font-semibold hover:underline">קפריסין</Link> —
          יש מדריך שמחכה לכם.
        </p>
        <p className="mb-4">
          כל המחירים באתר הם משוערים ומעודכנים לשנת 2026. אנחנו משתמשים בטווחים ולא במספרים מדויקים,
          ותמיד ממליצים לבדוק פרטים לפני הזמנה. המטרה שלנו פשוטה: לתת לכם תמונה ברורה של מה שמחכה לכם ביעד,
          כדי שתוכלו להחליט אם הוא מתאים לכם — ולצאת לדרך.
        </p>
        <p>
          מתעניינים ב<Link href="/cruises" className="text-teal font-semibold hover:underline">הפלגות מישראל</Link>?
          גם את זה יש כאן — מסלולים, חברות שייט, מחירים וטיפים ממי שכבר הפליג.
          ואם <Link href="/organized-tours" className="text-teal font-semibold hover:underline">טיול מאורגן</Link> זה הסגנון שלכם,
          יש לנו מדריכים שיעזרו לכם להבין מה ההבדלים בין סוגי הטיולים ומה מתאים לכם.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-[1100px] mx-auto px-7">
        <hr className="border-none border-t border-border m-0 mb-12" />
      </div>

      {/* Destinations */}
      <div className="max-w-[1100px] mx-auto px-7 pb-14">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[22px] font-[800] text-dark">יעדים פופולריים</h2>
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[260px_220px] gap-3.5 max-md:grid-cols-2 max-md:grid-rows-none max-md:[&>*]:h-[170px]">
          {destinations.map((d, i) => {
            const count = getPostCount(d.name, d.country);
            return (
              <DestinationCard
                key={d.slug}
                name={d.name}
                slug={d.slug}
                sub={`${d.flightTime} טיסה · ${count} מאמרים`}
                tag={i === 0 ? "הכי מחופש" : undefined}
                spanRows={i === 0}
                priority={i < 3}
              />
            );
          })}
        </div>
      </div>

      {/* Kosher callout */}
      <div className="max-w-[1100px] mx-auto px-7">
        <Link
          href="/kosher"
          className="flex items-center gap-5 bg-kosher-bg border border-kosher-border rounded-2xl py-6 px-7 cursor-pointer transition-transform duration-200 hover:-translate-y-[2px] mb-14 no-underline"
        >
          <div className="w-[52px] h-[52px] bg-orange rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://flagcdn.com/24x18/il.png"
              alt="דגל ישראל"
              width={24}
              height={18}
              style={{ display: "inline" }}
            />
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-dark mb-0.5">
              כשר בחו&quot;ל — המדריך המלא
            </h3>
            <p className="text-sm text-[#999]">
              מלונות כשרים, מסעדות, בתי חב&quot;ד — ב-50+ יעדים
            </p>
          </div>
        </Link>
      </div>

      {/* Articles */}
      <div className="max-w-[1100px] mx-auto px-7 pb-14">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[22px] font-[800] text-dark">מאמרים אחרונים</h2>
          <span className="text-[13px] text-muted font-medium">
            הכל
          </span>
        </div>

        <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {posts.map((p) => (
            <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
          ))}
        </div>
      </div>

      {/* Cruise banner */}
      <div className="max-w-[1100px] mx-auto px-7">
        <Link
          href="/cruises"
          className="block rounded-2xl overflow-hidden relative h-[160px] cursor-pointer transition-transform duration-200 hover:-translate-y-[2px] mb-14 no-underline"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a3c] to-teal" />
          <div className="absolute inset-0 flex items-center justify-between px-9 max-md:flex-col max-md:text-center max-md:justify-center max-md:gap-3">
            <div>
              <h3 className="text-[22px] font-[800] text-white mb-1">
                הפלגות ושייט מישראל
              </h3>
              <p className="text-sm text-white/70">
                קרוז מחיפה, שייט נהרות, הפלגות כשרות
              </p>
            </div>
            <span className="bg-white/15 border border-white/25 text-white py-2.5 px-6 rounded-[10px] text-[13px] font-semibold">
              לכל ההפלגות ←
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
