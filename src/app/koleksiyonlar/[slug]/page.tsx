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
    title: "Sınırlı Üretim",
    description: "Özel tasarım, sınırlı sayıda üretilen eşarp ve şallar",
    longDescription:
      "Sınırlı üretim koleksiyonumuz, özel tasarım desenleri ve premium kumaşlarla hazırlanan benzersiz parçalardan oluşur. Her model sınırlı sayıda üretilir ve tükendikten sonra yeniden üretilmez. Bu parçalara sahip olmak, tarzınızı benzersiz kılmanın en özel yoludur.",
    image: "/products/esarp-097.jpeg",
    isLimited: true,
  },
  "ipek-esarp": {
    title: "İpek Eşarplar",
    description: "%100 ipek twill, zamansız zarafet",
    longDescription:
      "İpek eşarp koleksiyonumuz, %100 saf ipek twill kumaştan üretilen 90x90 cm kare eşarplardan oluşur. İpek kumaşın doğal parlaklığı ve yumuşak dokusu, her kombini bir üst seviyeye taşır. Vakko, Armine, Aker, Belli ve Zerafetim gibi premium markalardan seçtiğimiz modeller, hem günlük hem de özel günlerde kullanıma uygundur.",
    image: "/products/esarp-032.jpeg",
    category: "ipek-esarp",
  },
  sal: {
    title: "Şallar",
    description: "Uzun boy, her mevsim kullanıma uygun",
    longDescription:
      "Şal koleksiyonumuz; viskon, medine ipeği, pamuk-ipek karışım gibi yumuşak kumaşlardan üretilen 70x200 cm uzun boy modellerden oluşur. Kolay sarılır, hafif ve her mevsim kullanılabilir. Günlük kullanımdan özel günlere kadar tüm kombinlerinize sıcaklık ve şıklık katar.",
    image: "/products/esarp-082.jpeg",
    category: "sal",
  },
  desenli: {
    title: "Desenli Eşarplar",
    description: "Çiçekli, botanik ve figürlü motifler",
    longDescription:
      "Desenli eşarp koleksiyonumuz; çiçek buketi, botanik yaprak, tropikal meyve, sakayık ve figürlü motiflerle süslenmiş sanatsal parçalardan oluşur. Doğadan ilham alan bu tasarımlar, her birini benzersiz bir tablo gibi taşımanızı sağlar. Canlı renklerden sade pastel tonlara kadar geniş bir seçenek sunar.",
    image: "/products/esarp-102.jpeg",
    category: "desenli",
  },
  geometrik: {
    title: "Geometrik Eşarplar",
    description: "Çizgili, kazayağı ve modern motifler",
    longDescription:
      "Geometrik eşarp koleksiyonumuz; chevron, kazayağı, puantiye, patchwork ve pop art gibi modern grafik motiflerle tasarlanmış parçalardan oluşur. Cesur çizgiler ve kontrast renklerle zamansız bir şıklık sunar. Hem klasik hem de modern tarza uyum sağlayan bu modeller, gardırobunuzun vazgeçilmezi olacak.",
    image: "/products/esarp-100.jpeg",
    category: "geometrik",
  },
  lux: {
    title: "Lüks Koleksiyon",
    description: "Premium marka, eşsiz kalite",
    longDescription:
      "Lüks koleksiyonumuz, dünyanın en prestijli markalarından özenle seçilmiş premium ipek eşarplardan oluşur. Monogram detaylar, klasik ekose desenler ve zarif çiçek motifleriyle üst düzey şıklık. Her biri sınırlı sayıda sunulan bu parçalar, koleksiyonunuzun en değerli hazineleri olacak.",
    image: "/products/esarp-073.jpeg",
    category: "lux",
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
