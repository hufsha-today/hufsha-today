import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] pt-10 pb-8 px-7 mt-5">
      <div className="max-w-[1100px] mx-auto flex justify-between items-start gap-8 max-md:flex-col max-md:text-center">
        <div>
          <div className="text-xl font-black text-white">
            <span className="text-orange">חופשה</span> היום
          </div>
          <p className="text-[13px] text-[#666] mt-1.5 leading-relaxed max-w-[280px]">
            הבלוג הישראלי לטיולים וחופשות. מדריכי יעדים, טיולים מאורגנים, הפלגות, כשר — הכל בעברית.
          </p>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-white mb-2.5">יעדים</h4>
          <Link href="/destinations/greece" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">יוון</Link>
          <Link href="/destinations/italy" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">איטליה</Link>
          <Link href="/destinations/cyprus" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">קפריסין</Link>
          <Link href="/destinations/budapest" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">בודפשט</Link>
          <Link href="/destinations/dubai" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">דובאי</Link>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-white mb-2.5">קטגוריות</h4>
          <Link href="/organized-tours" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">טיולים מאורגנים</Link>
          <Link href="/cruises" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">הפלגות</Link>
          <Link href="/kosher" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">כשר</Link>
          <Link href="/with-kids" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">עם ילדים</Link>
        </div>

        <div>
          <h4 className="text-[13px] font-bold text-white mb-2.5">עוד</h4>
          <Link href="/about" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">אודות</Link>
          <Link href="/about" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">צור קשר</Link>
          <Link href="/about" className="block text-[#777] text-[13px] mb-1.5 hover:text-orange transition-colors">מדיניות פרטיות</Link>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto mt-6 pt-5 border-t border-[#2a2a2a] text-center text-[#555] text-xs">
        © 2026 חופשה היום · hufsha.today
      </div>
    </footer>
  );
}
