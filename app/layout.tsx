import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    images: [
      {
        url: "https://hufsha.today/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "חופשה היום — המדריך שלך לחופשה הבאה",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://hufsha.today/images/og-default.png"],
  },
  alternates: {
    canonical: "https://hufsha.today",
    languages: { "he-IL": "https://hufsha.today" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    google: "aqrghQh1eFPMriYcDnYZZeOV4lcklP7PKw1Te5D1mYI",
  },
};

export const viewport: Viewport = {
  themeColor: "#E8862A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E8S24VE12X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-E8S24VE12X');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "חופשה היום",
              url: "https://hufsha.today",
              logo: {
                "@type": "ImageObject",
                url: "https://hufsha.today/images/mascot-logo-transparent.png",
                width: 512,
                height: 512,
              },
              description: "הבלוג הישראלי לטיולים וחופשות. מדריכי יעדים, טיולים מאורגנים, הפלגות, כשר — הכל בעברית.",
            }),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
