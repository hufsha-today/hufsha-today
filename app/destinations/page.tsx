import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllCountries } from "@/lib/countries";
import Breadcrumbs from "@/components/Breadcrumbs";
import DestinationsFilter from "@/components/DestinationsFilter";

export const metadata: Metadata = {
  title: "כל היעדים | חופשה היום",
  description:
    "כל היעדים שלנו במקום אחד — יוון, הונגריה, איטליה, קפריסין, דובאי ועוד. מדריכי טיולים בעברית עם טיפים, תקציבים וכשרות.",
  alternates: { canonical: "https://hufsha.today/destinations" },
};

export default function DestinationsPage() {
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

  // Sort destinations by article count (most articles first)
  const sorted = [...destinations]
    .map((d) => ({
      slug: d.slug,
      name: d.name,
      flightTime: d.flightTime,
      regionSlug: d.regionSlug,
      count: getPostCount(d.name, d.country),
    }))
    .sort((a, b) => b.count - a.count);

  // Extract unique regions preserving order
  const regionMap = new Map<string, string>();
  for (const d of destinations) {
    if (d.regionSlug && d.region && !regionMap.has(d.regionSlug)) {
      regionMap.set(d.regionSlug, d.region);
    }
  }
  const regions = Array.from(regionMap, ([slug, label]) => ({ slug, label }));

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

        <DestinationsFilter destinations={sorted} regions={regions} />
      </section>
    </>
  );
}
