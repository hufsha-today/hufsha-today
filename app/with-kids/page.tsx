import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "חופשה עם ילדים — יעדים ומדריכים למשפחות",
  description: "המדריך למשפחות: יעדים מומלצים לחופשה עם ילדים, אטרקציות, טיפים ודילים.",
  alternates: { canonical: "https://hufsha.today/with-kids" },
};

export default function WithKidsPage() {
  const posts = getPostsByCategory("עם ילדים");

  return (
    <div className="max-w-[740px] mx-auto px-5 py-8">
      <Breadcrumbs
        items={[
          { label: "דף הבית", href: "/" },
          { label: "עם ילדים" },
        ]}
      />

      <h1 className="text-3xl font-black text-dark mb-2">חופשה עם ילדים</h1>
      <p className="text-muted mb-8">
        יעדים מומלצים למשפחות, אטרקציות לילדים, טיפים מנוסים ומדריכים מפורטים.
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-12">מאמרים על חופשה עם ילדים יעלו בקרוב.</p>
      )}
    </div>
  );
}
