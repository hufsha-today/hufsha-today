import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FaqSection from "@/components/FaqSection";
import FilteredPostGrid from "@/components/FilteredPostGrid";

export const metadata: Metadata = {
  title: "הפלגות מישראל — קרוז, שייט נהרות ומסלולים | חופשה היום",
  description:
    "כל מה שצריך לדעת על הפלגות מישראל: מסלולים, מחירים, שייט נהרות, הפלגות כשרות וטיפים.",
  alternates: { canonical: "https://hufsha.today/cruises" },
};

const faqs = [
  {
    q: "מאיפה יוצאות הפלגות מישראל?",
    a: "רוב ההפלגות מישראל יוצאות מנמל חיפה, שנמצא במרכז העיר ונגיש בקלות מכל רחבי הארץ. המסלולים הפופולריים כוללים עצירות באיי יוון (מיקונוס, סנטוריני, רודוס), טורקיה (קושדאסי, איסטנבול), קפריסין (לימסול) ואיטליה (נאפולי, רומא). הפלגות טיפוסיות נמשכות 3-7 לילות, כאשר ההפלגות הקצרות מתאימות למי שרוצה לנסות בפעם הראשונה. בעונת השיא (יוני-אוגוסט) יוצאות הפלגות כמעט כל שבוע מנמל חיפה.",
  },
  {
    q: "כמה עולה הפלגה מישראל?",
    a: "מחירי הפלגות מנמל חיפה נעים בטווח רחב — החל מכ-$300-400 לאדם להפלגה קצרה של 3 לילות בקבינה פנימית, ועד $1,500-2,500 לאדם להפלגה של שבוע בקבינה עם מרפסת. המחירים משתנים לפי עונה, סוג הקבינה, משך ההפלגה וחברת השייט. מומלץ להזמין מוקדם — 3-4 חודשים מראש — כדי לקבל את המחירים הטובים ביותר. חשוב לזכור שהמחיר כולל לינה וארוחות על הספינה, אבל טיולי חוף, משקאות ושירותי ספא הם בתוספת תשלום. מחירים משוערים, נכון ל-2026.",
  },
  {
    q: "האם יש הפלגות כשרות מישראל?",
    a: "כן, ישנן הפלגות מנמל חיפה שמציעות אפשרויות כשרות, כולל מטבח כשר נפרד על הספינה. חלק מההפלגות מציעות כשרות למהדרין עם השגחה צמודה, בעיקר בתקופות החגים (פסח, סוכות). בהפלגות רגילות, חלק מחברות השייט מציעות תפריט כשר בהזמנה מראש — חשוב לציין את הדרישה כבר בשלב ההזמנה. מומלץ לבדוק מול חברת ההפלגות את סוג ההשגחה המדויק ואת היקף האפשרויות הכשרות לפני ההזמנה.",
  },
];

export default function CruisesPage() {
  const posts = getPostsByCategory("הפלגות");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "הפלגות מישראל — חופשה היום",
    description:
      "כל מה שצריך לדעת על הפלגות מישראל: מסלולים, מחירים וטיפים.",
    url: "https://hufsha.today/cruises",
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
      { "@type": "ListItem", position: 2, name: "הפלגות", item: "https://hufsha.today/cruises" },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "הפלגות" },
          ]}
        />

        <div className="rounded-2xl overflow-hidden relative h-[160px] mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a3c] to-teal" />
          <div className="absolute inset-0 flex items-center justify-between px-9 max-md:flex-col max-md:text-center max-md:justify-center max-md:gap-3">
            <div>
              <h1 className="text-[22px] font-[800] text-white mb-1">
                הפלגות ושייט מישראל
              </h1>
              <p className="text-sm text-white/70">
                {posts.length} מדריכים על הפלגות, קרוז ושייט
              </p>
            </div>
          </div>
        </div>

        <TldrBox text={`מתכננים הפלגה מישראל? אספנו עבורכם מדריכים מקיפים על כל סוגי ההפלגות מנמל חיפה — קרוזים לאיי יוון, הפלגות לטורקיה וקפריסין, שייט נהרות באירופה והפלגות כשרות. בכל מדריך תמצאו מסלולים מפורטים, טווחי מחירים עדכניים ל-2026, השוואה בין סוגי קבינות, וטיפים מעשיים להזמנה חכמה. בין אם זו ההפלגה הראשונה שלכם או שאתם מפליגים קבועים — כאן תמצאו את כל המידע שצריך.`} />

        <section className="mb-10">
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
