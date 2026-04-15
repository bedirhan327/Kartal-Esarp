"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Award, Users, Leaf } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

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

export default function Hakkimizda() {
  const { t } = useLocale();

  const stats = [
    { number: "5000+", label: t.hakkimizda.statsHappy },
    { number: "500+", label: t.hakkimizda.statsSku },
    { number: "81", label: t.hakkimizda.statsShip },
    { number: "10+", label: t.hakkimizda.statsYears },
  ];

  const values = [
    { icon: <Heart className="h-7 w-7" />, title: t.hakkimizda.v1t, desc: t.hakkimizda.v1d },
    { icon: <Award className="h-7 w-7" />, title: t.hakkimizda.v2t, desc: t.hakkimizda.v2d },
    { icon: <Users className="h-7 w-7" />, title: t.hakkimizda.v3t, desc: t.hakkimizda.v3d },
    { icon: <Leaf className="h-7 w-7" />, title: t.hakkimizda.v4t, desc: t.hakkimizda.v4d },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex-1 text-center lg:text-left">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">{t.hakkimizda.heroTitle}</h1>
              <p className="mb-4 text-lg leading-relaxed text-white/90">{t.hakkimizda.heroP1}</p>
              <p className="text-lg leading-relaxed text-white/80">{t.hakkimizda.heroP2}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-72 w-72 overflow-hidden rounded-3xl shadow-2xl md:h-96 md:w-96"
            >
              <Image src="/products/esarp-008.jpeg" alt={t.hakkimizda.workshopAlt} fill className="object-cover" sizes="400px" />
            </motion.div>
          </div>
        </div>
      </section>

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
                <div className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text md:text-5xl">{stat.number}</div>
                <p className="mt-2 font-medium text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">{t.hakkimizda.valuesTitle}</h2>
            <p className="text-gray-500">{t.hakkimizda.valuesSubtitle}</p>
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
                className="rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">{v.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">{t.hakkimizda.storyTitle}</h2>
            <div className="space-y-4 leading-relaxed text-gray-600">
              <p>{t.hakkimizda.s1}</p>
              <p>{t.hakkimizda.s2}</p>
              <p>{t.hakkimizda.s3}</p>
              <p>{t.hakkimizda.s4}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
