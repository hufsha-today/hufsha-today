import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-family-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "חופשה היום — המדריך שלך לחופשה הבאה",
    template: "%s | חופשה היום",
  },
  description:
    "הבלוג הישראלי לטיולים וחופשות. מדריכי יעדים, טיולים מאורגנים, הפלגות, כשר — הכל בעברית.",
  keywords: [
    "חופשה",
    "טיולים",
    "יעדים",
    "הפלגות",
    "כשר בחול",
    "טיולים מאורגנים",
    "חופשה עם ילדים",
  ],
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "חופשה היום",
    url: "https://hufsha.today",
  },
  alternates: { canonical: "https://hufsha.today" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
