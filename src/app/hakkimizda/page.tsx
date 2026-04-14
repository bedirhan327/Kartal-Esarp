"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Award, Users, Leaf } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stats = [
  { number: "5000+", label: "Mutlu müşteri" },
  { number: "500+", label: "Ürün çeşidi" },
  { number: "81", label: "İllere teslimat" },
  { number: "10+", label: "Yıllık tecrübe" },
];

const values = [
  {
    icon: <Heart className="h-7 w-7" />,
    title: "Tutku ile üretim",
    desc: "Her eşarpı tasarlarken ve üretirken işten duyarak çalışıyoruz. Kalitemiz tutkumuzun yansıması.",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Kalite standardı",
    desc: "En iyi kumaşları titizlikle seçip, her adımda kalite kontrolü uyguluyoruz.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Müşteri odaklı",
    desc: "Müşterilerimizin memnuniyeti en büyük önceliğimiz. WhatsApp ile her zaman yanınızdayız.",
  },
  {
    icon: <Leaf className="h-7 w-7" />,
    title: "Sürdürülebilirlik",
    desc: "Çevre dostu üretim süreçlerine önem veriyor, sürdürülebilir moda anlayışını benimsiyoruz.",
  },
];

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex-1 text-center lg:text-left">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Biz kimiz?</h1>
              <p className="mb-4 text-lg text-white/90 leading-relaxed">
                Kartal Eşarp, Kütahya&apos;nın kalbinde 10 yılı aşkın süredir eşarp ve şal üretimi yapan, kaliteyi ve zarafeti bir araya getiren bir markadır.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Geleneksel el sanatlarından ilham alan modern tasarımlarımızla, Türkiye&apos;nin dört bir yanındaki kadınlara hizmet veriyoruz. Her ürünümüz, titiz bir
                seçim ve özenli bir işçilik sürecinden geçerek sizlere ulaşır.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-72 w-72 overflow-hidden rounded-3xl shadow-2xl md:h-96 md:w-96"
            >
              <Image src="/products/esarp-008.jpeg" alt="Kartal Eşarp atölye" fill className="object-cover" sizes="400px" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemFadeIn} className="text-center">
                <div className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text md:text-5xl">
                  {stat.number}
                </div>
                <p className="mt-2 font-medium text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Değerlerimiz</h2>
            <p className="text-gray-500">Bizi biz yapan değerler ve iş ilkelerimiz</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={itemFadeIn}
                className="rounded-2xl bg-white p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Hikayemiz</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Kartal Eşarp, 2014 yılında Kütahya&apos;da küçük bir atölyede başladığı yolculuğunda bugün Türkiye&apos;nin dört bir yanına ulaşan bir marka haline geldi.
              </p>
              <p>
                Kurucumuz, ailesinden devraldığı kumaş bilgisi ve eşarp tutkusuyla yola çıkarak, her kadının dolabında olması gereken kaliteli ve şık eşarplar üretmeyi
                hedefledi.
              </p>
              <p>
                Bugün jersey, şifon, dokuma ve saten olmak üzere farklı kumaş çeşitlerinde yüzlerce model sunuyoruz. Her sezon yenilenen koleksiyonlarımızla trendleri
                yakından takip ediyor, müşterilerimize en iyi ürünleri sunuyoruz.
              </p>
              <p>
                WhatsApp ile kolay sipariş sistemimiz sayesinde Türkiye&apos;nin neresinde olursanız olun, Kartal Eşarp kalitesine kolayca ulaşabilirsiniz.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
