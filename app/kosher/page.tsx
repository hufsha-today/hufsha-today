import type { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "כשר בחו\"ל — מלונות כשרים, מסעדות ובתי חב\"ד",
  description: "המדריך המלא לחופשה כשרה בחו\"ל. מלונות כשרים, מסעדות, בתי חב\"ד ב-50+ יעדים.",
  alternates: { canonical: "https://hufsha.today/kosher" },
};

export default function KosherPage() {
  const posts = getPostsByCategory("כשר");

  return (
    <div className="max-w-[740px] mx-auto px-5 py-8">
      <Breadcrumbs
        items={[
          { label: "דף הבית", href: "/" },
          { label: "כשר בחו\"ל" },
        ]}
      />

      <div className="flex items-center gap-5 bg-kosher-bg border border-kosher-border rounded-2xl py-6 px-7 mb-10">
        <div className="w-[52px] h-[52px] bg-orange rounded-[14px] flex items-center justify-center text-2xl flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://flagcdn.com/24x18/il.png" alt="דגל ישראל" style={{ display: "inline" }} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-dark mb-1">כשר בחו&quot;ל</h1>
          <p className="text-sm text-muted">
            מלונות כשרים, מסעדות, בתי חב&quot;ד — המדריך המלא לחופשה כשרה
          </p>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {posts.map((p) => (
            <PostCard key={p.frontmatter.slug} post={p.frontmatter} />
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-12">מאמרים בנושא כשר יעלו בקרוב.</p>
      )}
    </div>
  );
}
