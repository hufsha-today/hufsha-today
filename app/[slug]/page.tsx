import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import FallbackImage from "@/components/FallbackImage";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { getDestinationGradient } from "@/lib/gradients";
import Breadcrumbs from "@/components/Breadcrumbs";
import TldrBox from "@/components/TldrBox";
import FactBox from "@/components/FactBox";
import FaqSection from "@/components/FaqSection";
import CtaBox from "@/components/CtaBox";
import PostCard from "@/components/PostCard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    },
    twitter: { card: "summary_large_image", title: fm.title, description: fm.excerpt },
    alternates: { canonical: `https://hufsha.today/${slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

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
    author: { "@type": "Person", name: fm.author || "חופשה היום" },
    publisher: { "@type": "Organization", name: "חופשה היום", url: "https://hufsha.today" },
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "דף הבית", item: "https://hufsha.today" },
      { "@type": "ListItem", position: 2, name: fm.category },
      { "@type": "ListItem", position: 3, name: fm.title },
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
