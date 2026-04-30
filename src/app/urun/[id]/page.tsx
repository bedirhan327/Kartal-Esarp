"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Package, Ruler, Palette, ShieldCheck, Sparkles, Heart, AlertTriangle, X, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import RecentlyViewed, { trackView } from "@/components/RecentlyViewed";
import PageTransition from "@/components/PageTransition";
import { getProductById, getSimilarProducts, handleWhatsAppOrder } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";
import { useWishlist } from "@/context/WishlistContext";
import { localizeProduct, categoryLabel } from "@/lib/i18n/localizeProduct";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function ProductDetail() {
  const { locale, t } = useLocale();
  const { toggle: toggleWishlist, has: inWishlist } = useWishlist();
  const params = useParams();
  const id = Number(params.id);
  const product = getProductById(id);
  const display = useMemo(() => (product ? localizeProduct(product, locale) : null), [product, locale]);
  const priceLocale = locale === "en" ? "en-US" : "tr-TR";

  useEffect(() => {
    if (product) trackView(product.id);
  }, [product]);

  if (!product || !display) return notFound();

  const similar = getSimilarProducts(product, 4);
  const brandSlug = encodeURIComponent(product.brand.toLowerCase());
  const isFav = inWishlist(product.id);

  const allImages = useMemo(
    () => (product.images && product.images.length > 1 ? product.images : [product.image]),
    [product],
  );
  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (img: string) => {
    const idx = allImages.indexOf(img);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  const lightboxPrev = () => setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const lightboxNext = () => setLightboxIndex((i) => (i + 1) % allImages.length);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
        <Breadcrumb
          items={[
            { label: t.productDetail.products, href: "/yeni-gelenler" },
            { label: product.brand, href: `/marka/${brandSlug}` },
            { label: display.name },
          ]}
        />

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                {/* Main image */}
                <button
                  type="button"
                  onClick={() => openLightbox(activeImage)}
                  className="relative aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-2xl cursor-zoom-in"
                >
                  <Image src={activeImage} alt={display.name} fill priority className="object-cover transition-opacity duration-300" sizes="(max-width: 1024px) 100vw, 50vw" />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                      {t.productDetail.newBadge}
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                      <Sparkles className="h-4 w-4" /> {t.productDetail.limitedBadge}
                    </span>
                  )}
                </button>
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-3">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                          activeImage === img
                            ? "border-purple-500 shadow-md shadow-purple-200"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`${display.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <Link href={`/marka/${brandSlug}`}>
                    <span className="mb-2 inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-200">
                      {product.brand}
                    </span>
                  </Link>
                  <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{display.name}</h1>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-extrabold text-purple-600">{display.price.toLocaleString(priceLocale)} TL</span>
                  {product.oldPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">{product.oldPrice.toLocaleString(priceLocale)} TL</span>
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-bold text-red-600">
                        %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)} {t.productDetail.discount}
                      </span>
                    </>
                  )}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 1.3 }}
                    onClick={() => toggleWishlist(product.id)}
                    className={`ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      isFav
                        ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:text-pink-500"
                    }`}
                    title={isFav ? t.wishlist.remove : t.wishlist.add}
                  >
                    <Heart className={`h-4 w-4 ${isFav ? "fill-white" : ""}`} />
                    {isFav ? t.wishlist.remove : t.wishlist.add}
                  </motion.button>
                </div>

                {product.stock !== undefined && product.stock <= 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5"
                  >
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-sm font-semibold text-red-600">
                      {t.stock.low.replace("{n}", String(product.stock))}
                    </span>
                  </motion.div>
                )}

                <p className="text-lg leading-relaxed text-gray-600">{display.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Package className="h-5 w-5 text-purple-500" />, label: t.productDetail.material, value: display.material },
                    { icon: <Ruler className="h-5 w-5 text-purple-500" />, label: t.productDetail.size, value: product.size },
                    { icon: <Palette className="h-5 w-5 text-purple-500" />, label: t.productDetail.color, value: display.color },
                    {
                      icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
                      label: t.productDetail.category,
                      value: categoryLabel(product.category, locale),
                    },
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
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-purple-600">{t.productDetail.careTitle}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{display.careInstructions}</p>
                </div>

                <a href={handleWhatsAppOrder(product)} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="whatsapp-button w-full rounded-full bg-green-500 py-7 text-lg font-semibold text-white shadow-xl hover:bg-green-600">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {t.productDetail.whatsappOrder}
                  </Button>
                </a>

                <p className="text-center text-sm text-gray-400">
                  {t.productDetail.productCode}: <span className="font-semibold">KE-{String(product.id).padStart(4, "0")}</span> &middot; {t.productDetail.shipsIn}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {similar.length > 0 && (
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">{t.productDetail.similar}</h2>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                {similar.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            </div>
          </section>
        )}

        <RecentlyViewed excludeId={product.id} />

        {/* ── Lightbox ──────────────────────────────── */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[500] flex items-center justify-center bg-black/92 backdrop-blur-sm"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
              >
                <X className="h-5 w-5" />
              </button>

              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
                  className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative h-[85vh] w-[85vw] max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={allImages[lightboxIndex]}
                  alt={display.name}
                  fill
                  className="object-contain"
                  sizes="85vw"
                />
              </motion.div>

              {allImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
                  className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}

              {allImages.length > 1 && (
                <div className="absolute bottom-6 flex gap-2">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                      className={`h-2 rounded-full transition-all ${i === lightboxIndex ? "w-6 bg-white" : "w-2 bg-white/40"}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
