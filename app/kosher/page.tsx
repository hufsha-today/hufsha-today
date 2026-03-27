import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FaqSection from "@/components/FaqSection";
import FilteredPostGrid from "@/components/FilteredPostGrid";

export const metadata: Metadata = {
  title: "כשר בחו\"ל — מלונות כשרים, מסעדות ובתי חב\"ד | חופשה היום",
  description:
    "המדריך המלא לחופשה כשרה בחו\"ל: מלונות כשרים, מסעדות, בתי חב\"ד. יעדים פופולריים, טיפים ומידע עדכני.",
  alternates: { canonical: "https://hufsha.today/kosher" },
};

const faqs = [
  {
    q: "באילו יעדים יש הכי הרבה אפשרויות כשרות?",
    a: "היעדים עם הכי הרבה אפשרויות כשרות לישראלים הם קפריסין, יוון ואיטליה. בקפריסין, במיוחד באזור פאפוס ולרנקה, תמצאו מלונות שמציעים אופציות כשרות כולל ארוחות בוקר וערב. ביוון, בעיקר באתונה וברודוס, פועלים בתי חב\"ד שמספקים ארוחות שבת ומידע על אפשרויות כשרות באזור. באיטליה, ערים כמו רומא ומילאנו מציעות מסעדות כשרות קבועות לאורך כל השנה. גם בבודפשט ובפראג יש קהילות יהודיות פעילות עם אפשרויות כשרות. מומלץ תמיד לבדוק מראש מול בית חב\"ד המקומי לפני הנסיעה.",
  },
  {
    q: "איך מוצאים מלון כשר בחו\"ל?",
    a: "הדרך הכי יעילה היא לחפש באתרי הזמנות שמאפשרים סינון לפי כשרות, ולבדוק מול בתי חב\"ד מקומיים שמכירים את האפשרויות באזור. כדאי גם ליצור קשר ישירות עם המלון ולשאול בדיוק מה כלול — האם יש מטבח כשר נפרד, מה סוג ההשגחה, והאם יש ארוחות שבת. חשוב לוודא שההשגחה מוכרת ומתאימה לרמת הכשרות שלכם, כי יש הבדל בין מהדרין לכשרות רגילה. מומלץ גם לקרוא ביקורות של ישראלים שכבר ביקרו במקום — לעיתים המציאות שונה מהפרסום.",
  },
  {
    q: "האם בתי חב\"ד מספקים ארוחות כשרות?",
    a: "כן, רוב בתי חב\"ד ברחבי העולם מארגנים ארוחות שבת פתוחות לכל יהודי — ארוחת ליל שבת וסעודת שבת בצהריים. חלק מבתי חב\"ד מציעים גם ארוחות במהלך השבוע, במיוחד באזורים תיירותיים פופולריים. בנוסף, השלוחים יכולים להפנות אתכם למסעדות כשרות, חנויות מכולת עם מוצרים כשרים, ולעיתים אפילו לארגן קייטרינג כשר להזמנה. מומלץ ליצור קשר עם בית חב\"ד המקומי לפחות שבוע לפני ההגעה כדי לוודא זמינות. לרשימה מעודכנת של כל בתי חב\"ד בעולם: chabad.org.",
  },
];

export default function KosherPage() {
  const posts = getPostsByCategory("כשר");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "כשר בחו\"ל — חופשה היום",
    description:
      "המדריך המלא לחופשה כשרה בחו\"ל: מלונות כשרים, מסעדות ובתי חב\"ד.",
    url: "https://hufsha.today/kosher",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "דף הבית",
        item: "https://hufsha.today",
      },
      { "@type": "ListItem", position: 2, name: "כשר בחו\"ל" },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "כשר בחו\"ל" },
          ]}
        />

        <div className="flex items-center gap-5 bg-kosher-bg border border-kosher-border rounded-2xl py-6 px-7 mb-8">
          <div className="w-[52px] h-[52px] bg-orange rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://flagcdn.com/24x18/il.png"
              alt="דגל ישראל"
              style={{ display: "inline" }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-dark mb-1">
              כשר בחו&quot;ל
            </h1>
            <p className="text-sm text-muted">
              {posts.length} מדריכים לחופשה כשרה בחו&quot;ל
            </p>
          </div>
        </div>

        <TldrBox text={`מחפשים חופשה כשרה בחו"ל? אספנו עבורכם מדריכים מקיפים ליעדים הפופולריים ביותר בקרב ישראלים שומרי כשרות — קפריסין, יוון, איטליה ועוד. בכל מדריך תמצאו מידע על מלונות עם אופציות כשרות, מסעדות כשרות באזור, בתי חב"ד מקומיים ופתרונות מעשיים לכל רמות הכשרות. מומלץ תמיד לוודא את סוג ההשגחה ולתאם מראש עם המלון ועם בית חב"ד המקומי.`} />

        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-4">
            מאמרים על כשרות בחו&quot;ל
          </h2>
          <FilteredPostGrid
            posts={posts.map((p) => p.frontmatter)}
            filterKey="destination"
          />
        </section>

        <FaqSection faqs={faqs} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
