"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, MessageCircle, Shield, Truck, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { allProducts, getNewProducts, getLimitedProducts } from "@/lib/products";

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

const categories = [
  { name: "İpek Eşarplar", href: "/koleksiyonlar/ipek-esarp", image: "/products/esarp-032.jpeg", desc: "Saf ipek zarafet" },
  { name: "Şallar", href: "/koleksiyonlar/sal", image: "/products/esarp-082.jpeg", desc: "Her mevsim sıcaklık" },
  { name: "Desenli Eşarplar", href: "/koleksiyonlar/desenli", image: "/products/esarp-102.jpeg", desc: "Çiçekli & botanik" },
  { name: "Geometrik Eşarplar", href: "/koleksiyonlar/geometrik", image: "/products/esarp-100.jpeg", desc: "Modern çizgiler" },
];

const brands = ["Vakko", "Armine", "Aker", "Vissona", "Belli", "Zerafetim"];

const bestSellers = [
  allProducts.find((p) => p.id === 18),
  allProducts.find((p) => p.id === 23),
  allProducts.find((p) => p.id === 2),
  allProducts.find((p) => p.id === 43),
  allProducts.find((p) => p.id === 26),
  allProducts.find((p) => p.id === 9),
].filter(Boolean) as (typeof allProducts)[number][];

const newArrivals = getNewProducts().slice(0, 4);
const limitedEdition = getLimitedProducts().slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative h-[85vh] w-full overflow-hidden md:h-[92vh]">
        <div className="absolute inset-0">
          <Image
            src="/products/esarp-102.jpeg"
            alt="Kartal Eşarp - Premium Eşarp Koleksiyonu"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative container mx-auto flex h-full items-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              2026 Yeni Sezon Koleksiyonu
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl"
            >
              Zarafetin
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Yeni Adresi</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-white/80 md:text-xl"
            >
              Premium kumaşlar, özenli işçilik. Kütahya&apos;dan Türkiye&apos;nin dört bir yanına benzersiz eşarp ve şal koleksiyonu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/yeni-gelenler">
                <Button size="lg" className="rounded-full bg-white px-8 py-6 text-base font-bold text-gray-900 shadow-2xl hover:bg-gray-100">
                  Koleksiyonu Keşfet
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/koleksiyonlar/sinirli-uretim">
                <Button size="lg" className="rounded-full border-2 border-white/40 bg-white/10 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                  Sınırlı Üretim
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── BRANDS MARQUEE ─── */}
      <section className="border-b border-gray-100 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10 md:gap-16">
            {brands.map((brand) => (
              <Link key={brand} href={`/marka/${brand.toLowerCase()}`} className="whitespace-nowrap text-lg font-bold tracking-widest text-gray-200 transition-colors duration-300 hover:text-purple-500 md:text-xl">
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="bg-white py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-purple-500">Koleksiyonlar</span>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Tarzınıza Uygun Kategoriyi Keşfedin</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href}>
                <motion.div variants={itemFadeIn} whileHover={{ y: -8 }} className="group cursor-pointer">
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-medium uppercase tracking-wider text-white/70">{cat.desc}</p>
                      <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── BEST SELLERS ─── */}
      <section className="bg-gray-50 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="container mx-auto px-4">
          <div className="mb-14 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-purple-500">En Çok Satanlar</span>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Müşterilerimizin Favorileri</h2>
            </div>
            <Link href="/yeni-gelenler">
              <Button variant="outline" className="rounded-full border-2 border-gray-300 px-6 text-gray-700 hover:border-purple-500 hover:text-purple-600">
                Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* ─── FEATURES ─── */}
      <section className="bg-white py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: <Truck className="h-6 w-6" />, title: "Hızlı Gönderim", desc: "1-3 iş günü içinde kargoda" },
              { icon: <MapPin className="h-6 w-6" />, title: "Kütahya Merkez", desc: "Özenle paketlenir ve gönderilir" },
              { icon: <MessageCircle className="h-6 w-6" />, title: "WhatsApp Sipariş", desc: "Tek tıkla kolay ve hızlı sipariş" },
              { icon: <Shield className="h-6 w-6" />, title: "Kalite Garantisi", desc: "Premium kumaş ve işçilik" },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemFadeIn} className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-6 transition-shadow hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── NEW ARRIVALS HIGHLIGHT ─── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="mb-14 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <span className="mb-2 inline-block text-sm font-bold uppercase tracking-widest text-pink-500">Yeni Gelenler</span>
                <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Son Eklenen Modeller</h2>
              </div>
              <Link href="/yeni-gelenler">
                <Button variant="outline" className="rounded-full border-2 border-gray-300 px-6 text-gray-700 hover:border-pink-500 hover:text-pink-600">
                  Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {newArrivals.map((product, i) => (
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
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white">
                      YENİ
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-xs text-white/80">{product.brand}</p>
                      <p className="text-sm font-bold text-white">{product.price.toLocaleString("tr-TR")} TL</p>
                    </div>
                  </div>
                  <div className="mt-3 px-1">
                    <p className="text-xs text-gray-400">{product.brand}</p>
                    <p className="truncate text-sm font-semibold text-gray-800">{product.name.replace(`${product.brand} `, "").replace("Twill İpek Esarp - ", "").replace("Twill Esarp - ", "")}</p>
                    <p className="text-sm font-bold text-purple-600">{product.price.toLocaleString("tr-TR")} TL</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANNER - LIMITED EDITION ─── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0">
          <Image
            src="/products/esarp-097.jpeg"
            alt="Sınırlı Üretim Koleksiyonu"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 px-5 py-2 text-sm font-bold text-amber-300 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-amber-300" /> Sınırlı Üretim
            </span>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Benzersiz Tasarımlar,<br />Sınırlı Sayıda</h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-white/70">
              Her biri özel olarak tasarlanan sınırlı üretim eşarplarımız tükenmeden koleksiyonunuza ekleyin.
            </p>
            <Link href="/koleksiyonlar/sinirli-uretim">
              <Button size="lg" className="rounded-full bg-white px-10 py-6 text-base font-bold text-gray-900 shadow-2xl hover:bg-gray-100">
                Sınırlı Koleksiyonu Gör
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── LIMITED PRODUCTS ROW ─── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {limitedEdition.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA / WHATSAPP ─── */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Sipariş Vermek Çok Kolay</h2>
            <p className="mb-8 text-lg text-gray-600">
              Beğendiğiniz ürünü WhatsApp üzerinden tek tıkla sipariş edin. Hızlı yanıt, güvenli alışveriş.
            </p>
            <a href="https://wa.me/905542400764" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="whatsapp-button rounded-full bg-green-500 px-10 py-6 text-base font-bold text-white shadow-xl hover:bg-green-600">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp ile İletişime Geç
              </Button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
