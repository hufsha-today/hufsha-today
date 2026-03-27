import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "הפלגות מישראל — קרוז מחיפה, שייט נהרות",
  description: "כל ההפלגות מישראל: MSC, Royal Caribbean, שייט נהרות, הפלגות כשרות. מחירים, מסלולים וטיפים.",
  alternates: { canonical: "https://hufsha.today/cruises" },
};

export default function CruisesPage() {
  const posts = getPostsByCategory("הפלגות");

  return (
    <div className="max-w-[740px] mx-auto px-5 py-8">
      <Breadcrumbs
        items={[
          { label: "דף הבית", href: "/" },
          { label: "הפלגות" },
        ]}
      />

      {/* Banner matching design-reference */}
      <div className="rounded-2xl overflow-hidden relative h-[160px] mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a3c] to-teal" />
        <div className="absolute inset-0 flex items-center justify-between px-9 max-md:flex-col max-md:text-center max-md:justify-center max-md:gap-3">
          <div>
            <h1 className="text-[22px] font-[800] text-white mb-1">
              הפלגות ושייט מישראל
            </h1>
            <p className="text-sm text-white/70">
              קרוז מחיפה, שייט נהרות, הפלגות כשרות
            </p>
          </div>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-12">מאמרים על הפלגות יעלו בקרוב.</p>
      )}
    </div>
  );
}
