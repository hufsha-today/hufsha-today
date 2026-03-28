"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(250,249,247,0.95)] backdrop-blur-[10px] border-b border-border">
      <div className="max-w-[1100px] mx-auto px-7 h-16 flex items-center justify-between">
        {/* Logo - row-reverse: text first then mascot (RTL) */}
        <Link
          href="/"
          className="flex items-center gap-0 flex-row-reverse no-underline"
        >
          <Image
            src="/images/mascot-logo-transparent.png"
            alt="חופשה היום"
            width={66}
            height={66}
            className="relative animate-[walkIn_1.2s_ease-out_forwards]"
            style={{ marginRight: "-18px" }}
            priority
          />
          <span className="text-[30px] font-[800] text-dark tracking-[-0.5px]">
            <span className="text-orange">חופשה</span> היום
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-7">
          <Link href="/greece" className="text-[#666] text-sm font-medium transition-colors hover:text-orange">יעדים</Link>
          <Link href="/organized-tours" className="text-[#666] text-sm font-medium transition-colors hover:text-orange">טיולים מאורגנים</Link>
          <Link href="/cruises" className="text-[#666] text-sm font-medium transition-colors hover:text-orange">הפלגות</Link>
          <Link href="/kosher" className="text-[#666] text-sm font-medium transition-colors hover:text-orange">כשר</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          aria-label="תפריט"
        >
          <span className={`block w-5 h-0.5 bg-dark transition-all ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`block w-5 h-0.5 bg-dark transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-dark transition-all ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(250,249,247,0.98)] border-t border-border px-7 py-4 flex flex-col gap-4">
          <Link href="/greece" className="text-[#666] text-sm font-medium" onClick={() => setMenuOpen(false)}>יעדים</Link>
          <Link href="/organized-tours" className="text-[#666] text-sm font-medium" onClick={() => setMenuOpen(false)}>טיולים מאורגנים</Link>
          <Link href="/cruises" className="text-[#666] text-sm font-medium" onClick={() => setMenuOpen(false)}>הפלגות</Link>
          <Link href="/kosher" className="text-[#666] text-sm font-medium" onClick={() => setMenuOpen(false)}>כשר</Link>
        </div>
      )}
    </nav>
  );
}
