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
    a: "יוון, קפריסין ובודפשט נחשבים ליעדים מצוינים למשפחות. הם מציעים חופים רדודים, אטרקציות ידידותיות לילדים, ומחירים נוחים.",
  },
  {
    q: "מאיזה גיל מומלץ לטוס עם ילדים לחו\"ל?",
    a: "אין גיל מינימלי, אבל רוב המשפחות מתחילות לטוס עם ילדים מגיל שנתיים. בגיל 4-5 ומעלה הילדים כבר נהנים יותר מהאטרקציות.",
  },
  {
    q: "איך לתכנן חופשה עם ילדים קטנים?",
    a: "כדאי לבחור יעד עם טיסה קצרה, לתכנן אטרקציה אחת ליום, להשאיר זמן חופשי, ולבחור מלון עם בריכה. קצב איטי = חופשה מוצלחת.",
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

        <TldrBox text="מחפשים יעד לחופשה משפחתית? אספנו עבורכם את המדריכים הכי מקיפים ליעדים שמתאימים לילדים — אטרקציות, טיפים מעשיים, תקציבים ומסלולים מומלצים." />

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
