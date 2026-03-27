import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "אודות — חופשה היום",
  description: "הכירו את חופשה היום — הבלוג הישראלי לטיולים וחופשות.",
  alternates: { canonical: "https://hufsha.today/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-[740px] mx-auto px-5 py-12">
      <h1 className="text-3xl font-black text-dark mb-6">אודות חופשה היום</h1>

      <div className="flex items-start gap-6 mb-8 max-sm:flex-col max-sm:items-center max-sm:text-center">
        <Image
          src="/images/mascot-walking-transparent.png"
          alt="הדוכיפת של חופשה היום"
          width={120}
          height={120}
          className="flex-shrink-0"
        />
        <div>
          <p className="text-text text-[17px] leading-relaxed mb-4">
            <strong className="text-dark">חופשה היום</strong> הוא הבלוג הישראלי המוביל לטיולים וחופשות. אנחנו מביאים לכם מדריכים מפורטים על יעדים פופולריים, טיולים מאורגנים, הפלגות ושייט, חופשה עם ילדים וכשר בחו&quot;ל.
          </p>
          <p className="text-text text-[17px] leading-relaxed mb-4">
            המטרה שלנו פשוטה — לעזור לכם לתכנן את החופשה הבאה בקלות, עם כל המידע שאתם צריכים במקום אחד ובעברית.
          </p>
          <p className="text-text text-[17px] leading-relaxed">
            צוות הכותבים שלנו כולל מטיילים ותיקים, בלוגרים ומומחי תיירות שחיים ונושמים טיולים. אנחנו מבקרים ביעדים, בודקים מלונות, טועמים אוכל ומדווחים מהשטח.
          </p>
        </div>
      </div>

      <div className="bg-teal-light border border-teal/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-dark mb-2">צרו קשר</h2>
        <p className="text-text text-sm leading-relaxed">
          רוצים לשתף פעולה? יש לכם שאלה? שלחו לנו מייל ל-
          <a href="mailto:hello@hufsha.today" className="text-teal font-medium">
            hello@hufsha.today
          </a>
        </p>
      </div>
    </div>
  );
}
