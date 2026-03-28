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
            <strong className="text-dark">חופשה היום</strong> הוא הבלוג הישראלי לטיולים וחופשות. אנחנו מביאים לכם מדריכים מפורטים על יעדים פופולריים, טיולים מאורגנים, הפלגות ושייט, חופשה עם ילדים וכשר בחו&quot;ל — הכל במקום אחד ובעברית.
          </p>
          <p className="text-text text-[17px] leading-relaxed mb-4">
            המטרה שלנו פשוטה — לעזור לכם לתכנן את החופשה הבאה בקלות, עם מידע אמין ומעשי שחוסך זמן וכסף. אנחנו מאמינים שמדריך טוב צריך לתת תשובות ישירות: כמה זה עולה, כמה ימים צריך, מה שווה ומה פחות.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">מה תמצאו באתר</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          באתר חופשה היום תמצאו מדריכי יעדים מקיפים ליוון, איטליה, קפריסין, בודפשט, דובאי ועוד — כולל ערים ספציפיות כמו אתונה, רודוס, סנטוריני, כרתים, רומא, ונציה, פירנצה, לרנקה ופאפוס. כל מדריך כולל מידע על אטרקציות, מחירים משוערים, טיפים מעשיים ומסלולים מומלצים.
        </p>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          בנוסף, אנחנו מכסים נושאים ייחודיים לקהל הישראלי: מדריכים לחופשה כשרה בחו&quot;ל עם מידע על מלונות כשרים, מסעדות ובתי חב&quot;ד; מדריכי הפלגות מנמל חיפה עם מסלולים ומחירים; השוואת טיולים מאורגנים ליעדים פופולריים; וטיפים מיוחדים לחופשה עם ילדים.
        </p>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          כל התוכן נכתב בעברית, מותאם לצרכים של המטייל הישראלי, ומעודכן באופן שוטף. אנחנו מקפידים על דיוק עובדתי — אם לא בטוחים, אנחנו כותבים את זה במפורש ומפנים למקורות מוסמכים.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">הצוות שלנו</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          צוות חופשה היום כולל מטיילים ותיקים, בלוגרים ומומחי תיירות שחיים ונושמים טיולים. אנחנו מבקרים ביעדים, בודקים מלונות, טועמים אוכל ומדווחים מהשטח. המידע שאנחנו מפרסמים מבוסס על ניסיון אישי, מחקר מעמיק ועדכונים שוטפים.
        </p>
        <p className="text-text text-[17px] leading-relaxed">
          חשוב לנו לציין: המחירים המופיעים באתר הם תמיד משוערים ועשויים להשתנות. אנחנו לא סוכנות נסיעות ולא מוכרים חבילות — אנחנו מספקים מידע שעוזר לכם לקבל החלטות חכמות. מומלץ תמיד לבדוק פרטים עדכניים ישירות מול ספקי השירות.
        </p>
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
