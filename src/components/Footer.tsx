import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-pink-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold">KARTAL ESARP</h3>
            <p className="text-purple-200">Zarafet ve kalitenin adresi. Kütahya&apos;dan Türkiye&apos;nin dört bir yanına.</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold">Hızlı bağlantılar</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-purple-200 hover:text-white transition-colors">Anasayfa</Link>
              <Link href="/yeni-gelenler" className="block text-purple-200 hover:text-white transition-colors">Yeni Gelenler</Link>
              <Link href="/kumas-rehberi" className="block text-purple-200 hover:text-white transition-colors">Kumaş rehberi</Link>
              <Link href="/hakkimizda" className="block text-purple-200 hover:text-white transition-colors">Hakkımızda</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">Koleksiyonlar</h4>
            <div className="space-y-2">
              <Link href="/koleksiyonlar/jersey" className="block text-purple-200 hover:text-white transition-colors">Jersey</Link>
              <Link href="/koleksiyonlar/sifon" className="block text-purple-200 hover:text-white transition-colors">Sifon</Link>
              <Link href="/koleksiyonlar/dokuma" className="block text-purple-200 hover:text-white transition-colors">Dokuma</Link>
              <Link href="/koleksiyonlar/saten" className="block text-purple-200 hover:text-white transition-colors">Saten</Link>
              <Link href="/koleksiyonlar/spor" className="block text-purple-200 hover:text-white transition-colors">Spor</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-purple-200 text-sm">Kütahya, Türkiye</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-purple-200 text-sm">+90 554 240 07 64</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="mb-2 text-purple-200">Kartal Esarp &copy; {new Date().getFullYear()}</p>
          <p className="text-sm text-purple-300">Tüm siparişler Kütahya merkezimizden özenle gönderilmektedir.</p>
        </div>
      </div>
    </footer>
  );
}
