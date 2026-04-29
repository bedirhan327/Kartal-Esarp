"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import Breadcrumb from "@/components/Breadcrumb";
import PageTransition from "@/components/PageTransition";
import { getProductsByBrand } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";

type BrandDescKey = "vakko" | "armine" | "aker" | "vissona" | "belli" | "zerafetim" | "premium" | "kartal";

const brandMeta: Record<string, { name: string; descKey: BrandDescKey }> = {
  vakko: { name: "Vakko", descKey: "vakko" },
  armine: { name: "Armine", descKey: "armine" },
  aker: { name: "Aker", descKey: "aker" },
  vissona: { name: "Vissona", descKey: "vissona" },
  belli: { name: "Belli", descKey: "belli" },
  zerafetim: { name: "Zerafetim", descKey: "zerafetim" },
  premium: { name: "Premium", descKey: "premium" },
  "kartal esarp": { name: "Kartal Esarp", descKey: "kartal" },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function BrandPage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = decodeURIComponent((params.slug as string).toLowerCase());

  const meta = brandMeta[slug];
  if (!meta) return notFound();

  const products = getProductsByBrand(meta.name);
  if (products.length === 0) return notFound();

  const description = t.brand[meta.descKey];
  const countLabel = t.brand.productsCount.replace("{count}", String(products.length));

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <Breadcrumb items={[{ label: t.brand.breadcrumb }, { label: meta.name }]} />
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-6xl">
              {meta.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-white/80"
            >
              {description}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 text-sm text-white/60">
              {countLabel}
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
                  className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4"
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
