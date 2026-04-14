"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getLimitedProducts, allProducts } from "@/lib/products";

interface CollectionConfig {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category?: string;
  isLimited?: boolean;
}

const collections: Record<string, CollectionConfig> = {
  "sinirli-uretim": {
    title: "Sinirli Uretim",
    description: "Ozel tasarim, sinirli sayida uretilen esarp ve sallar",
    longDescription: "Sinirli uretim koleksiyonumuz, ozel tasarim desenleri ve premium kumaslarla hazirlanan benzersiz parcalardan olusur. Her model sinirli sayida uretilir ve tukendikten sonra yeniden uretilmez. Bu parcalara sahip olmak, tarzinizi benzersiz kilmanin en ozel yoludur.",
    image: "/products/esarp-007.jpeg",
    isLimited: true,
  },
  jersey: {
    title: "Jersey Koleksiyonu",
    description: "Yumusacik doku, gun boyu konfor",
    longDescription: "Jersey sallarimiz, esnek ve yumusak yapilariyla gunluk kullanimda en cok tercih edilen modellerimiz arasinda. Kolay sarilir, burusmaz ve cildi tahris etmez. Her mevsim kullanima uygun genis renk yelpazemiz ile tarzniza uygun modeli bulabilirsiniz.",
    image: "/products/esarp-003.jpeg",
    category: "jersey",
  },
  sifon: {
    title: "Sifon Koleksiyonu",
    description: "Hafiflik ve zarafetin bulusma noktasi",
    longDescription: "Sifon esarplarimiz, hafif ve havadar dokusuyla ozellikle ilkbahar-yaz aylarinda one cikar. Zarif akiskanligiyla hem gunluk hem de ozel gunlerde kullanilabilir. Canli renklerden pastel tonlara kadar genis bir secenekle sunulur.",
    image: "/products/esarp-004.jpeg",
    category: "sifon",
  },
  dokuma: {
    title: "Dokuma Koleksiyonu",
    description: "Gelenekten ilham, modern yorumlar",
    longDescription: "Dokuma sallarimiz, geleneksel el sanatlarina yapilan bir saygidir. Zengin desenleri ve dayanikli yapisiyla kislik kullanima idealdir. Her bir parcada dogal liflerin sicakligi ve el isinin estetigini hissedebilirsiniz.",
    image: "/products/esarp-006.jpeg",
    category: "dokuma",
  },
  saten: {
    title: "Saten Koleksiyonu",
    description: "Ipeksi his, premium gorunum",
    longDescription: "Saten esarplarimiz, ipeksi parlakligi ve kaygan dokusuyla lux bir deneyim sunar. Isik altinda zarif bir pariltiya sahip olan bu modeller, ozel gunler ve davetler icin mukemmel bir tamamlayici. Her kombini bir ust seviyeye tasir.",
    image: "/products/esarp-002.jpeg",
    category: "saten",
  },
  spor: {
    title: "Spor Koleksiyon",
    description: "Aktif yasam icin tasarlandi",
    longDescription: "Spor koleksiyonumuz, aktif bir yasam surdurenler icin tasarlandi. Nefes alan kumaslar, pratik kesimler ve canli renkler ile hareket halindeyken bile sikinizi koruyun. Yogadan yuruyuse, alissveristen kahve molasina kadar her aniz icin ideal.",
    image: "/products/esarp-005.jpeg",
    category: "spor",
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const config = collections[slug];

  if (!config) return notFound();

  let products = config.isLimited
    ? getLimitedProducts()
    : config.category
      ? getProductsByCategory(config.category)
      : allProducts;

  if (products.length === 0) {
    products = allProducts.slice(0, 4);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      {/* Hero banner */}
      <section className="relative h-[40vh] w-full overflow-hidden md:h-[50vh]">
        <Image src={config.image} alt={config.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/50" />
        <div className="relative container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-6xl">
            {config.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            {config.description}
          </motion.p>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl text-center text-gray-600 leading-relaxed">
            {config.longDescription}
          </motion.p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
