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
    image: "https://images.unsplash.com/photo-1590080876351-941da357a4e4?w=600&h=400&fit=crop",
    href: "/koleksiyonlar/jersey",
    features: ["Esnek ve rahat", "Kolay sarilir", "Burusma yapmaz", "Gun boyu konfor"],
    description: "Jersey kumas, ozellikle gunluk kullanim icin ideal bir tercih. Esnek yapisi sayesinde kolayca sarilir ve gun boyu yerinden kaymaz. Dogal dokusuyla cildi tahris etmez, nefes alabilir yapidadir.",
    care: "30 derecede camesir makinesinde yikanabilir. Kurutma makinesi dusuk isida kullanilabilir. Utuye gerek yoktur.",
  },
  {
    name: "Sifon",
    image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=600&h=400&fit=crop",
    href: "/koleksiyonlar/sifon",
    features: ["Hafif ve seffaf", "Zarif dokusu", "Sik gorunum", "Ozel gunler icin ideal"],
    description: "Sifon kumas, hafif ve havadar yapisiyla ozellikle ilkbahar-yaz aylarinda tercih edilen bir esarp kumasidir. Yumusak akiskanligiyla zarafet katar, ozel gun ve davetlerde sikliginizin tamamlayicisidir.",
    care: "Elde yikama onerilir. Iliman suya az miktarda deterjan ekleyin. Golgede kurutun. Dusuk isida utuleyin.",
  },
  {
    name: "Dokuma",
    image: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=600&h=400&fit=crop",
    href: "/koleksiyonlar/dokuma",
    features: ["Zengin doku", "Sicak tutar", "Dayanikli", "Dogal gorunum"],
    description: "Dokuma sallar, geleneksel el dokuma tekniklerinden ilham alan zengin desenleriyle one cikar. Kaliteli ipliklerle uretilen bu sallar, hem sicak tutar hem de kombinlerinize karakter katar.",
    care: "Kuru temizleme onerilir. Ev yikamasinda elde, soguk suyla nazikce yikayin. Duz zeminde golgede kurutun.",
  },
  {
    name: "Saten",
    image: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&h=400&fit=crop",
    href: "/koleksiyonlar/saten",
    features: ["Ipeksi parlaklk", "Lux his", "Kaygan yuzey", "Premium gorunum"],
    description: "Saten kumas, ipeksi parlakligi ve yumusak dokusuyla premium bir his sunar. Ozel dikis teknikleriyle islenen saten esarplar, her kombini bir ust seviyeye tasir. Isik altinda zarif bir pariltiya sahiptir.",
    care: "Elde yikama onerilir. Ters cevirip dusuk isida utuleyin. Dogrudan guneslikte kurutmayin.",
  },
];

export default function KumasRehberi() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl">
            Kumas Rehberi
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-lg text-white/80">
            Dogru kumasi secmek icin bilmeniz gereken her sey
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
                    <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-purple-600">Bakim Onerisi</h4>
                    <p className="text-sm text-gray-600">{fabric.care}</p>
                  </div>
                  <Link href={fabric.href}>
                    <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-white hover:from-purple-700 hover:to-pink-700">
                      {fabric.name} Koleksiyonunu Incele
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
