"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { allProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function FavorilerPage() {
  const { ids } = useWishlist();
  const { t } = useLocale();
  const favorites = useMemo(() => allProducts.filter((p) => ids.includes(p.id)), [ids]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg shadow-pink-200">
            <Heart className="h-8 w-8 fill-white text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">{t.wishlist.pageTitle}</h1>
          {favorites.length > 0 && (
            <p className="mt-2 text-gray-500">{t.wishlist.count.replace("{count}", String(favorites.length))}</p>
          )}
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <Heart className="h-10 w-10 text-gray-300" />
            </div>
            <p className="mb-2 text-xl font-semibold text-gray-700">{t.wishlist.emptyTitle}</p>
            <p className="mb-8 max-w-sm mx-auto text-gray-400">{t.wishlist.emptyDesc}</p>
            <Link href="/yeni-gelenler">
              <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-base font-bold text-white shadow-lg hover:opacity-90">
                <ShoppingBag className="mr-2 h-5 w-5" />
                {t.wishlist.goShopping}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
