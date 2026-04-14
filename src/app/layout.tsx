import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
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
    "Kartal Esarp - Kutahya'dan Turkiye'nin dort bir yanina premium esarp ve sal koleksiyonu. Jersey, sifon, dokuma ve saten modelleri kesfet.",
  keywords: ["esarp", "sal", "jersey sal", "sifon esarp", "saten esarp", "dokuma sal", "kartal esarp", "kutahya"],
  openGraph: {
    title: "Kartal Esarp | Zarafet ve Kalitenin Adresi",
    description: "Premium esarp ve sal koleksiyonu. Kutahya'dan Turkiye'nin dort bir yanina.",
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
      </body>
    </html>
  );
}
