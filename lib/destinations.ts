export interface Destination {
  slug: string;
  name: string;
  country: string;
  flag: string;
  description: string;
  flightTime: string;
  currency: string;
  language: string;
  bestSeason: string;
  subDestinations: { name: string; slug: string }[];
  faq: { q: string; a: string }[];
}

export const destinations: Destination[] = [
  {
    slug: 'greece',
    name: 'יוון',
    country: 'יוון',
    flag: '🇬🇷',
    description: 'יוון היא יעד חלומי לישראלים — חופים מהממים, אוכל מעולה, היסטוריה עתיקה ומחירים נוחים. טיסה קצרה מישראל, מזג אוויר מושלם ואירוח חם.',
    flightTime: '2:00 שעות',
    currency: 'אירו (EUR)',
    language: 'יוונית',
    bestSeason: 'מאי-אוקטובר',
    subDestinations: [
      { name: 'רודוס', slug: 'rhodes' },
      { name: 'כרתים', slug: 'crete' },
      { name: 'סנטוריני', slug: 'santorini' },
      { name: 'אתונה', slug: 'athens' },
      { name: 'קורפו', slug: 'corfu' },
      { name: 'מיקונוס', slug: 'mykonos' },
    ],
    faq: [
      { q: 'מה הזמן הכי טוב לטוס ליוון?', a: 'העונה האידאלית היא מאי עד אוקטובר, כשהמזג אוויר חם ויבש. יולי-אוגוסט הם החודשים החמים ביותר.' },
      { q: 'כמה עולה טיסה ליוון מישראל?', a: 'טיסות ישירות ליוון מתחילות מ-200-400 שקל לכיוון, תלוי בעונה ובחברת התעופה.' },
      { q: 'האם יוון מתאימה למשפחות עם ילדים?', a: 'בהחלט! יוון מציעה חופים רדודים ובטוחים, פארקי מים, ואווירה משפחתית.' },
    ],
  },
  {
    slug: 'budapest',
    name: 'בודפשט',
    country: 'הונגריה',
    flag: '🇭🇺',
    description: 'בודפשט, פנינת הדנובה, מציעה ארכיטקטורה מרהיבה, מרחצאות תרמיים, חיי לילה תוססים ואוכל מצוין — הכל במחירים נוחים במיוחד.',
    flightTime: '2:45 שעות',
    currency: 'פורינט הונגרי (HUF)',
    language: 'הונגרית',
    bestSeason: 'אפריל-אוקטובר',
    subDestinations: [
      { name: 'בודה', slug: 'buda' },
      { name: 'פשט', slug: 'pest' },
      { name: 'אגם בלטון', slug: 'balaton' },
    ],
    faq: [
      { q: 'כמה ימים מומלץ בבודפשט?', a: '3-4 ימים מספיקים לכסות את האטרקציות העיקריות של העיר.' },
      { q: 'האם בודפשט מתאימה לילדים?', a: 'כן! מרחצאות תרמיים, פארק שעשועים, שייט בדנובה ומוזיאונים אינטראקטיביים.' },
      { q: 'מה כדאי לאכול בבודפשט?', a: 'גולאש הונגרי, כימני קייק (עוגת ארובה), לאנגוש (מאפה מטוגן) ופלצ\'ינטא.' },
    ],
  },
  {
    slug: 'italy',
    name: 'איטליה',
    country: 'איטליה',
    flag: '🇮🇹',
    description: 'איטליה מציעה שילוב מושלם של תרבות, היסטוריה, אוכל ואופנה. מרומא ועד ונציה, כל פינה מספרת סיפור.',
    flightTime: '3:30 שעות',
    currency: 'אירו (EUR)',
    language: 'איטלקית',
    bestSeason: 'אפריל-יוני, ספטמבר-אוקטובר',
    subDestinations: [
      { name: 'רומא', slug: 'rome' },
      { name: 'ונציה', slug: 'venice' },
      { name: 'פירנצה', slug: 'florence' },
      { name: 'מילאנו', slug: 'milan' },
    ],
    faq: [
      { q: 'מה עדיף — רומא או מילאנו?', a: 'רומא מתאימה יותר לתיירות קלאסית עם אתרים היסטוריים, מילאנו מושלמת לאופנה ועיצוב.' },
      { q: 'כמה ימים צריך באיטליה?', a: 'שבוע מינימום כדי לכסות 2-3 ערים. 10 ימים אידאלי.' },
    ],
  },
  {
    slug: 'cyprus',
    name: 'קפריסין',
    country: 'קפריסין',
    flag: '🇨🇾',
    description: 'קפריסין היא היעד הקרוב ביותר לישראלים באירופה — טיסה של שעה, חופים יפהפיים, אוכל מעולה ואווירה רגועה.',
    flightTime: '1:00 שעה',
    currency: 'אירו (EUR)',
    language: 'יוונית',
    bestSeason: 'אפריל-נובמבר',
    subDestinations: [
      { name: 'לרנקה', slug: 'larnaca' },
      { name: 'פאפוס', slug: 'paphos' },
      { name: 'אייה נאפה', slug: 'ayia-napa' },
      { name: 'לימסול', slug: 'limassol' },
    ],
    faq: [
      { q: 'כמה זמן הטיסה לקפריסין?', a: 'טיסה ישירה מישראל לקפריסין לוקחת כשעה בלבד.' },
      { q: 'האם יש אוכל כשר בקפריסין?', a: 'כן, יש מספר מלונות ומסעדות כשרות, בעיקר בלרנקה ולימסול.' },
    ],
  },
  {
    slug: 'dubai',
    name: 'דובאי',
    country: 'איחוד האמירויות',
    flag: '🇦🇪',
    description: 'דובאי היא עיר של שיאים — המגדל הגבוה בעולם, קניות יוקרה, חוויות מדבריות ואטרקציות מהעתיד.',
    flightTime: '3:15 שעות',
    currency: 'דירהם (AED)',
    language: 'ערבית, אנגלית',
    bestSeason: 'נובמבר-מרץ',
    subDestinations: [
      { name: 'דאונטאון דובאי', slug: 'downtown' },
      { name: 'מרינה', slug: 'marina' },
      { name: 'אבו דאבי', slug: 'abu-dhabi' },
    ],
    faq: [
      { q: 'האם דובאי יקרה?', a: 'דובאי יכולה להיות יקרה, אבל יש גם אפשרויות במחירים סבירים. תקציב יומי של 300-500 שקל לאדם ריאלי.' },
      { q: 'מה חובה לראות בדובאי?', a: 'בורג׳ ח׳ליפה, דובאי מול, פאלם ג׳ומיירה, שוק הזהב ונסיעת ג׳יפים במדבר.' },
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}
