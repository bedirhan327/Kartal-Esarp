"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight, MapPin, MessageCircle, Shield, Truck, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { allProducts, getNewProducts, getLimitedProducts } from "@/lib/products";
import { getWhatsAppTemplateUrl } from "@/lib/whatsapp";
import { useLocale } from "@/context/LocaleContext";
import { localizeProduct } from "@/lib/i18n/localizeProduct";
import CollectionsShowcase from "@/components/CollectionsShowcase";

/* ── animation variants ─────────────────────────────────── */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── static data (outside component to avoid re-creation) ── */
const brands = ["Zerafetim", "Vakko", "Armine", "Aker", "Vissona", "Belli"];
const allMarqueeItems = [...brands, ...brands]; // 2× for seamless -50% loop

const heroParticles = [
  { id: 0, x: 72, y: 18, size: 6,  delay: 0,   duration: 4.2 },
  { id: 1, x: 85, y: 44, size: 9,  delay: 0.8, duration: 3.8 },
  { id: 2, x: 64, y: 70, size: 5,  delay: 1.5, duration: 5.1 },
  { id: 3, x: 78, y: 30, size: 7,  delay: 0.3, duration: 4.5 },
  { id: 4, x: 91, y: 60, size: 4,  delay: 2.1, duration: 3.6 },
  { id: 5, x: 67, y: 85, size: 6,  delay: 1.2, duration: 4.8 },
  { id: 6, x: 81, y: 14, size: 5,  delay: 0.6, duration: 5.3 },
  { id: 7, x: 74, y: 54, size: 8,  delay: 1.8, duration: 3.9 },
];

const limitedStars = [
  { id: 0, x:  9, y: 22, delay: 0.0 },
  { id: 1, x: 88, y: 14, delay: 0.6 },
  { id: 2, x: 14, y: 74, delay: 1.1 },
  { id: 3, x: 91, y: 68, delay: 1.6 },
  { id: 4, x: 50, y:  8, delay: 0.9 },
  { id: 5, x: 48, y: 92, delay: 1.4 },
];


