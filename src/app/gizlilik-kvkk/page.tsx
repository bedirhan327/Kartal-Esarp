import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK Aydınlatma",
  description:
    "Kartal Eşarp gizlilik, çerez kullanımı ve KVKK kapsamında kişisel veri işleme süreçlerine dair bilgilendirme metni.",
};

export default function GizlilikKvkkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Gizlilik ve KVKK</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">
            Kişisel verilerinizin işlenmesi, saklanması ve çerez kullanımı hakkında şeffaf bilgilendirme.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl space-y-6 px-4">
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">1) Toplanan Veriler</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Sipariş ve iletişim süreçlerinde ad-soyad, telefon numarası, teslimat adresi ve sipariş içeriği gibi
              bilgileri yalnızca hizmet sunumu amacıyla işliyoruz.
            </p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">2) Kullanım Amaçları</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Verileriniz; sipariş yönetimi, müşteri desteği, teslimat organizasyonu ve yasal yükümlülüklerin yerine
              getirilmesi amacıyla işlenir. Açık rıza olmadan ticari üçüncü taraflarla paylaşılmaz.
            </p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">3) Çerez (Cookie) Kullanımı</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Sitemizde temel işlevler ve kullanıcı deneyimi için çerezler kullanılabilir. Zorunlu olmayan çerezler,
              onayınız doğrultusunda etkinleştirilir. Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman
              güncelleyebilirsiniz.
            </p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">4) KVKK Kapsamındaki Haklarınız</h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              6698 sayılı KVKK kapsamında kişisel verilerinizle ilgili bilgi talep etme, düzeltme, silme/yok etme ve
              işleme itiraz etme haklarına sahipsiniz.
            </p>
            <p className="mt-2 text-gray-600">
              Talepleriniz için{" "}
              <Link href="/iletisim" className="font-semibold text-purple-600 underline underline-offset-2">
                iletişim sayfamız
              </Link>{" "}
              üzerinden bize ulaşabilirsiniz.
            </p>
          </article>

          <p className="text-sm text-gray-500">
            Bu metin bilgilendirme amacı taşır. İş süreçleri güncellendikçe içerik revize edilebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
