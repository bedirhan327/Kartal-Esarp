"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { getProductById, type Product } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";
import { localizeProduct } from "@/lib/i18n/localizeProduct";

const STORAGE_KEY = "recently-viewed";
const MAX_ITEMS = 8;

export function trackView(productId: number) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const ids: number[] = raw ? JSON.parse(raw) : [];
    const filtered = ids.filter((id) => id !== productId);
    filtered.unshift(productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

export default function RecentlyViewed({ excludeId }: { excludeId?: number }) {
  const { locale, t } = useLocale();
  const priceLocale = locale === "en" ? "en-US" : "tr-TR";

  const products = useMemo(() => {
    if (typeof window === "undefined") return [] as Product[];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const ids: number[] = JSON.parse(raw);
      const items = ids
        .filter((id) => id !== excludeId)
        .map((id) => getProductById(id))
        .filter(Boolean) as Product[];
      return items.slice(0, 6);
    } catch {
      return [];
    }
  }, [excludeId, locale]);

  if (products.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">{t.recentlyViewed.title}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {products.map((p, i) => {
            const d = localizeProduct(p, locale);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-36 shrink-0"
              >
                <Link href={`/urun/${p.id}`}>
                  <div className="relative aspect-square overflow-hidden rounded-xl shadow-sm transition-transform hover:scale-105">
                    <Image src={p.image} alt={d.name} fill className="object-cover" sizes="144px" />
                  </div>
                  <p className="mt-2 truncate text-xs text-gray-500">{p.brand}</p>
                  <p className="truncate text-sm font-semibold text-gray-800">{d.name}</p>
                  <p className="text-sm font-bold text-purple-600">{p.price.toLocaleString(priceLocale)} TL</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