/* ── main page ──────────────────────────────────────────── */
export default function Home() {
  const { locale, t } = useLocale();
  const priceLocale = locale === "en" ? "en-US" : "tr-TR";

  /* scroll hooks */
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX       = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroImageY   = useTransform(scrollY, [0, 700], [0, 90]);

  const homeCategories = useMemo(
    () => [
      { num: "01", title: t.home.catIpek,    desc: t.home.catIpekDesc,    href: "/yeni-gelenler",                     image: "https://static.ticimax.cloud/cdn-cgi/image/width=0,quality=99,format=webp/73131/uploads/urunresimleri/buyuk/laleler-desen-ipek-twill-esarp--a380-.jpg" },
      { num: "02", title: t.home.catSal,     desc: t.home.catSalDesc,     href: "/koleksiyonlar/ipek-esarp",     image: "/products/esarp-031.jpeg" },
      { num: "03", title: t.home.catDesenli, desc: t.home.catDesenliDesc, href: "/koleksiyonlar/sinirli-uretim", image: "/products/esarp-073.jpeg" },
      { num: "04", title: t.home.catGeo,     desc: t.home.catGeoDesc,     href: "/koleksiyonlar/lux",            image: "/products/esarp-074.jpeg" },
    ],
    [t],
  );

  const bestSellers = useMemo(
    () =>
      [18, 23, 2, 43, 26, 9]
        .map((id) => allProducts.find((p) => p.id === id))
        .filter(Boolean) as (typeof allProducts)[number][],
    [],
  );

  const newArrivals   = getNewProducts().slice(0, 4);
  const limitedEdition = getLimitedProducts().slice(0, 3);

  const features = useMemo(
    () => [
      { icon: <Truck        className="h-6 w-6" />, title: t.home.featShip,    desc: t.home.featShipDesc    },
      { icon: <MapPin       className="h-6 w-6" />, title: t.home.featAddr,    desc: t.home.featAddrDesc    },
      { icon: <MessageCircle className="h-6 w-6" />, title: t.home.featWa,    desc: t.home.featWaDesc      },
      { icon: <Shield       className="h-6 w-6" />, title: t.home.featQuality, desc: t.home.featQualityDesc },
    ],
    [t],
  );

  return (
    <div className="flex flex-col">

      {/* ── Scroll progress bar ─────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative h-[85vh] w-full overflow-hidden md:h-[92vh]">

        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-[1.15] origin-center"
          style={{ y: heroImageY }}
        >
          <Image
            src="/products/esarp-102.jpeg"
            alt="Kartal Eşarp"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>

        {/* Floating particles (right side only, away from text) */}
        {heroParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/50 backdrop-blur-sm pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -22, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Text content */}
        <div className="relative container mx-auto flex h-full items-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              {t.home.heroBadge}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl"
            >
              {t.home.heroTitle1}
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {t.home.heroTitle2}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {t.home.heroDesc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/yeni-gelenler">
                <Button size="lg" className="rounded-full bg-white px-8 py-6 text-base font-bold text-gray-900 shadow-2xl hover:bg-gray-100">
                  {t.home.ctaDiscover}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/koleksiyonlar/sinirli-uretim">
                <Button size="lg" className="rounded-full border-2 border-white/40 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                  {t.home.ctaLimited}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator (mouse icon) */}
        <motion.div
          className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1">
            <motion.div
              className="h-2 w-1.5 rounded-full bg-white/70"
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Brand marquee ───────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-5 overflow-hidden animate-marquee-wrap">
        <div className="animate-marquee">
          {allMarqueeItems.map((brand, i) => (
            <span key={`${brand}-${i}`} className="inline-flex items-center shrink-0">
              <Link
                href={`/marka/${brand.toLowerCase()}`}
                className="mx-8 text-xl font-bold tracking-widest text-gray-200 transition-colors duration-300 hover:text-purple-500"
              >
                {brand}
              </Link>
              <span className="text-gray-100 select-none pointer-events-none">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── Collections ─────────────────────────────────── */}
      <CollectionsShowcase
        collections={homeCategories}
        label={t.home.collectionsLabel}
        title={t.home.collectionsTitle}
      />

      {/* ── Best sellers ────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="container mx-auto px-4">
          <div className="mb-14 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-purple-500">{t.home.bestsellersLabel}</span>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t.home.bestsellersTitle}</h2>
            </div>
            <Link href="/yeni-gelenler">
              <Button variant="outline" className="rounded-full border-2 border-gray-300 px-6 text-gray-700 hover:border-purple-500 hover:text-purple-600">
                {t.home.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section className="bg-white py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemFadeIn}
                whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(168,85,247,0.18)" }}
                className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-all duration-300 cursor-default"
              >
                <motion.div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600"
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  {feature.icon}
                </motion.div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── New arrivals ────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="mb-14 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-pink-500">{t.home.newLabel}</span>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{t.home.newTitle}</h2>
              </div>
              <Link href="/yeni-gelenler">
                <Button variant="outline" className="rounded-full border-2 border-gray-300 px-6 text-gray-700 hover:border-pink-500 hover:text-pink-600">
                  {t.home.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {newArrivals.map((product, i) => {
              const d = localizeProduct(product, locale);
              const shortName = d.name
                .replace(`${product.brand} `, "")
                .replace(/Twill (İpek )?Esarp - /i, "")
                .replace(/Twill Esarp - /i, "");
              return (
                <Link key={product.id} href={`/urun/${product.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md">
                      <Image src={product.image} alt={d.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white">
                        {t.productCard.new}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-xs text-white/80">{product.brand}</p>
                        <p className="text-sm font-bold text-white">{product.price.toLocaleString(priceLocale)} TL</p>
                      </div>
                    </div>
                    <div className="mt-3 px-1">
                      <p className="text-xs text-gray-400">{product.brand}</p>
                      <p className="truncate text-sm font-semibold text-gray-800">{shortName}</p>
                      <p className="text-sm font-bold text-purple-600">{product.price.toLocaleString(priceLocale)} TL</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Limited edition CTA ─────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/products/esarp-097.jpeg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Animated color spotlight */}
        <motion.div
          className="absolute inset-0 opacity-25 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.7) 0%, transparent 55%)",
              "radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.7) 0%, transparent 55%)",
              "radial-gradient(ellipse at 50% 15%, rgba(168,85,247,0.7) 0%, transparent 55%)",
              "radial-gradient(ellipse at 20% 50%, rgba(168,85,247,0.7) 0%, transparent 55%)",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating sparkle stars */}
        {limitedStars.map((s) => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            animate={{ y: [-6, -22, -6], opacity: [0.3, 0.9, 0.3], rotate: [0, 180, 360] }}
            transition={{ duration: 3 + s.delay, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-5 w-5 text-amber-300/80" />
          </motion.div>
        ))}

        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <motion.span
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-5 py-2 text-sm font-bold text-amber-300 backdrop-blur-sm"
              animate={{ boxShadow: ["0 0 0px rgba(251,191,36,0)", "0 0 22px rgba(251,191,36,0.4)", "0 0 0px rgba(251,191,36,0)"] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            >
              <Star className="h-4 w-4 fill-amber-300" /> {t.home.limBadge}
            </motion.span>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              {t.home.limTitle}
              <br />
              {t.home.limTitle2}
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">{t.home.limDesc}</p>
            <Link href="/koleksiyonlar/sinirli-uretim">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Button size="lg" className="rounded-full bg-white px-10 py-6 text-base font-bold text-gray-900 shadow-2xl hover:bg-gray-100">
                  {t.home.limCta}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Limited edition products ─────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {limitedEdition.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WhatsApp CTA ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mx-auto max-w-2xl text-center">
            <motion.div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg"
              animate={{ boxShadow: ["0 10px 30px rgba(34,197,94,0.3)", "0 10px 50px rgba(34,197,94,0.55)", "0 10px 30px rgba(34,197,94,0.3)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{t.home.ctaTitle}</h2>
            <p className="mb-8 text-lg text-gray-600">{t.home.ctaDesc}</p>
            <a href={getWhatsAppTemplateUrl("question")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="whatsapp-button rounded-full bg-green-500 px-10 py-6 text-base font-bold text-white shadow-xl hover:bg-green-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t.home.ctaButton}
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
