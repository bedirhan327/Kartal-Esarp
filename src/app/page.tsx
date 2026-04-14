"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, MessageCircle, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/lib/products";

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
  { name: "Jersey Sallar", href: "/koleksiyonlar/jersey", image: "https://images.unsplash.com/photo-1590080876351-941da357a4e4?w=400&h=400&fit=crop" },
  { name: "Sifon Esarplar", href: "/koleksiyonlar/sifon", image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?w=400&h=400&fit=crop" },
  { name: "Dokuma Serisi", href: "/koleksiyonlar/dokuma", image: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?w=400&h=400&fit=crop" },
  { name: "Saten Esarplar", href: "/koleksiyonlar/saten", image: "https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=400&h=400&fit=crop" },
];

const featuredProducts = allProducts.slice(0, 6);

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden md:h-[90vh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=1920&h=1080&fit=crop"
            alt="Kartal Esarp Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-900/60 to-pink-900/40" />
        </div>
        <div className="relative container mx-auto flex h-full items-center px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
            >
              2026 Yeni Sezon Koleksiyonu
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 text-5xl font-extrabold leading-tight text-white drop-shadow-lg md:text-7xl"
            >
              Zarafetin Yeni Adresi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-8 max-w-lg text-lg text-white/90 md:text-xl"
            >
              Premium kumaslar, ozenli iscilik. Kutahya&apos;dan Turkiye&apos;nin dort bir yanina benzersiz esarp ve sal koleksiyonu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/yeni-gelenler">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg text-white hover:from-purple-700 hover:to-pink-700 shadow-xl">
                  Yeni Gelenleri Kesfet
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/koleksiyonlar/sinirli-uretim">
                <Button size="lg" className="rounded-full border-2 border-white bg-white/15 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/25">
                  Sinirli Uretim
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: <Truck className="h-7 w-7" />, title: "Hizli Gonderim", desc: "Siparisleriniz 1-3 is gunu icerisinde kargoya verilir" },
              { icon: <MapPin className="h-7 w-7" />, title: "Kutahya Merkez", desc: "Tum urunler Kutahya merkezimizden ozenle paketlenir" },
              { icon: <MessageCircle className="h-7 w-7" />, title: "WhatsApp Siparis", desc: "Tek tikla WhatsApp uzerinden kolay ve hizli siparis" },
              { icon: <Shield className="h-7 w-7" />, title: "Kalite Garantisi", desc: "Premium kumaslar ve dikkatli iscilik garantisi" },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemFadeIn} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                  {feature.icon}
                </div>
                <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Brands */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-14">
        <div className="container mx-auto px-4">
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">Sattigimiz Markalar</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {["Vakko", "Armine", "Aker", "Vissona", "Belli", "Zerafetim"].map((brand) => (
              <span key={brand} className="text-xl font-bold tracking-wide text-gray-300 transition-colors hover:text-purple-500 md:text-2xl">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Kategoriler</h2>
            <p className="text-gray-500">Tarzi ve zevkinize uygun koleksiyonu kesfet</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href}>
                <motion.div variants={itemFadeIn} whileHover={{ scale: 1.05 }} className="group cursor-pointer">
                  <div className="relative mb-4 aspect-square overflow-hidden rounded-full shadow-lg ring-4 ring-white">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <h3 className="text-center font-semibold text-gray-800">{cat.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products */}
      <section className="bg-white py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">One Cikan Urunler</h2>
            <p className="text-gray-500">En cok begenilen esarp ve sallarimiz</p>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Link href="/yeni-gelenler">
              <Button size="lg" variant="outline" className="rounded-full border-2 border-purple-600 px-8 text-purple-600 hover:bg-purple-50">
                Tum Urunleri Gor
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ozel Koleksiyonu Kacirmayin</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
              Sinirli sayida uretilen ozel tasarim esarplarimiz tukenmeden siparisinizi olusturun. WhatsApp ile aninda iletisime gecin.
            </p>
            <Link href="/koleksiyonlar/sinirli-uretim">
              <Button size="lg" className="rounded-full bg-white px-8 py-6 text-lg font-semibold text-purple-600 hover:bg-gray-100 shadow-xl">
                Sinirli Uretim Koleksiyonu
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
