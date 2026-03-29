"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { PostFrontmatter } from "@/lib/posts";
import { getDestinationGradient } from "@/lib/gradients";

const categoryBadge: Record<string, { bg: string; text: string }> = {
  "עם ילדים": { bg: "#f3e8ff", text: "#7b1fa2" },
  "כשר": { bg: "#fff3e0", text: "#e65100" },
  "הפלגות": { bg: "#e0f7fa", text: "#00838f" },
  "טיולים מאורגנים": { bg: "#e8f5e9", text: "#2e7d32" },
  "אטרקציות": { bg: "#fce4ec", text: "#c62828" },
  "מדריכים": { bg: "#e3f2fd", text: "#1565c0" },
};

export default function PostCard({ post }: { post: PostFrontmatter }) {
  const [imgFailed, setImgFailed] = useState(false);
  const badge = categoryBadge[post.category] || { bg: "#eee", text: "#555" };
  const gradient = getDestinationGradient(post.destination);

  const readingTime = post.readingTime || 1;

  return (
    <Link href={`/${post.slug}`} className="group block no-underline">
      <div className="bg-white rounded-[14px] overflow-hidden border border-border cursor-pointer transition-all duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
        {/* Card image */}
        <div
          className="h-[160px] relative"
          style={{ background: imgFailed ? gradient : undefined }}
        >
          {!imgFailed && (
            <Image
              src={`/images/posts/${post.slug}.jpg`}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <div
              className="absolute inset-0"
              style={{ background: gradient }}
            />
          )}
          {/* Category badge */}
          <div
            className="absolute top-2.5 right-2.5 z-10 text-[10px] font-bold py-[3px] px-2.5 rounded-md"
            style={{ background: badge.bg, color: badge.text }}
          >
            {post.category}
          </div>
        </div>

        {/* Card body */}
        <div className="py-4 px-[18px] pb-5">
          <div className="text-base font-bold text-dark leading-[1.4] mb-1.5 group-hover:text-orange transition-colors">
            {post.title}
          </div>
          <div className="text-[13px] text-[#777] leading-[1.5] line-clamp-2">
            {post.excerpt}
          </div>
          <div className="text-[11px] text-[#999] mt-2.5 pt-2.5 border-t border-[#f5f3f0]">
            {new Date(post.date).toLocaleDateString("he-IL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {readingTime} דק׳ קריאה
          </div>
        </div>
      </div>
    </Link>
  );
}
