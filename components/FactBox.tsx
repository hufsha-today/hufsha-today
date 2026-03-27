interface Props {
  facts: {
    flightTime: string;
    currency: string;
    language: string;
    bestSeason: string;
    dailyBudget: string;
    temperature: string;
  };
}

const rows: { key: keyof Props["facts"]; label: string }[] = [
  { key: "flightTime", label: "זמן טיסה" },
  { key: "currency", label: "מטבע" },
  { key: "language", label: "שפה" },
  { key: "bestSeason", label: "עונה מומלצת" },
  { key: "dailyBudget", label: "תקציב יומי" },
  { key: "temperature", label: "טמפרטורה" },
];

export default function FactBox({ facts }: Props) {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden mb-10">
      {rows.map((r, i) => (
        <div
          key={r.key}
          className={`flex justify-between px-5 py-3 text-sm ${
            i % 2 === 0 ? "bg-white" : "bg-bg"
          } ${i < rows.length - 1 ? "border-b border-border" : ""}`}
        >
          <span className="font-bold text-dark">{r.label}</span>
          <span className="text-text">{facts[r.key]}</span>
        </div>
      ))}
    </div>
  );
}
