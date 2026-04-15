"use client";

import { useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Package, Ruler, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import RecentlyViewed, { trackView } from "@/components/RecentlyViewed";
import PageTransition from "@/components/PageTransition";
import { getProductById, getSimilarProducts, handleWhatsAppOrder } from "@/lib/products";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);
  const product = getProductById(id);

  useEffect(() => {
    if (product) trackView(product.id);
  }, [product]);

  if (!product) return notFound();

  const similar = getSimilarProducts(product, 4);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <Breadcrumb
          items={[
            { label: "Ürünler", href: "/yeni-gelenler" },
            { label: product.brand, href: `/marka/${product.brand.toLowerCase()}` },
            { label: product.name },
          ]}
        />

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="grid gap-10 lg:grid-cols-2">
              <div className="relative">
                <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl bg-white">
                  <Image src={product.image} alt={product.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                      Yeni sezon
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                      <Sparkles className="h-4 w-4" /> Sınırlı üretim
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <Link href={`/marka/${product.brand.toLowerCase()}`}>
                    <span className="mb-2 inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-200">{product.brand}</span>
                  </Link>
                  <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{product.name}</h1>
                </div>

                <div className="flex items-end gap-3">
                  <span className="text-4xl font-extrabold text-purple-600">{product.price.toLocaleString("tr-TR")} TL</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">{product.oldPrice.toLocaleString("tr-TR")} TL</span>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                        %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} indirim
                      </span>
                    </>
                  )}
                </div>

                <p className="text-lg leading-relaxed text-gray-600">{product.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Package className="h-5 w-5 text-purple-500" />, label: "Malzeme", value: product.material },
                    { icon: <Ruler className="h-5 w-5 text-purple-500" />, label: "Ebat", value: product.size },
                    { icon: <Palette className="h-5 w-5 text-purple-500" />, label: "Renk", value: product.color },
                    { icon: <ShieldCheck className="h-5 w-5 text-purple-500" />, label: "Kategori", value: product.category },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                      {spec.icon}
                      <div>
                        <p className="text-xs text-gray-400">{spec.label}</p>
                        <p className="text-sm font-semibold capitalize text-gray-800">{spec.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-purple-50 p-5">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-purple-600">Bakım talimatları</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.careInstructions}</p>
                </div>

                <a href={handleWhatsAppOrder(product)} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="whatsapp-button w-full rounded-full bg-green-500 py-7 text-lg font-semibold text-white hover:bg-green-600 shadow-xl">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp ile sipariş ver
                  </Button>
                </a>

                <p className="text-center text-sm text-gray-400">
                  Ürün kodu: <span className="font-semibold">KE-{String(product.id).padStart(4, "0")}</span> &middot; 1-3 iş günü içinde kargoya verilir
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">Benzer ürünler</h2>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {similar.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            </div>
          </section>
        )}

        <RecentlyViewed excludeId={product.id} />
      </div>
    </PageTransition>
  );
}
