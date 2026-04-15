"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const blocks = [
  { key: "ipek" as const, href: "/koleksiyonlar/ipek-esarp", image: "/products/esarp-032.jpeg" },
  { key: "sal" as const, href: "/koleksiyonlar/sal", image: "/products/esarp-082.jpeg" },
  { key: "desenli" as const, href: "/koleksiyonlar/desenli", image: "/products/esarp-102.jpeg" },
  { key: "geo" as const, href: "/koleksiyonlar/geometrik", image: "/products/esarp-100.jpeg" },
];

export default function KumasRehberi() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl">
            {t.kumasRehberi.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-lg text-white/80">
            {t.kumasRehberi.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto space-y-20 px-4">
          {blocks.map((cat, i) => {
            const c = t.kumasCategories[cat.key];
            return (
              <motion.div
                key={cat.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`flex flex-col items-center gap-10 lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className="w-full lg:w-1/2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                    <Image src={cat.image} alt={c.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">{c.name}</h2>
                  <p className="mb-6 leading-relaxed text-gray-600">{c.description}</p>
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {c.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        <span className="text-sm font-medium text-gray-700">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mb-6 rounded-xl bg-purple-50 p-4">
                    <h4 className="mb-1 text-sm font-bold text-purple-700">{t.kumasRehberi.careTitle}</h4>
                    <p className="text-sm text-purple-600">{c.care}</p>
                  </div>
                  <Link href={cat.href}>
                    <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 text-white hover:from-purple-700 hover:to-pink-700">
                      {t.kumasRehberi.explore} <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
