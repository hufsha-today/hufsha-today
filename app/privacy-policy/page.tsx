import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות — חופשה היום",
  description: "מדיניות הפרטיות של אתר חופשה היום — מידע על שימוש בעוגיות, Google Analytics ואיסוף נתונים.",
  alternates: { canonical: "https://hufsha.today/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[740px] mx-auto px-5 py-12">
      <h1 className="text-3xl font-black text-dark mb-6">מדיניות פרטיות</h1>

      <p className="text-text text-[17px] leading-relaxed mb-4">
        עודכן לאחרונה: מרץ 2026
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">מבוא</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          אתר <strong className="text-dark">חופשה היום</strong> (hufsha.today) מכבד את פרטיות המבקרים. מדיניות זו מסבירה אילו נתונים נאספים במהלך השימוש באתר, כיצד הם משמשים, ומהן הזכויות שלכם בנוגע למידע זה.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">איסוף מידע</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          האתר אינו דורש הרשמה ואינו אוסף מידע אישי מזהה כגון שם, כתובת דוא&quot;ל או מספר טלפון, אלא אם תבחרו לשלוח לנו הודעה באופן יזום. אנחנו לא מוכרים, משכירים או מעבירים מידע אישי לצדדים שלישיים.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">Google Analytics</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          האתר משתמש ב-Google Analytics, שירות ניתוח נתונים של Google. שירות זה אוסף מידע אנונימי על אופן השימוש באתר — כולל עמודים שנצפו, משך הביקור, מיקום גאוגרפי כללי (מדינה/עיר), סוג הדפדפן והמכשיר. המידע הזה עוזר לנו להבין מה מעניין את הקוראים ולשפר את התוכן. Google Analytics משתמש בעוגיות (cookies) לצורך איסוף הנתונים. המידע נשמר בשרתי Google בהתאם למדיניות הפרטיות שלהם.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">עוגיות (Cookies)</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          האתר משתמש בעוגיות — קבצים קטנים שנשמרים בדפדפן שלכם. העוגיות העיקריות שבשימוש הן עוגיות של Google Analytics, המשמשות למעקב אנונימי אחר ביקורים באתר. תוכלו לחסום עוגיות דרך הגדרות הדפדפן שלכם. חסימת עוגיות לא תפגע ביכולת שלכם לגלוש באתר.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">קישורים חיצוניים</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          האתר עשוי לכלול קישורים לאתרים חיצוניים. אין לנו שליטה על מדיניות הפרטיות של אתרים אלה, ואנו ממליצים לעיין במדיניות שלהם בנפרד.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-dark mb-3">שינויים במדיניות</h2>
        <p className="text-text text-[17px] leading-relaxed mb-4">
          אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים ייכנסו לתוקף עם פרסומם באתר.
        </p>
      </div>

      <div className="bg-teal-light border border-teal/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-dark mb-2">צרו קשר</h2>
        <p className="text-text text-sm leading-relaxed">
          לשאלות בנוגע למדיניות הפרטיות, פנו אלינו בדוא&quot;ל:{" "}
          <a href="mailto:hello@hufsha.today" className="text-teal font-medium">
            hello@hufsha.today
          </a>
        </p>
      </div>
    </div>
  );
}
