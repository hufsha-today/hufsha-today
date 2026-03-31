"use client";

import { useState } from "react";
import DestinationCard from "./DestinationCard";

interface DestinationItem {
  slug: string;
  name: string;
  flightTime: string;
  regionSlug?: string;
  count: number;
}

interface RegionTab {
  label: string;
  slug: string;
}

interface Props {
  destinations: DestinationItem[];
  regions: RegionTab[];
}

export default function DestinationsFilter({ destinations, regions }: Props) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? destinations
      : destinations.filter((d) => d.regionSlug === active);

  return (
    <>
      <div className="flex gap-2 mb-8 flex-wrap" role="tablist" aria-label="סינון לפי אזור">
        <button
          role="tab"
          aria-selected={active === "all"}
          onClick={() => setActive("all")}
          className={`px-4 py-2 rounded-full text-[14px] font-[600] transition-colors cursor-pointer ${
            active === "all"
              ? "bg-orange text-white"
              : "bg-lightBg text-text hover:bg-orange/10"
          }`}
        >
          הכל
        </button>
        {regions.map((r) => (
          <button
            key={r.slug}
            role="tab"
            aria-selected={active === r.slug}
            onClick={() => setActive(r.slug)}
            className={`px-4 py-2 rounded-full text-[14px] font-[600] transition-colors cursor-pointer ${
              active === r.slug
                ? "bg-orange text-white"
                : "bg-lightBg text-text hover:bg-orange/10"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-md:[&>*]:h-[180px] [&>*]:h-[240px]">
        {filtered.map((d, i) => (
          <DestinationCard
            key={d.slug}
            name={d.name}
            slug={d.slug}
            sub={`${d.flightTime} טיסה · ${d.count} מאמרים`}
            priority={i < 3}
          />
        ))}
      </div>
    </>
  );
}
