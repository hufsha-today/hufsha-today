"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex max-w-[500px] mx-auto rounded-xl overflow-hidden border-[1.5px] border-[#eee] bg-white opacity-0 animate-[fadeUp_0.5s_0.4s_forwards] max-md:max-w-full"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפשו יעד, מדינה או נושא..."
        className="flex-1 border-none py-3.5 px-5 text-[15px] outline-none bg-transparent placeholder:text-[#ccc]"
        dir="rtl"
      />
      <button
        type="submit"
        className="border-none bg-orange text-white py-3.5 px-7 text-[15px] font-semibold cursor-pointer transition-colors hover:bg-orange-hover"
      >
        חיפוש
      </button>
    </form>
  );
}
