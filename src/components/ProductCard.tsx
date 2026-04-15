"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Eye, GitCompareArrows, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { handleWhatsAppOrder } from "@/lib/products";
import { useCompare } from "@/components/CompareBar";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";
import { localizeProduct } from "@/lib/i18n/localizeProduct";

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const { add, remove, has } = useCompare();
  const inCompare = has(product.id);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const display = useMemo(() => localizeProduct(product, locale), [product, locale]);
  const priceLocale = locale === "en" ? "en-US" : "tr-TR";

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
    <motion.div variants={itemFadeIn} whileHover={{ y: -6 }} className="group min-w-0 @container">
      <div className="relative block aspect-[3/4] w-full min-w-0 overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl">
        <Link
          href={`/urun/${product.id}`}
          className="absolute inset-0 z-[5] hidden lg:block"
          aria-label={`${display.name} — ${t.productCard.productAria}`}
        />

        <Image
          src={product.image}
          alt={display.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {product.isNew && (
          <span className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 shadow-md backdrop-blur-sm">
            {t.productCard.new}
          </span>
        )}
        {product.isLimited && (
          <span className="pointer-events-none absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-amber-600 shadow-md backdrop-blur-sm">
            <Sparkles className="h-3 w-3" /> {t.productCard.limited}
          </span>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            mobileExpanded && "max-lg:opacity-100",
          )}
        />

        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0",
            mobileExpanded && "max-lg:opacity-0",
          )}
        >
          <p className="text-xs font-medium text-white/70">{display.brand}</p>
          <p className="text-base font-bold text-white">{display.price.toLocaleString(priceLocale)} TL</p>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-20 translate-y-4 p-3 opacity-0 transition-all duration-500 @min-[360px]:p-4 @min-[420px]:p-5 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
            mobileExpanded && "max-lg:pointer-events-auto max-lg:translate-y-0 max-lg:opacity-100",
          )}
        >
          <p className="mb-1 text-[10px] font-bold uppercase leading-tight tracking-wider text-white/60 @min-[360px]:text-xs">
            {display.brand} &middot; {display.material}
          </p>
          <h3 className="mb-1.5 text-sm font-bold leading-snug text-white @min-[360px]:text-base">{display.name}</h3>
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-white/60 @min-[360px]:text-sm">{display.description}</p>
          <div className="mb-3 flex w-full min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5 @min-[360px]:mb-4 @min-[360px]:gap-x-3">
            <span className="text-base font-bold tabular-nums text-white @min-[360px]:text-lg @min-[420px]:text-xl">
              {display.price.toLocaleString(priceLocale)} TL
            </span>
            {product.oldPrice && (
              <span className="shrink-0 text-xs text-white/40 line-through @min-[360px]:text-sm">
                {product.oldPrice.toLocaleString(priceLocale)} TL
              </span>
            )}
            {product.oldPrice && (
              <span className="shrink-0 rounded-full bg-red-500/80 px-2 py-0.5 text-[10px] font-bold text-white @min-[360px]:text-xs">
                -%{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}
              </span>
            )}
          </div>
          <div
            data-action
            className="relative z-30 flex w-full min-w-0 flex-col gap-2 @min-[340px]:flex-row @min-[340px]:gap-2"
          >
            <Link
              href={`/urun/${product.id}`}
              data-action
              className="flex min-h-[44px] w-full min-w-0 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 @min-[340px]:flex-1 @min-[360px]:text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4 shrink-0" /> <span className="truncate">{t.productCard.viewDetails}</span>
            </Link>
            <span
              data-action
              className="flex min-h-[44px] w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-green-500 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-600 @min-[340px]:flex-1 @min-[360px]:text-sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(handleWhatsAppOrder(product), "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="h-4 w-4 shrink-0" /> <span className="truncate">{t.productCard.order}</span>
            </span>
          </div>
        </div>

        {!mobileExpanded && (
          <button
            type="button"
            aria-expanded={false}
            aria-label={t.productCard.showOverlay}
            className="absolute inset-0 z-[25] cursor-pointer lg:hidden"
            onClick={() => setMobileExpanded(true)}
          />
        )}
        {mobileExpanded && (
          <button
            type="button"
            aria-expanded
            aria-label={t.productCard.hideOverlay}
            className="absolute inset-x-0 top-0 z-[25] h-[52%] cursor-pointer lg:hidden"
            onClick={() => setMobileExpanded(false)}
          />
        )}

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
          title={inCompare ? t.compare.removeTitle : t.compare.addTitle}
        >
          {inCompare ? <Check className="h-4 w-4" /> : <GitCompareArrows className="h-4 w-4" />}
        </span>
      </div>
    </motion.div>
  );
}
