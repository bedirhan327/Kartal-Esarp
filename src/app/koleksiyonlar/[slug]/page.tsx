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
    title: "Sınırlı üretim",
    description: "Özel tasarım, sınırlı sayıda üretilen eşarp ve şallar",
    longDescription:
      "Sınırlı üretim koleksiyonumuz, özel tasarım desenleri ve premium kumaşlarla hazırlanan benzersiz parçalardan oluşur. Her model sınırlı sayıda üretilir ve tükendikten sonra yeniden üretilmez. Bu parçalara sahip olmak, tarzınızı benzersiz kılmanın en özel yoludur.",
    image: "/products/esarp-097.jpeg",
    isLimited: true,
  },
  jersey: {
    title: "Jersey koleksiyonu",
    description: "Yumuşacık doku, gün boyu konfor",
    longDescription:
      "Jersey şallarımız, esnek ve yumuşak yapılarıyla günlük kullanımda en çok tercih edilen modellerimiz arasında. Kolay sarılır, buruşmaz ve cildi tahriş etmez. Her mevsim kullanıma uygun geniş renk yelpazemiz ile tarzınıza uygun modeli bulabilirsiniz.",
    image: "/products/esarp-003.jpeg",
    category: "jersey",
  },
  sifon: {
    title: "Şifon koleksiyonu",
    description: "Hafiflik ve zarafetin buluşma noktası",
    longDescription:
      "Şifon eşarplarımız, hafif ve havadar dokusuyla özellikle ilkbahar-yaz aylarında öne çıkar. Zarif akışkanlığıyla hem günlük hem de özel günlerde kullanılabilir. Canlı renklerden pastel tonlara kadar geniş bir seçenekle sunulur.",
    image: "/products/esarp-004.jpeg",
    category: "sifon",
  },
  dokuma: {
    title: "Dokuma koleksiyonu",
    description: "Gelenekten ilham, modern yorumlar",
    longDescription:
      "Dokuma şallarımız, geleneksel el sanatlarına yapılan bir saygıdır. Zengin desenleri ve dayanıklı yapısıyla kışlık kullanıma idealdir. Her bir parçada doğal liflerin sıcaklığı ve el işinin estetiğini hissedebilirsiniz.",
    image: "/products/esarp-006.jpeg",
    category: "dokuma",
  },
  saten: {
    title: "Saten koleksiyonu",
    description: "İpeksi his, premium görünüm",
    longDescription:
      "Saten eşarplarımız, ipeksi parlaklığı ve kaygan dokusuyla lüks bir deneyim sunar. Işık altında zarif bir parıltıya sahip olan bu modeller, özel günler ve davetler için mükemmel bir tamamlayıcı. Her kombini bir üst seviyeye taşır.",
    image: "/products/esarp-002.jpeg",
    category: "saten",
  },
  spor: {
    title: "Spor koleksiyon",
    description: "Aktif yaşam için tasarlandı",
    longDescription:
      "Spor koleksiyonumuz, aktif bir yaşam sürdürenler için tasarlandı. Nefes alan kumaşlar, pratik kesimler ve canlı renkler ile hareket halindeyken bile şıklığınızı koruyun. Yogadan yürüyüşe, alışverişten kahve molasına kadar her anınız için ideal.",
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-white/80"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center text-gray-600 leading-relaxed"
          >
            {config.longDescription}
          </motion.p>
        </div>
      </section>

      {/* Products */}
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
