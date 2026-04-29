"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Breadcrumb from "@/components/Breadcrumb";
import PageTransition from "@/components/PageTransition";
import { getProductsByCategory, getProductsBySubCategory, getLimitedProducts, allProducts } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";

interface CollectionMeta {
  image: string;
  category?: string;
  subCategory?: string;
  isLimited?: boolean;
  brands?: string[];
}

const collectionMeta: Record<string, CollectionMeta> = {
  "sinirli-uretim": {
    image: "/products/esarp-097.jpeg",
    isLimited: true,
  },
  "ipek-esarp": {
    image: "/products/esarp-032.jpeg",
    category: "ipek-esarp",
  },
  sal: {
    image: "/products/esarp-082.jpeg",
    category: "sal",
  },
  desenli: {
    image: "/products/esarp-102.jpeg",
    category: "desenli",
  },
  geometrik: {
    image: "/products/esarp-100.jpeg",
    category: "geometrik",
  },
  lux: {
    image: "/products/esarp-073.jpeg",
    brands: ["Vakko", "Armine"],
  },
  "esarp-twill-ipek": {
    image: "/products/esarp-032.jpeg",
    subCategory: "twill-ipek",
  },
  "esarp-yun-ipek": {
    image: "/products/esarp-099.jpeg",
    subCategory: "yun-ipek",
  },
  "esarp-pamuklu-ipek": {
    image: "/products/esarp-091.jpeg",
    subCategory: "pamuklu-ipek",
  },
  "esarp-viskon": {
    image: "/products/esarp-035.jpeg",
    subCategory: "viskon",
  },
  "esarp-cocuk": {
    image: "/products/esarp-085.jpeg",
    subCategory: "twill-cocuk-esarp",
  },
  "esarp-bandana": {
    image: "/products/esarp-036.jpeg",
    subCategory: "bandana",
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function CollectionPage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = params.slug as string;
  const meta = collectionMeta[slug];

  if (!meta) return notFound();

  const copy = (t.collections as unknown as Record<string, { title: string; description: string; long: string }>)[slug];
  if (!copy) return notFound();

  let products = meta.isLimited
    ? getLimitedProducts()
    : meta.brands
      ? allProducts.filter((p) => meta.brands!.includes(p.brand))
      : meta.subCategory
        ? getProductsBySubCategory(meta.subCategory)
        : meta.category
          ? getProductsByCategory(meta.category)
          : allProducts;

  if (products.length === 0) {
    products = allProducts.slice(0, 4);
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <Breadcrumb items={[{ label: t.collections.breadcrumb, href: "/yeni-gelenler" }, { label: copy.title }]} />
        <section className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
          <Image src={meta.image} alt={copy.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/50" />
          <div className="relative container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-6xl">
              {copy.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-2xl text-lg text-white/80"
            >
              {copy.description}
            </motion.p>
          </div>
        </section>

        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl text-center leading-relaxed text-gray-600"
            >
              {copy.long}
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <ProductFilters products={products}>
              {(filtered) => (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </ProductFilters>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
