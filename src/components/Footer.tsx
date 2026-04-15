"use client";

import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-pink-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold">KARTAL ESARP</h3>
            <p className="text-purple-200">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.home}
              </Link>
              <Link href="/yeni-gelenler" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.newArrivals}
              </Link>
              <Link href="/kumas-rehberi" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.fabricGuide}
              </Link>
              <Link href="/sss" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.faq}
              </Link>
              <Link href="/hakkimizda" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.about}
              </Link>
              <Link href="/iletisim" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.contact}
              </Link>
              <Link href="/kargo-iade-degisim" className="block text-purple-200 transition-colors hover:text-white">
                {t.footer.kargoPage}
              </Link>
              <Link href="/gizlilik-kvkk" className="block text-purple-200 transition-colors hover:text-white">
                {t.footer.privacy}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.collections}</h4>
            <div className="space-y-2">
              <Link href="/koleksiyonlar/ipek-esarp" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav["ipek-esarp"]}
              </Link>
              <Link href="/koleksiyonlar/sal" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.sal}
              </Link>
              <Link href="/koleksiyonlar/desenli" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.desenli}
              </Link>
              <Link href="/koleksiyonlar/geometrik" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.geometrik}
              </Link>
              <Link href="/koleksiyonlar/lux" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.lux}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-sm text-purple-200">Sebilerenler Caddesi, Kütahya</span>
              </div>
              <a href="tel:+905542400764" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-sm text-purple-200">+90 554 240 07 64</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="mb-2 text-purple-200">
            {t.footer.copyright} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-sm text-purple-300">{t.footer.shippingNote}</p>
        </div>
      </div>
    </footer>
  );
}
