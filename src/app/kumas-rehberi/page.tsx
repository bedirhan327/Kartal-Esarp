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

const fabrics = [
  {
    name: "Jersey",
    image: "/products/esarp-036.jpeg",
    href: "/koleksiyonlar/jersey",
    features: ["Esnek ve rahat", "Kolay sarılır", "Buruşma yapmaz", "Gün boyu konfor"],
    description:
      "Jersey kumaş, özellikle günlük kullanım için ideal bir tercih. Esnek yapısı sayesinde kolayca sarılır ve gün boyu yerinden kaymaz. Doğal dokusuyla cildi tahriş etmez, nefes alabilir yapıdadır.",
    care: "30 derecede çamaşır makinesinde yıkanabilir. Kurutma makinesi düşük ısıda kullanılabilir. Ütüye gerek yoktur.",
  },
  {
    name: "Şifon",
    image: "/products/esarp-102.jpeg",
    href: "/koleksiyonlar/sifon",
    features: ["Hafif ve şeffaf", "Zarif dokusu", "Şık görünüm", "Özel günler için ideal"],
    description:
      "Şifon kumaş, hafif ve havadar yapısıyla özellikle ilkbahar-yaz aylarında tercih edilen bir eşarp kumaşıdır. Yumuşak akışkanlığıyla zarafet katar, özel gün ve davetlerde şıklığınızın tamamlayıcısıdır.",
    care: "Elde yıkama önerilir. Ilıman suya az miktarda deterjan ekleyin. Gölgede kurutun. Düşük ısıda ütüleyin.",
  },
  {
    name: "Dokuma",
    image: "/products/esarp-031.jpeg",
    href: "/koleksiyonlar/dokuma",
    features: ["Zengin doku", "Sıcak tutar", "Dayanıklı", "Doğal görünüm"],
    description:
      "Dokuma şallar, geleneksel el dokuma tekniklerinden ilham alan zengin desenleriyle öne çıkar. Kaliteli ipliklerle üretilen bu şallar, hem sıcak tutar hem de kombinlerinize karakter katar.",
    care: "Kuru temizleme önerilir. Ev yıkamasında elde, soğuk suyla nazikçe yıkayın. Düz zeminde gölgede kurutun.",
  },
  {
    name: "Saten",
    image: "/products/esarp-025.jpeg",
    href: "/koleksiyonlar/saten",
    features: ["İpeksi parlaklık", "Lüks his", "Kaygan yüzey", "Premium görünüm"],
    description:
      "Saten kumaş, ipeksi parlaklığı ve yumuşak dokusuyla premium bir his sunar. Özel dikiş teknikleriyle işlenen saten eşarplar, her kombini bir üst seviyeye taşır. Işık altında zarif bir parıltıya sahiptir.",
    care: "Elde yıkama önerilir. Ters çevirip düşük ısıda ütüleyin. Doğrudan güneşlikte kurutmayın.",
  },
];

export default function KumasRehberi() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl">
            Kumaş rehberi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80"
          >
            Doğru kumaşı seçmek için bilmeniz gereken her şey
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {fabrics.map((fabric, i) => (
              <motion.div
                key={fabric.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-xl lg:w-1/2">
                  <Image src={fabric.image} alt={fabric.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                </div>
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">{fabric.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{fabric.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {fabric.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        <span className="text-sm font-medium text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl bg-purple-50 p-5">
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-purple-600">Bakım önerisi</h4>
                    <p className="text-sm text-gray-600">{fabric.care}</p>
                  </div>
                  <Link href={fabric.href}>
                    <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-white hover:from-purple-700 hover:to-pink-700">
                      {fabric.name} koleksiyonunu inceleyin
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
