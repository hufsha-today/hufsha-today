interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold text-dark mb-6">שאלות נפוצות</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="border border-border rounded-xl overflow-hidden bg-white group"
          >
            <summary className="flex items-center justify-between px-5 py-4 text-right cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <span className="font-bold text-dark text-[15px]">{faq.q}</span>
              <span className="text-muted text-lg transition-transform duration-200 mr-3 flex-shrink-0 group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="pb-5">
              <p className="px-5 text-text text-[15px] leading-relaxed">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
