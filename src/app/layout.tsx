import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ScrollToTop from "@/components/ScrollToTop";
import { CompareProvider } from "@/components/CompareBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Kartal Eşarp | Zarafet ve Kalitenin Adresi",
    template: "%s | Kartal Eşarp",
  },
  description:
    "Kartal Eşarp - Kütahya'dan Türkiye'nin dört bir yanına premium eşarp ve şal koleksiyonu. İpek eşarp, şal, desenli ve geometrik modelleri keşfedin.",
  keywords: ["eşarp", "şal", "ipek eşarp", "desenli eşarp", "geometrik eşarp", "kartal eşarp", "kütahya", "vakko", "armine", "zerafetim"],
  openGraph: {
    title: "Kartal Eşarp | Zarafet ve Kalitenin Adresi",
    description: "Premium eşarp ve şal koleksiyonu. Kütahya'dan Türkiye'nin dört bir yanına.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kartal Eşarp",
  },
  metadataBase: new URL("https://kartal-esarp.vercel.app"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-poppins)]">
        <CompareProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
          <ScrollToTop />
        </CompareProvider>
        <Analytics />
      </body>
    </html>
  );
}
