import type { Metadata } from "next";
import { ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Kargo, İade ve Değişim",
  description:
    "Kartal Eşarp kargo, iade ve değişim koşulları. Süreler, kargo ücretleri ve hijyen kurallarını net şekilde inceleyin.",
};

const shippingRules = [
  "Siparişleriniz ödeme onayından sonra 1-3 iş günü içinde kargoya verilir.",
  "Kargo takip bilgisi sipariş sonrası WhatsApp üzerinden paylaşılır.",
  "Resmi tatil ve kampanya dönemlerinde kargoya teslim süresi 1-2 iş günü uzayabilir.",
  "Teslimatta paket hasarı varsa kargo görevlisi yanında tutanak tutturulmalıdır.",
];

const returnRules = [
  "İade talebi, teslimat tarihinden itibaren 14 gün içinde iletilmelidir.",
  "İade gönderim ücreti, ürün kusurlu değilse müşteriye aittir.",
  "Kusurlu/yanlış ürün gönderiminde iade kargo ücreti tarafımızca karşılanır.",
  "Ürün etiketi, kutusu ve aksesuarları eksiksiz olmalıdır.",
];

const hygieneRules = [
  "Eşarp ve şal ürünlerinde hijyen nedeniyle kullanılmış, yıkanmış veya parfüm kokusu sinmiş ürünlerde iade/değişim kabul edilmez.",
  "Deneme sırasında makyaj lekesi, deformasyon veya ip çekilmesi oluşmamasına dikkat edilmelidir.",
  "Hijyen şartlarını sağlamayan gönderiler, inceleme sonrası tekrar alıcıya yönlendirilir.",
];

const exchangeRules = [
  "Değişim talepleri teslimat tarihinden itibaren 14 gün içinde yapılır.",
  "Stok durumuna göre aynı ürünün farklı rengi/alternatif ürünle değişim yapılabilir.",
  "Değişim kargo ücreti, ürün kusuru yoksa müşteriye aittir.",
  "Değişim süreci için WhatsApp üzerinden sipariş kodunuzla iletişime geçebilirsiniz.",
];

export default function KargoIadeDegisimPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Kargo, İade ve Değişim</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Sipariş sürecinizde net bilgiye hızlıca ulaşabilmeniz için tüm koşulları tek sayfada topladık.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <Truck className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Kargo Süreci</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {shippingRules.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">İade Koşulları</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {returnRules.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Hijyen Kuralları</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {hygieneRules.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Değişim Koşulları</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {exchangeRules.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
