import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="max-w-[500px] mx-auto px-5 py-20 text-center">
      <Image
        src="/images/mascot-walking-transparent.png"
        alt="אופס"
        width={120}
        height={120}
        className="mx-auto mb-6"
      />
      <h1 className="text-4xl font-black text-dark mb-3">404</h1>
      <p className="text-muted text-lg mb-8">
        הדף שחיפשתם לא נמצא. אולי הדוכיפת תעזור לכם למצוא את הדרך?
      </p>
      <Link
        href="/"
        className="inline-block bg-orange text-white font-bold py-3 px-8 rounded-xl hover:bg-orange-hover transition-colors no-underline"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
}
