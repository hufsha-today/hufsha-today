import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "טיולים מאורגנים — מסלולים, חברות ומחירים",
  description: "כל מה שצריך לדעת על טיולים מאורגנים: חברות מומלצות, מסלולים, מחירים וטיפים מהשטח.",
  alternates: { canonical: "https://hufsha.today/organized-tours" },
};

export default function OrganizedToursPage() {
  const posts = getPostsByCategory("טיולים מאורגנים");

  return (
    <div className="max-w-[740px] mx-auto px-5 py-8">
      <Breadcrumbs
        items={[
          { label: "דף הבית", href: "/" },
          { label: "טיולים מאורגנים" },
        ]}
      />

      <h1 className="text-3xl font-black text-dark mb-2">טיולים מאורגנים</h1>
      <p className="text-muted mb-8">
        חברות מומלצות, מסלולים, מחירים וטיפים — הכל על טיולים מאורגנים מישראל.
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-12">מאמרים על טיולים מאורגנים יעלו בקרוב.</p>
      )}
    </div>
  );
}
