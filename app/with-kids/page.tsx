import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FaqSection from "@/components/FaqSection";
import FilteredPostGrid from "@/components/FilteredPostGrid";

export const metadata: Metadata = {
  title: "חופשה עם ילדים — מדריכים ויעדים למשפחות | חופשה היום",
  description:
    "המדריכים הכי מקיפים לחופשה עם ילדים: יעדים מומלצים, אטרקציות, טיפים ודילים למשפחות.",
  alternates: { canonical: "https://hufsha.today/with-kids" },
};

const faqs = [
  {
    q: "מה היעד הכי טוב בחו\"ל עם ילדים?",
    a: "יוון, קפריסין ובודפשט נחשבים ליעדים המובילים למשפחות ישראליות. יוון מציעה איים עם חופים רדודים ובטוחים לילדים, אוכל מצוין ומחירים נוחים — רודוס וכרתים מתאימות במיוחד למשפחות. קפריסין נמצאת במרחק טיסה של שעה בלבד, עם מלונות משפחתיים, פארקי מים ואטרקציות לכל הגילאים. בודפשט היא אופציה מצוינת למשפחות שמעדיפות עיר — מרחצאות תרמיים עם בריכות לילדים, פארק שעשועים, שייט בדנובה ומוזיאונים אינטראקטיביים, והכל במחירים נוחים משמעותית ממערב אירופה.",
  },
  {
    q: "מאיזה גיל מומלץ לטוס עם ילדים לחו\"ל?",
    a: "אין גיל מינימלי רשמי לטיסה עם ילדים, ורוב חברות התעופה מאפשרות טיסה מגיל שבועיים. עם זאת, רוב המשפחות מתחילות לטוס ליעדים קרובים כמו קפריסין ויוון מגיל שנה-שנתיים. בגיל 4-5 ומעלה הילדים כבר נהנים יותר מאטרקציות, מוזיאונים ופעילויות, וזוכרים את החוויה. לילדים צעירים מאוד, מומלץ לבחור יעד עם טיסה קצרה (עד שעתיים), מלון עם בריכה, ולא לתכנן יותר מאטרקציה אחת ביום.",
  },
  {
    q: "איך לתכנן חופשה עם ילדים קטנים?",
    a: "הכלל החשוב ביותר: קצב איטי = חופשה מוצלחת. בחרו יעד עם טיסה קצרה (עד 3 שעות), תכננו אטרקציה אחת בבוקר והשאירו את אחר הצהריים לבריכה או לחוף. בחרו מלון עם בריכה — ילדים יכולים לבלות שם שעות. הכינו חטיפים לטיסה ולטיולים, קחו עגלה קלה ומתקפלת, ותמיד השאירו יום אחד בלי תוכניות בכלל. שווה גם לבדוק מראש אילו מסעדות מתאימות לילדים ולהזמין מלון קרוב לאטרקציות המרכזיות כדי לחסוך נסיעות ארוכות.",
  },
];

export default function WithKidsPage() {
  const posts = getPostsByCategory("עם ילדים");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "חופשה עם ילדים — חופשה היום",
    description:
      "מדריכים ויעדים מומלצים לחופשה עם ילדים — אטרקציות, טיפים ודילים למשפחות.",
    url: "https://hufsha.today/with-kids",
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
      { "@type": "ListItem", position: 2, name: "עם ילדים" },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "עם ילדים" },
          ]}
        />

        <h1 className="text-3xl font-black text-dark mb-2">
          חופשה עם ילדים
        </h1>
        <p className="text-muted mb-6">
          {posts.length} מדריכים ליעדים מושלמים למשפחות
        </p>

        <TldrBox text={`מחפשים יעד לחופשה משפחתית? אספנו עבורכם מדריכים מקיפים ליעדים הכי מתאימים למשפחות עם ילדים — יוון, קפריסין, בודפשט ועוד. בכל מדריך תמצאו אטרקציות מותאמות לגילאים, טיפים מעשיים להורים, טווחי מחירים עדכניים ל-2026, ומסלולים יומיים מומלצים. בין אם אתם מטיילים עם תינוק, פעוט או ילדים בגיל בית ספר — יש לנו מדריך שמתאים בדיוק לכם.`} />

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
