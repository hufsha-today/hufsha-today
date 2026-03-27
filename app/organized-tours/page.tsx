import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FaqSection from "@/components/FaqSection";
import FilteredPostGrid from "@/components/FilteredPostGrid";

export const metadata: Metadata = {
  title: "טיולים מאורגנים — מסלולים, מחירים וטיפים | חופשה היום",
  description:
    "כל מה שצריך לדעת על טיולים מאורגנים מישראל: מסלולים, מחירים, טיפים ומדריכים ליעדים פופולריים.",
  alternates: { canonical: "https://hufsha.today/organized-tours" },
};

const faqs = [
  {
    q: "מה ההבדל בין טיול מאורגן לטיול עצמאי?",
    a: "בטיול מאורגן הכל מסודר מראש — טיסות, מלונות, הסעות, ארוחות ומדריך דובר עברית שמלווה את הקבוצה. זה חוסך זמן תכנון רב ומתאים למי שרוצה לראות הרבה בזמן קצר בלי להתעסק בלוגיסטיקה. בטיול עצמאי יש גמישות מלאה — אתם קובעים את הקצב, המסלול וההוצאות, אבל צריך לתכנן הכל לבד. טיול מאורגן בדרך כלל יקר יותר מטיול עצמאי, אבל כולל הכל במחיר אחד ומפחית את הסיכון להפתעות.",
  },
  {
    q: "כמה עולה טיול מאורגן?",
    a: "מחירי טיולים מאורגנים מישראל נעים בטווח רחב, בהתאם ליעד, אורך הטיול ורמת המלונות. טיול של 5-7 ימים ליעדים קרובים כמו יוון או טורקיה עולה בדרך כלל $800-1,200 לאדם, בעוד טיול של שבוע-10 ימים ליעדים כמו מונטנגרו, איטליה או מרוקו יכול לנוע בין $1,100-1,700 לאדם. המחיר בדרך כלל כולל טיסות, מלונות, הסעות, חלק מהארוחות ומדריך. מומלץ להשוות בין מספר חברות טיולים ולבדוק בדיוק מה כלול ומה לא. מחירים משוערים, נכון ל-2026.",
  },
  {
    q: "האם טיול מאורגן מתאים למשפחות?",
    a: "כן, הרבה חברות טיולים מציעות מסלולים שמותאמים למשפחות עם ילדים, עם קצב נוח יותר ואטרקציות שמתאימות לכל הגילאים. חשוב לבדוק מראש אם המסלול כולל ימי הליכה ארוכים שעלולים להיות מאתגרים לילדים קטנים. חלק מהטיולים מציעים הנחה לילדים או אפילו מחיר מיוחד לילד שלישי. כדאי גם לשאול אם יש אפשרות לחדר משפחתי במלונות ואם הארוחות מתאימות לילדים. ליעדים כמו יוון, קפריסין ומונטנגרו יש מסלולים מאורגנים שמשלבים חופש וטיולים — מה שעובד מצוין למשפחות.",
  },
];

export default function OrganizedToursPage() {
  const posts = getPostsByCategory("טיולים מאורגנים");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "טיולים מאורגנים — חופשה היום",
    description:
      "מדריכים וטיפים לטיולים מאורגנים מישראל: מסלולים, מחירים ויעדים.",
    url: "https://hufsha.today/organized-tours",
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
      { "@type": "ListItem", position: 2, name: "טיולים מאורגנים" },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "טיולים מאורגנים" },
          ]}
        />

        <h1 className="text-3xl font-black text-dark mb-2">טיולים מאורגנים</h1>
        <p className="text-muted mb-6">
          {posts.length} מדריכים לטיולים מאורגנים מישראל
        </p>

        <TldrBox text={`מחפשים טיול מאורגן מישראל? אספנו עבורכם מדריכים מקיפים ליעדים הפופולריים ביותר — מונטנגרו, יוון, איטליה, טורקיה ועוד. בכל מדריך תמצאו מסלולים יומיים מפורטים, טווחי מחירים עדכניים ל-2026, מה כלול ומה לא כלול בחבילה, וטיפים לבחירת החברה הנכונה. מומלץ להשוות בין מספר חברות טיולים לפני ההזמנה ולבדוק ביקורות של מטיילים שכבר היו.`} />

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
