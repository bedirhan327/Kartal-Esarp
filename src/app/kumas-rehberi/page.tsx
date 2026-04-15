"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const categories = [
  {
    name: "İpek Eşarplar",
    image: "/products/esarp-032.jpeg",
    href: "/koleksiyonlar/ipek-esarp",
    features: ["%100 saf ipek twill", "90x90 cm kare form", "Doğal parlaklık", "Zamansız zarafet"],
    description: "İpek eşarplar, %100 saf ipek twill kumaştan üretilir. Doğal parlaklığı ve yumuşak dokusuyla her kombini bir üst seviyeye taşır. 90x90 cm kare formda sunulan bu eşarplar, hem günlük hem de özel günlerde kullanıma uygundur.",
    care: "Kuru temizleme önerilir. Elde yıkama yapılacaksa soğuk suyla nazikçe yıkayın. Ters çevirip düşük ısıda ütüleyin.",
  },
  {
    name: "Şallar",
    image: "/products/esarp-082.jpeg",
    href: "/koleksiyonlar/sal",
    features: ["70x200 cm uzun boy", "Viskon & medine ipeği", "Kolay sarılır", "Her mevsim kullanım"],
    description: "Şallar, viskon, medine ipeği ve pamuk-ipek karışım kumaşlardan üretilir. 70x200 cm uzun boy formuyla kolay sarılır ve gün boyu konfor sağlar. Hafif yapısı sayesinde her mevsim kullanılabilir.",
    care: "30 derecede çamaşır makinesinde yıkanabilir. Gölgede kurutun. Orta ısıda ütüleyin.",
  },
  {
    name: "Desenli Eşarplar",
    image: "/products/esarp-102.jpeg",
    href: "/koleksiyonlar/desenli",
    features: ["Çiçekli & botanik motifler", "Tropikal tasarımlar", "Sanatsal el boyama etkisi", "Doğadan ilham"],
    description: "Desenli eşarplar, çiçek buketi, botanik yaprak, tropikal meyve ve figürlü motiflerle süslenen sanatsal parçalardır. Her biri benzersiz bir tablo gibi tasarlanmıştır. Canlı renklerden pastel tonlara kadar geniş seçenek sunar.",
    care: "Kuru temizleme önerilir. Elde yıkamada soğuk su kullanın. Doğrudan güneşte kurutmayın.",
  },
  {
    name: "Geometrik Eşarplar",
    image: "/products/esarp-100.jpeg",
    href: "/koleksiyonlar/geometrik",
    features: ["Chevron & kazayağı", "Çizgili & puantiye", "Pop art tasarımlar", "Modern & cesur"],
    description: "Geometrik eşarplar, chevron, kazayağı, puantiye, patchwork ve pop art gibi modern grafik motiflerle tasarlanmıştır. Cesur çizgiler ve kontrast renklerle zamansız şıklık sunar. Hem klasik hem de modern tarza uyum sağlar.",
    care: "Kuru temizleme önerilir. Elde yıkamada ılık su kullanın. Ters çevirip düşük ısıda ütüleyin.",
  },
];

export default function KumasRehberi() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl">
            Koleksiyon Rehberi
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-lg text-white/80">
            Her koleksiyonun özelliklerini keşfedin, size en uygun olanı bulun
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto space-y-20 px-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className={`flex flex-col items-center gap-10 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">{cat.name}</h2>
                <p className="mb-6 text-gray-600 leading-relaxed">{cat.description}</p>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {cat.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      <span className="text-sm font-medium text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6 rounded-xl bg-purple-50 p-4">
                  <h4 className="mb-1 text-sm font-bold text-purple-700">Bakım Önerisi</h4>
                  <p className="text-sm text-purple-600">{cat.care}</p>
                </div>
                <Link href={cat.href}>
                  <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-white hover:from-purple-700 hover:to-pink-700">
                    Koleksiyonu Keşfet <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
