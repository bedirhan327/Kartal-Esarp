"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Eye, GitCompareArrows, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { handleWhatsAppOrder } from "@/lib/products";
import { useCompare } from "@/components/CompareBar";
import { cn } from "@/lib/utils";

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductCard({ product }: { product: Product }) {
  const { add, remove, has } = useCompare();
  const inCompare = has(product.id);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const resetMobileExpanded = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      setMobileExpanded(false);
    }
  }, []);

  useEffect(() => {
    resetMobileExpanded();
    window.addEventListener("resize", resetMobileExpanded);
    return () => window.removeEventListener("resize", resetMobileExpanded);
  }, [resetMobileExpanded]);

  return (
    <motion.div variants={itemFadeIn} whileHover={{ y: -6 }} className="group">
      <div className="relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl">
        {/* Masaüstü: karta tıklanınca ürün sayfası */}
        <Link
          href={`/urun/${product.id}`}
          className="absolute inset-0 z-[5] hidden lg:block"
          aria-label={`${product.name} ürün detayı`}
        />

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges */}
        {product.isNew && (
          <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-md backdrop-blur-sm">
            YENİ
          </span>
        )}
        {product.isLimited && (
          <span className="pointer-events-none absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-amber-600 shadow-md backdrop-blur-sm">
            <Sparkles className="h-3 w-3" /> Sınırlı
          </span>
        )}

        {/* Hover overlay gradient — masaüstü hover / mobil tek dokunuş */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            mobileExpanded && "max-lg:opacity-100",
          )}
        />

        {/* Varsayılan alt bilgi — hover’da / mobilde detay açıkken kaybolur */}
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0",
            mobileExpanded && "max-lg:opacity-0",
          )}
        >
          <p className="text-xs font-medium text-white/70">{product.brand}</p>
          <p className="text-base font-bold text-white">{product.price.toLocaleString("tr-TR")} TL</p>
        </div>

        {/* Hover / mobil detay bloğu */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-20 translate-y-4 p-5 opacity-0 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
            mobileExpanded && "max-lg:pointer-events-auto max-lg:translate-y-0 max-lg:opacity-100",
          )}
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-white/60">
            {product.brand} &middot; {product.material}
          </p>
          <h3 className="mb-1.5 text-base font-bold leading-snug text-white">{product.name}</h3>
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/60">{product.description}</p>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xl font-bold text-white">{product.price.toLocaleString("tr-TR")} TL</span>
            {product.oldPrice && (
              <span className="text-sm text-white/40 line-through">{product.oldPrice.toLocaleString("tr-TR")} TL</span>
            )}
            {product.oldPrice && (
              <span className="rounded-full bg-red-500/80 px-2 py-0.5 text-xs font-bold text-white">
                -%{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}
              </span>
            )}
          </div>
          <div data-action className="relative z-30 flex gap-2">
            <Link
              href={`/urun/${product.id}`}
              data-action
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4" /> Detayı Gör
            </Link>
            <span
              data-action
              className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-green-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(handleWhatsAppOrder(product), "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="h-4 w-4" /> Sipariş Ver
            </span>
          </div>
        </div>

        {/* Mobil: kapalıyken dokununca detayı aç */}
        {!mobileExpanded && (
          <button
            type="button"
            aria-expanded={false}
            aria-label="Ürün detaylarını göster"
            className="absolute inset-0 z-[25] cursor-pointer lg:hidden"
            onClick={() => setMobileExpanded(true)}
          />
        )}
        {/* Mobil: açıkken üst bölgeye dokununca kapat (butonlar altta) */}
        {mobileExpanded && (
          <button
            type="button"
            aria-expanded
            aria-label="Ürün özetini göster"
            className="absolute inset-x-0 top-0 z-[25] h-[52%] cursor-pointer lg:hidden"
            onClick={() => setMobileExpanded(false)}
          />
        )}

        {/* Compare — her zaman üstte */}
        <span
          data-compare
          className={cn(
            "absolute z-40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all",
            product.isLimited ? "top-12 right-3" : "top-3 right-3",
            inCompare ? "bg-purple-600 text-white" : "bg-white/80 text-gray-600 hover:bg-purple-100 hover:text-purple-600",
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (inCompare) {
              remove(product.id);
            } else {
              add(product);
            }
          }}
          title={inCompare ? "Karşılaştırmadan çıkar" : "Karşılaştır"}
        >
          {inCompare ? <Check className="h-4 w-4" /> : <GitCompareArrows className="h-4 w-4" />}
        </span>
      </div>
    </motion.div>
  );
}
