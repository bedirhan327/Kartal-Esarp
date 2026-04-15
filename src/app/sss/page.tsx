import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Kargo, iade, değişim, ipek bakım talimatları ve sipariş süreçleri hakkında Kartal Eşarp sık sorulan sorular sayfası.",
};

const faqItems = [
  {
    question: "İpek eşarp nasıl yıkanır?",
    answer:
      "İpek ürünlerde kuru temizleme öneriyoruz. Evde yıkama yapılacaksa soğuk su ve nazik bir ipek deterjanı kullanın; sıkma yapmadan gölgede kurutun, tersinden düşük ısıda ütüleyin.",
  },
  {
    question: "Kargo ne kadar sürer?",
    answer:
      "Siparişleriniz genellikle 1-3 iş günü içinde kargoya verilir. Yoğun kampanya dönemlerinde süre 1-2 iş günü uzayabilir.",
  },
  {
    question: "İade ve değişim süresi kaç gün?",
    answer:
      "Teslimat tarihinden itibaren 14 gün içinde iade veya değişim talebinde bulunabilirsiniz. Hijyen koşullarına uygunluk zorunludur.",
  },
  {
    question: "İade kargo ücretini kim öder?",
    answer:
      "Ürün kusurlu veya yanlış gönderildiyse iade kargo ücreti bize aittir. Kusur olmayan iade/değişimlerde kargo ücreti müşteriye aittir.",
  },
  {
    question: "WhatsApp üzerinden nasıl sipariş veririm?",
    answer:
      "Ürün sayfasındaki veya sağ alttaki WhatsApp butonunu kullanarak hazır sipariş mesajı gönderebilirsiniz. Sipariş kodu, ürün adı ve teslimat bilgilerinizi ileterek süreci tamamlayabilirsiniz.",
  },
  {
    question: "Kapıda ödeme var mı?",
    answer:
      "Güncel ödeme seçenekleri dönemsel olarak değişebilir. En hızlı ve doğru bilgi için WhatsApp hattımızdan bizimle iletişime geçebilirsiniz.",
  },
];

export default function SssPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Sık Sorulan Sorular</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Sipariş, kargo, iade ve ürün bakımıyla ilgili en çok sorulan sorulara hızlı cevaplar.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-2xl bg-white p-6 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">
                  {item.question}
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
