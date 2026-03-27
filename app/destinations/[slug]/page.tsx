import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDestinations, getDestinationBySlug } from "@/lib/destinations";
import { getPostsByDestination } from "@/lib/posts";
import { getDestinationGradient } from "@/lib/gradients";
import FallbackImage from "@/components/FallbackImage";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import PostCard from "@/components/PostCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return {
    title: `${dest.name} — מדריך טיולים`,
    description: dest.description,
    openGraph: {
      title: `${dest.name} — מדריך טיולים | חופשה היום`,
      description: dest.description,
      locale: "he_IL",
      siteName: "חופשה היום",
    },
    alternates: { canonical: `https://hufsha.today/destinations/${slug}` },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const posts = getPostsByDestination(dest.name);
  const gradient = getDestinationGradient(dest.name);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: dest.name,
    description: dest.description,
    url: `https://hufsha.today/destinations/${slug}`,
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: "יעדים" },
            { label: dest.name },
          ]}
        />

        {/* Hero */}
        <div className="relative w-full h-[250px] sm:h-[350px] rounded-xl overflow-hidden mb-8 bg-border">
          <FallbackImage
            src={`/images/destinations/${slug}.png`}
            alt={dest.name}
            fill
            className="object-cover"
            sizes="740px"
            priority
            fallbackGradient={gradient}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 right-6 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://flagcdn.com/24x18/${dest.flag}.png`} alt="" style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} className="mb-2" />
            <h1 className="text-3xl sm:text-4xl font-black">{dest.name}</h1>
            <p className="text-white/80 text-sm mt-1">{dest.country} · {dest.flightTime} טיסה</p>
          </div>
        </div>

        <p className="text-text text-[17px] leading-relaxed mb-8">{dest.description}</p>

        {/* Quick facts */}
        <div className="bg-white border border-border rounded-xl overflow-hidden mb-10">
          {[
            { label: "זמן טיסה", value: dest.flightTime },
            { label: "מטבע", value: dest.currency },
            { label: "שפה", value: dest.language },
            { label: "עונה מומלצת", value: dest.bestSeason },
          ].map((fact, i) => (
            <div
              key={fact.label}
              className={`flex justify-between px-5 py-3 text-sm ${
                i % 2 === 0 ? "bg-white" : "bg-bg"
              } ${i < 3 ? "border-b border-border" : ""}`}
            >
              <span className="font-bold text-dark">{fact.label}</span>
              <span className="text-text">{fact.value}</span>
            </div>
          ))}
        </div>

        {/* Sub-destinations */}
        {dest.subDestinations.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4">יעדים ב{dest.name}</h2>
            <div className="flex flex-wrap gap-2">
              {dest.subDestinations.map((sub) => (
                <span
                  key={sub.slug}
                  className="bg-teal-light text-teal text-sm font-medium px-4 py-2 rounded-full"
                >
                  {sub.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Posts */}
        {posts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4">מאמרים על {dest.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {posts.map((p) => (
                <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {dest.faq.length > 0 && <FaqSection faqs={dest.faq} />}

        {/* Other destinations */}
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-dark mb-4">יעדים נוספים</h2>
          <div className="flex flex-wrap gap-3">
            {getAllDestinations()
              .filter((d) => d.slug !== slug)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/destinations/${d.slug}`}
                  className="bg-white border border-border rounded-xl px-5 py-3 text-sm font-medium text-dark hover:border-orange hover:text-orange transition-colors no-underline"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://flagcdn.com/24x18/${d.flag}.png`} alt="" style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} /> {d.name}
                </Link>
              ))}
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
    </>
  );
}
