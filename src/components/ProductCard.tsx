"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { handleWhatsAppOrder } from "@/lib/products";

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div variants={itemFadeIn} whileHover={{ y: -8 }} className="group">
      <Card className="overflow-hidden border-2 border-purple-100 transition-all hover:border-purple-300 hover:shadow-xl">
        <Link href={`/urun/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 text-xs font-bold text-white">
                YENi
              </span>
            )}
            {product.isLimited && (
              <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white">
                <Sparkles className="h-3 w-3" /> SINIRLI
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-lg">
                <Eye className="h-4 w-4" /> Detayi Gor
              </span>
            </div>
          </div>
        </Link>
        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-700">{product.brand}</span>
            <span className="text-xs text-gray-400">{product.material}</span>
          </div>
          <Link href={`/urun/${product.id}`}>
            <h3 className="mb-1 text-base font-semibold text-gray-900 hover:text-purple-600 transition-colors">{product.name}</h3>
          </Link>
          <p className="mb-3 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-xl font-bold text-purple-600">{product.price.toLocaleString("tr-TR")} TL</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{product.oldPrice.toLocaleString("tr-TR")} TL</span>
            )}
            {product.oldPrice && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                %{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Link href={`/urun/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full rounded-full border-purple-200 text-purple-600 hover:bg-purple-50">
                <Eye className="mr-1.5 h-4 w-4" /> Incele
              </Button>
            </Link>
            <a href={handleWhatsAppOrder(product)} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="whatsapp-button w-full rounded-full bg-green-500 text-white hover:bg-green-600">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Siparis
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
