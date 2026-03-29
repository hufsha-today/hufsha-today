"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getDestinationGradient } from "@/lib/gradients";

interface Props {
  name: string;
  slug: string;
  sub?: string;
  tag?: string;
  spanRows?: boolean;
  priority?: boolean;
}

export default function DestinationCard({ name, slug, sub, tag, spanRows, priority }: Props) {
  const gradient = getDestinationGradient(name);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Link
      href={`/${slug}`}
      className={`group relative block rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-[3px] no-underline ${
        spanRows ? "row-span-2" : ""
      }`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
        style={{ background: imgFailed ? gradient : undefined }}
      >
        {!imgFailed && (
          <Image
            src={`/images/destinations/${slug}.jpg`}
            alt={`חופשה ב${name} — יעד מומלץ`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            priority={priority}
            onError={() => setImgFailed(true)}
          />
        )}
        {imgFailed && (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Tag */}
      {tag && (
        <div className="absolute top-3 left-3 z-10 bg-orange text-white text-[10px] font-bold py-1 px-2.5 rounded-md">
          {tag}
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-4 right-[18px] z-10 text-white">
        <div className="text-[22px] font-[800]">{name}</div>
        {sub && <div className="text-xs opacity-80 mt-0.5">{sub}</div>}
      </div>
    </Link>
  );
}
