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
    a: "יעדים פופולריים לחופשה כשרה כוללים קפריסין, יוון ואיטליה — שם תמצאו מלונות ומסעדות עם אפשרויות כשרות, בתי חב\"ד ופתרונות הולמים לשומרי כשרות.",
  },
  {
    q: "איך מוצאים מלון כשר בחו\"ל?",
    a: "מומלץ לחפש באתרי הזמנות עם סינון כשרות, לבדוק מול בתי חב\"ד מקומיים, וליצור קשר ישירות עם המלון. תמיד כדאי לוודא את סוג ההשגחה לפני ההזמנה.",
  },
  {
    q: "האם בתי חב\"ד מספקים ארוחות כשרות?",
    a: "רוב בתי חב\"ד מארגנים ארוחות שבת ולעיתים גם ארוחות במהלך השבוע. מומלץ ליצור קשר מראש. לרשימה מעודכנת: chabad.org.",
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

        <TldrBox text={`מחפשים חופשה כשרה בחו"ל? אספנו עבורכם מדריכים מקיפים ליעדים עם אפשרויות כשרות — מלונות, מסעדות, בתי חב"ד ופתרונות לשומרי כשרות. מומלץ תמיד לוודא השגחה ולתאם מראש.`} />

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
