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
    a: "בטיול מאורגן הכל מסודר מראש — טיסות, מלונות, הסעות ומדריך דובר עברית. בטיול עצמאי יש גמישות מלאה אבל צריך לתכנן הכל לבד.",
  },
  {
    q: "כמה עולה טיול מאורגן?",
    a: "מחירים משתנים לפי יעד, אורך הטיול ורמת המלון. מומלץ להשוות בין מספר חברות טיולים ולבדוק מה כלול בחבילה. מחירים משוערים, נכון ל-2026.",
  },
  {
    q: "האם טיול מאורגן מתאים למשפחות?",
    a: "כן, חלק מהטיולים המאורגנים מותאמים למשפחות עם ילדים. כדאי לבדוק עם חברת הטיולים אם המסלול מתאים לגילאי הילדים שלכם.",
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

        <TldrBox text="מחפשים טיול מאורגן? אספנו מדריכים מקיפים ליעדים פופולריים — מחירים, מסלולים, טיפים ומה כלול בחבילה. מומלץ להשוות בין מספר חברות לפני ההזמנה." />

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
