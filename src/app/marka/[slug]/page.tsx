"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByBrand } from "@/lib/products";

const brandInfo: Record<string, { name: string; description: string }> = {
  vakko: {
    name: "Vakko",
    description: "Türkiye'nin köklü moda markası Vakko'nun %100 ipek twill eşarp koleksiyonu. Zamansız desenler, üstün kalite.",
  },
  armine: {
    name: "Armine",
    description: "Armine'nin tivil ipek ve sura ipek eşarp koleksiyonu. Zarif motifler, geniş renk yelpazesi.",
  },
  aker: {
    name: "Aker",
    description: "Aker'in twill ipek eşarp koleksiyonu. Modern tasarımlar, uygun fiyatlarla premium kalite.",
  },
  vissona: {
    name: "Vissona",
    description: "Vissona'nın twill ipek eşarp ve medine ipeği şal koleksiyonu. Soyut desenler, şehir silüetleri.",
  },
  belli: {
    name: "Belli",
    description: "Belli'nin saf ipek eşarp ve fresh şal koleksiyonu. Vintage motifler, uygun fiyatlar.",
  },
  zerafetim: {
    name: "Zerafetim",
    description: "Zerafetim'in couture twill ipek eşarp koleksiyonu. Botanik, tropikal ve pop art desenler.",
  },
  premium: {
    name: "Premium",
    description: "Dünya'nın en prestijli markalarından seçilmiş lüks ipek eşarplar. Monogram, ekose ve floral desenler.",
  },
  "kartal esarp": {
    name: "Kartal Esarp",
    description: "Kartal Eşarp özel tasarım koleksiyonu. Zarafetin yeni adresi.",
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function BrandPage() {
  const params = useParams();
  const slug = (params.slug as string).toLowerCase();

  const info = brandInfo[slug];
  if (!info) return notFound();

  const products = getProductsByBrand(info.name);

  if (products.length === 0) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-6xl">
            {info.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            {info.description}
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 text-sm text-white/60">
            {products.length} ürün
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
