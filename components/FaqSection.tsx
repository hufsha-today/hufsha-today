"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-dark mb-6">שאלות נפוצות</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-border rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-right bg-transparent border-none cursor-pointer"
            >
              <span className="font-bold text-dark text-[15px]">{faq.q}</span>
              <span
                className={`text-muted text-lg transition-transform duration-200 mr-3 flex-shrink-0 ${
                  openIdx === i ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIdx === i ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="px-5 text-text text-[15px] leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
