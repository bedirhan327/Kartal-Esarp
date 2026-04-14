import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Kartal Esarp | Zarafet ve Kalitenin Adresi",
    template: "%s | Kartal Esarp",
  },
  description:
    "Kartal Eşarp - Kütahya'dan Türkiye'nin dört bir yanına premium eşarp ve şal koleksiyonu. Jersey, şifon, dokuma ve saten modellerini keşfedin.",
  keywords: ["eşarp", "şal", "jersey şal", "şifon eşarp", "saten eşarp", "dokuma şal", "kartal eşarp", "kütahya"],
  openGraph: {
    title: "Kartal Esarp | Zarafet ve Kalitenin Adresi",
    description: "Premium eşarp ve şal koleksiyonu. Kütahya'dan Türkiye'nin dört bir yanına.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-poppins)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
