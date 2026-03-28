import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FallbackImage from "@/components/FallbackImage";
import { getAllPosts, getPostBySlug, getRelatedPosts, getPostsByDestination } from "@/lib/posts";
import { getAllDestinations, getDestinationBySlug } from "@/lib/destinations";
import { getAllCities, getCityBySlug, getCitiesByCountry } from "@/lib/cities";
import { getDestinationGradient } from "@/lib/gradients";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FactBox from "@/components/FactBox";
import FaqSection from "@/components/FaqSection";
import CtaBox from "@/components/CtaBox";
import PostCard from "@/components/PostCard";
import FilteredPostGrid from "@/components/FilteredPostGrid";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const postParams = getAllPosts().map((p) => ({ slug: p.frontmatter.slug }));
  const destParams = getAllDestinations().map((d) => ({ slug: d.slug }));
  const cityParams = getAllCities().map((c) => ({ slug: c.slug }));
  return [...postParams, ...destParams, ...cityParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Check destination first
  const dest = getDestinationBySlug(slug);
  if (dest) {
    return {
      title: `${dest.name} — המדריך המלא לחופשה ב${dest.name} 2026`,
      description: `מתכננים חופשה ב${dest.name}? המדריך המלא: יעדים, מחירים, עונות, טיפים וכל מה שצריך לדעת.`,
      openGraph: {
        title: `${dest.name} — המדריך המלא 2026`,
        description: dest.description,
        locale: "he_IL",
        siteName: "חופשה היום",
        images: [{
          url: `https://hufsha.today/images/destinations/${slug}.png`,
          width: 1200,
          height: 630,
          alt: `חופשה ב${dest.name}`,
        }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${dest.name} — המדריך המלא 2026`,
        images: [`https://hufsha.today/images/destinations/${slug}.png`],
      },
      alternates: { canonical: `https://hufsha.today/${slug}` },
    };
  }

  // Check city
  const city = getCityBySlug(slug);
  if (city) {
    return {
      title: `${city.name} — המדריך המלא 2026`,
      description: `מתכננים טיול ל${city.name}? המדריך המלא: אטרקציות, מחירים, טיפים וכל מה שצריך לדעת.`,
      openGraph: {
        title: `${city.name} — המדריך המלא 2026`,
        description: city.description,
        locale: "he_IL",
        siteName: "חופשה היום",
        images: [{
          url: `https://hufsha.today/images/destinations/${city.countrySlug}.png`,
          width: 1200,
          height: 630,
          alt: city.name,
        }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${city.name} — המדריך המלא 2026`,
        images: [`https://hufsha.today/images/destinations/${city.countrySlug}.png`],
      },
      alternates: { canonical: `https://hufsha.today/${slug}` },
    };
  }

  // Check post
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.frontmatter;
  return {
    title: fm.title,
    description: fm.excerpt,
    keywords: fm.keywords,
    openGraph: {
      title: fm.title,
      description: fm.excerpt,
      type: "article",
      locale: "he_IL",
      siteName: "חופשה היום",
      publishedTime: fm.date,
      images: [{
        url: `https://hufsha.today/images/posts/${slug}.png`,
        width: 1200,
        height: 630,
        alt: fm.title,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.excerpt,
      images: [`https://hufsha.today/images/posts/${slug}.png`],
    },
    alternates: { canonical: `https://hufsha.today/${slug}` },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  // Check destination first
  const dest = getDestinationBySlug(slug);
  if (dest) return <CountryPage slug={slug} />;

  // Check city
  const city = getCityBySlug(slug);
  if (city) return <CityPage slug={slug} />;

  // Check post
  const post = getPostBySlug(slug);
  if (post) return <BlogPostPage slug={slug} />;

  notFound();
}

/* ─── Blog Post Page ─── */
function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug)!;
  const fm = post.frontmatter;
  const related = getRelatedPosts(post, 3);
  const gradient = getDestinationGradient(fm.destination);
  const readingTime = Math.max(1, Math.round(post.content.split(/\s+/).length / 200));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.excerpt,
    datePublished: fm.date,
    dateModified: fm.date,
    image: `https://hufsha.today/images/posts/${slug}.png`,
    author: { "@type": "Organization", name: "חופשה היום", url: "https://hufsha.today" },
    publisher: {
      "@type": "Organization",
      name: "חופשה היום",
      url: "https://hufsha.today",
      logo: {
        "@type": "ImageObject",
        url: "https://hufsha.today/images/mascot-logo-transparent.png",
      },
    },
    mainEntityOfPage: `https://hufsha.today/${slug}`,
    inLanguage: "he",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fm.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const categorySlugMap: Record<string, string> = {
    "עם ילדים": "with-kids",
    "כשר": "kosher",
    "הפלגות": "cruises",
    "טיולים מאורגנים": "organized-tours",
  };
  const categoryUrl = categorySlugMap[fm.category]
    ? `https://hufsha.today/${categorySlugMap[fm.category]}`
    : undefined;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "דף הבית", item: "https://hufsha.today" },
      { "@type": "ListItem", position: 2, name: fm.category, ...(categoryUrl && { item: categoryUrl }) },
      { "@type": "ListItem", position: 3, name: fm.title, item: `https://hufsha.today/${slug}` },
    ],
  };

  return (
    <>
      <article className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            { label: fm.category },
            { label: fm.title },
          ]}
        />

        <span className="inline-block text-xs font-bold text-teal bg-teal-light px-3 py-1 rounded-full mb-4">
          {fm.category}
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-dark leading-tight mb-4">
          {fm.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-muted mb-8">
          <span>
            {new Date(fm.date).toLocaleDateString("he-IL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>·</span>
          <span>{readingTime} דק׳ קריאה</span>
          <span>·</span>
          <span>{fm.author || "חופשה היום"}</span>
        </div>

        <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden mb-10 bg-border">
          <FallbackImage
            src={`/images/posts/${slug}.png`}
            alt={fm.title}
            fill
            className="object-cover"
            sizes="740px"
            priority
            fallbackGradient={gradient}
          />
        </div>

        <TldrBox text={fm.tldr} />
        <FactBox facts={fm.factBox} />

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        <CtaBox />
        <FaqSection faqs={fm.faq} />

        <div className="flex items-center gap-4 py-6 border-t border-border mt-10">
          <Image
            src="/images/mascot-logo-transparent.png"
            alt="חופשה היום"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-bold text-dark text-sm">{fm.author || "צוות חופשה היום"}</p>
            <p className="text-muted text-xs">
              מביאים לכם את המידע הכי עדכני על יעדים, טיסות ודילים.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-dark mb-4">כתבות נוספות</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <PostCard key={r.frontmatter.slug} post={r.frontmatter} />
              ))}
            </div>
          </section>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

