import Image from "next/image";

export default function CtaBox() {
  return (
    <div className="bg-kosher-bg border border-kosher-border rounded-xl p-6 my-10 flex items-center gap-4">
      <Image
        src="/images/mascot-walking-transparent.png"
        alt="הדוכיפת"
        width={40}
        height={40}
        className="flex-shrink-0"
      />
      <div className="flex-1">
        <p className="text-dark text-sm font-medium leading-relaxed m-0">
          <strong>רוצים לשמוע על דילים?</strong> הדוכיפת ממליצה להירשם
          לניוזלטר שלנו ולקבל עדכונים על מבצעים וטיסות זולות.
        </p>
      </div>
    </div>
  );
}
