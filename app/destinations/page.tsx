import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllDestinations } from "@/lib/destinations";
import DestinationCard from "@/components/DestinationCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "כל היעדים | חופשה היום",
  description:
    "כל היעדים שלנו במקום אחד — יוון, בודפשט, איטליה, קפריסין, דובאי ועוד. מדריכי טיולים בעברית עם טיפים, תקציבים וכשרות.",
  alternates: { canonical: "https://hufsha.today/destinations" },
};

export default function DestinationsPage() {
  const posts = getAllPosts();
  const destinations = getAllDestinations();

  function getPostCount(destName: string, country?: string) {
    return posts.filter(
      (p) =>
        p.frontmatter.destination === destName ||
        p.frontmatter.country === destName ||
        (country && p.frontmatter.country === country)
    ).length;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "כל היעדים",
    description:
      "כל היעדים שלנו במקום אחד — מדריכי טיולים בעברית עם טיפים, תקציבים וכשרות.",
    url: "https://hufsha.today/destinations",
    isPartOf: {
      "@type": "WebSite",
      name: "חופשה היום",
      url: "https://hufsha.today",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-[1100px] mx-auto px-7 pt-8 max-md:px-5">
        <Breadcrumbs items={[{ label: "דף הבית", href: "/" }, { label: "יעדים" }]} />
      </div>

      <section className="max-w-[1100px] mx-auto px-7 pt-6 pb-10 max-md:px-5">
        <h1 className="text-[32px] font-[800] text-dark mb-4">כל היעדים</h1>
        <p className="text-text text-[17px] leading-[1.85] max-w-[700px] mb-10">
          כאן תמצאו את כל היעדים שאנחנו מכסים — עם מדריכים מפורטים, טיפים מעשיים,
          תקציבים ומידע על כשרות. בחרו יעד שמעניין אתכם והתחילו לתכנן את החופשה הבאה.
        </p>

        <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:[&>*]:h-[180px] [&>*]:h-[240px]">
          {destinations.map((d, i) => {
            const count = getPostCount(d.name, d.country);
            return (
              <DestinationCard
                key={d.slug}
                name={d.name}
                slug={d.slug}
                sub={`${d.flightTime} טיסה · ${count} מאמרים`}
                priority={i < 3}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