/* ─── Country Page ─── */
function CountryPage({ slug }: { slug: string }) {
  const dest = getDestinationBySlug(slug)!;
  const posts = getAllPosts().filter(
    (p) =>
      p.frontmatter.destination === dest.name ||
      p.frontmatter.country === dest.name ||
      p.frontmatter.country === dest.country
  );
  const cities = getCitiesByCountry(slug);
  const gradient = getDestinationGradient(dest.name);
  const allDests = getAllDestinations();
  const similar = dest.similarDestinations
    .map((s) => allDests.find((d) => d.slug === s))
    .filter(Boolean);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: dest.name,
    description: dest.description,
    url: `https://hufsha.today/${slug}`,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${dest.name} — המדריך המלא 2026`,
    description: dest.description,
    datePublished: "2026-03-27",
    dateModified: "2026-03-27",
    image: `https://hufsha.today/images/destinations/${slug}.png`,
    author: { "@type": "Organization", name: "חופשה היום", url: "https://hufsha.today" },
    publisher: {
      "@type": "Organization",
      name: "חופשה היום",
      url: "https://hufsha.today",
      logo: {
        "@type": "ImageObject",
        url: "https://hufsha.today/images/mascot-logo-transparent.png",
      },
    },
    mainEntityOfPage: `https://hufsha.today/${slug}`,
    inLanguage: "he",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dest.faq.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: dest.name,
        item: `https://hufsha.today/${slug}`,
      },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
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
            <img
              src={`https://flagcdn.com/24x18/${dest.flag}.png`}
              alt=""
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginLeft: 4,
              }}
              className="mb-2"
            />
            <h1 className="text-3xl sm:text-4xl font-black">{dest.name}</h1>
            <p className="text-white/80 text-sm mt-1">
              {dest.country} · {dest.flightTime} טיסה
            </p>
          </div>
        </div>

        {/* TL;DR */}
        <TldrBox text={dest.tldr} />

        {/* Fact Box */}
        <FactBox
          facts={{
            flightTime: dest.flightTime,
            currency: dest.currency,
            language: dest.language,
            bestSeason: dest.bestSeason,
            dailyBudget: dest.dailyBudget,
            temperature: dest.temperature,
          }}
        />

        {/* Article Content */}
        <div className="article-content mb-10">
          {dest.articleSections.map((section, i) => (
            <div key={i}>
              <h2>{section.title}</h2>
              {section.content.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Cities / Sub-destinations */}
        {(cities.length > 0 || dest.subDestinations.length > 0) && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4">
              ערים ויעדים ב{dest.name}{" "}
              <span className="text-muted font-normal text-base">
                ({cities.length || dest.subDestinations.length})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.length > 0
                ? cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}`}
                      className="bg-white border border-border rounded-2xl p-4 text-center hover:-translate-y-[2px] hover:shadow-md transition-all no-underline"
                    >
                      <div className="font-bold text-dark text-base">
                        {city.name}
                      </div>
                      <div className="text-muted text-xs mt-1">
                        {city.flightTime} טיסה
                      </div>
                    </Link>
                  ))
                : dest.subDestinations.map((sub) => (
                    <span
                      key={sub.slug}
                      className="bg-teal-light text-teal text-sm font-medium px-4 py-3 rounded-2xl text-center"
                    >
                      {sub.name}
                    </span>
                  ))}
            </div>
          </section>
        )}

        {/* Posts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-dark mb-4">
            מאמרים על {dest.name}{" "}
            {posts.length > 0 && (
              <span className="text-muted font-normal text-base">
                ({posts.length})
              </span>
            )}
          </h2>
          <FilteredPostGrid
            posts={posts.map((p) => p.frontmatter)}
            filterKey="category"
          />
        </section>

        {/* FAQ */}
        {dest.faq.length > 0 && <FaqSection faqs={dest.faq} />}

        {/* Similar Destinations */}
        {similar.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-dark mb-4">
              אם אהבתם {dest.name}, נסו גם:
            </h2>
            <div className="flex flex-wrap gap-3">
              {similar.map((d) =>
                d ? (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="bg-white border border-border rounded-xl px-5 py-3 text-sm font-medium text-dark hover:border-orange hover:text-orange transition-colors no-underline"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/24x18/${d.flag}.png`}
                      alt=""
                      style={{
                        display: "inline",
                        verticalAlign: "middle",
                        marginLeft: 4,
                      }}
                    />{" "}
                    {d.name}
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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

/* ─── City Page ─── */
function CityPage({ slug }: { slug: string }) {
  const city = getCityBySlug(slug)!;
  const dest = getDestinationBySlug(city.countrySlug);
  const posts = getPostsByDestination(city.name);
  const siblingsRaw = getCitiesByCountry(city.countrySlug);
  const siblings = siblingsRaw.filter((c) => c.slug !== slug);
  const gradient = getDestinationGradient(city.countryName);

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.name,
    description: city.description,
    url: `https://hufsha.today/${slug}`,
    containedInPlace: dest
      ? {
          "@type": "Place",
          name: dest.name,
          url: `https://hufsha.today/${dest.slug}`,
        }
      : undefined,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${city.name} — המדריך המלא 2026`,
    description: city.description,
    datePublished: "2026-03-27",
    dateModified: "2026-03-27",
    image: `https://hufsha.today/images/destinations/${city.countrySlug}.png`,
    author: { "@type": "Organization", name: "חופשה היום", url: "https://hufsha.today" },
    publisher: {
      "@type": "Organization",
      name: "חופשה היום",
      url: "https://hufsha.today",
      logo: {
        "@type": "ImageObject",
        url: "https://hufsha.today/images/mascot-logo-transparent.png",
      },
    },
    mainEntityOfPage: `https://hufsha.today/${slug}`,
    inLanguage: "he",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((f) => ({
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
      {
        "@type": "ListItem",
        position: 2,
        name: city.countryName,
        item: `https://hufsha.today/${city.countrySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `https://hufsha.today/${slug}`,
      },
    ],
  };

  return (
    <>
      <div className="max-w-[740px] mx-auto px-5 py-8">
        <Breadcrumbs
          items={[
            { label: "דף הבית", href: "/" },
            {
              label: city.countryName,
              href: `/${city.countrySlug}`,
            },
            { label: city.name },
          ]}
        />

        {/* Hero */}
        <div className="relative w-full h-[250px] sm:h-[350px] rounded-xl overflow-hidden mb-8 bg-border">
          <div
            className="absolute inset-0"
            style={{ background: gradient }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 right-6 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/24x18/${city.flag}.png`}
              alt=""
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginLeft: 4,
              }}
              className="mb-2"
            />
            <h1 className="text-3xl sm:text-4xl font-black">{city.name}</h1>
            <p className="text-white/80 text-sm mt-1">
              {city.countryName} · {city.flightTime} טיסה
            </p>
          </div>
        </div>

        {/* TL;DR */}
        <TldrBox text={city.tldr} />

        {/* Fact Box */}
        <FactBox
          facts={{
            flightTime: city.flightTime,
            currency: city.currency,
            language: city.language,
            bestSeason: city.bestSeason,
            dailyBudget: city.dailyBudget,
            temperature: city.temperature,
          }}
        />

        {/* Article Content */}
        <div className="article-content mb-10">
          {city.articleSections.map((section, i) => (
            <div key={i}>
              <h2>{section.title}</h2>
              {section.content.split("\n\n").map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Posts */}
        {posts.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-dark mb-4">
              מאמרים על {city.name}
            </h2>
            <FilteredPostGrid
              posts={posts.map((p) => p.frontmatter)}
              filterKey="category"
            />
          </section>
        )}

        {posts.length === 0 && (
          <div className="bg-teal-light rounded-xl p-6 mb-10 text-center">
            <p className="text-teal font-medium">
              בקרוב! אנחנו עובדים על מדריכים ל{city.name}
            </p>
          </div>
        )}

        {/* FAQ */}
        {city.faq.length > 0 && <FaqSection faqs={city.faq} />}

        {/* Other cities in same country */}
        {siblings.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold text-dark mb-4">
              עוד יעדים ב{city.countryName}
            </h2>
            <div className="flex flex-wrap gap-3">
              {siblings.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="bg-white border border-border rounded-xl px-5 py-3 text-sm font-medium text-dark hover:border-orange hover:text-orange transition-colors no-underline"
                >
                  {c.name}
                </Link>
              ))}
              {dest && (
                <Link
                  href={`/${dest.slug}`}
                  className="bg-teal-light border border-teal/20 rounded-xl px-5 py-3 text-sm font-medium text-teal hover:bg-teal hover:text-white transition-colors no-underline"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/24x18/${dest.flag}.png`}
                    alt=""
                    style={{
                      display: "inline",
                      verticalAlign: "middle",
                      marginLeft: 4,
                    }}
                  />{" "}
                  כל {dest.name} ←
                </Link>
              )}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
