"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import type { PostFrontmatter } from "@/lib/posts";

interface Props {
  posts: PostFrontmatter[];
  filterKey: "destination" | "category";
}

export default function FilteredPostGrid({ posts, filterKey }: Props) {
  const [active, setActive] = useState("הכל");

  const values = Array.from(new Set(posts.map((p) => p[filterKey])));
  const filters = ["הכל", ...values];
  const filtered =
    active === "הכל" ? posts : posts.filter((p) => p[filterKey] === active);

  if (posts.length === 0) {
    return (
      <p className="text-muted text-center py-12">
        מאמרים בנושא זה יעלו בקרוב.
      </p>
    );
  }

  return (
    <>
      {values.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border cursor-pointer ${
                active === f
                  ? "bg-teal text-white border-teal"
                  : "bg-white border-border text-text hover:border-teal hover:text-teal"
              }`}
            >
              {f}
              {f !== "הכל" &&
                ` (${posts.filter((p) => p[filterKey] === f).length})`}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </>
  );
}
