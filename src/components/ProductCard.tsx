"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Eye, GitCompareArrows, Check, Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { handleWhatsAppOrder } from "@/lib/products";
import { useCompare } from "@/components/CompareBar";
import { useWishlist } from "@/context/WishlistContext";
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
  const { toggle: toggleWishlist, has: inWishlist } = useWishlist();
  const inCompare = has(product.id);
  const isFav = inWishlist(product.id);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const display = useMemo(() => localizeProduct(product, locale), [product, locale]);
  const priceLocale = locale === "en" ? "en-US" : "tr-TR";
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(priceLocale, {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 0,
      }),
    [priceLocale],
  );

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
          <p className="text-base font-bold text-white">{currencyFormatter.format(display.price)}</p>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 right-0 z-20 translate-y-4 p-2 opacity-0 transition-all duration-500 @min-[280px]:p-3 @min-[360px]:p-4 @min-[420px]:p-5 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
            mobileExpanded && "max-lg:pointer-events-auto max-lg:translate-y-0 max-lg:opacity-100",
          )}
        >
          <p className="mb-0.5 text-[9px] font-bold uppercase leading-tight tracking-wider text-white/60 @min-[280px]:text-[10px] @min-[360px]:text-xs">
            {display.brand} &middot; {display.material}
          </p>
          <h3 className="mb-1 text-xs font-bold leading-snug text-white @min-[280px]:text-sm @min-[360px]:text-base">{display.name}</h3>
          <p className="mb-1.5 hidden line-clamp-2 text-xs leading-relaxed text-white/60 @min-[280px]:mb-2 @min-[280px]:block @min-[360px]:text-sm">{display.description}</p>
          <div className="mb-1.5 flex w-full min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 @min-[280px]:mb-2 @min-[280px]:gap-x-2 @min-[360px]:mb-3 @min-[360px]:gap-x-3">
            <span className="text-sm font-bold tabular-nums text-white @min-[280px]:text-base @min-[360px]:text-lg @min-[420px]:text-xl">
              {currencyFormatter.format(display.price)}
            </span>
            {product.oldPrice && (
              <span className="shrink-0 text-[10px] text-white/40 line-through @min-[280px]:text-xs @min-[360px]:text-sm">
                {currencyFormatter.format(product.oldPrice)}
              </span>
            )}
            {product.oldPrice && (
              <span className="shrink-0 rounded-full bg-red-500/80 px-1.5 py-0.5 text-[9px] font-bold text-white @min-[280px]:px-2 @min-[280px]:text-[10px] @min-[360px]:text-xs">
                -%{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}
              </span>
            )}
          </div>
          <div
            data-action
            className="relative z-30 flex w-full min-w-0 flex-col gap-1.5 @min-[340px]:flex-row @min-[340px]:gap-2"
          >
            <Link
              href={`/urun/${product.id}`}
              data-action
              className="flex min-h-[32px] w-full min-w-0 items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 @min-[280px]:min-h-[36px] @min-[340px]:flex-1 @min-[360px]:min-h-[40px] @min-[360px]:px-3 @min-[360px]:text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="h-3.5 w-3.5 shrink-0 @min-[360px]:h-4 @min-[360px]:w-4" /> <span className="truncate">{t.productCard.viewDetails}</span>
            </Link>
            <span
              data-action
              className="flex min-h-[32px] w-full min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-green-500 px-2 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-green-600 @min-[280px]:min-h-[36px] @min-[340px]:flex-1 @min-[360px]:min-h-[40px] @min-[360px]:px-3 @min-[360px]:text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(handleWhatsAppOrder(product), "_blank", "noopener,noreferrer");
              }}
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0 @min-[360px]:h-4 @min-[360px]:w-4" /> <span className="truncate">{t.productCard.order}</span>
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

        {/* Wishlist heart button */}
        <motion.button
          type="button"
          data-compare
          className={cn(
            "absolute z-40 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all",
            product.isLimited ? "top-[5.25rem] right-3" : "top-12 right-3",
            isFav ? "bg-pink-500 text-white" : "bg-white/80 text-gray-500 hover:bg-pink-50 hover:text-pink-500",
          )}
          whileTap={{ scale: 1.35 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isFav ? t.wishlist.remove : t.wishlist.add}
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-white")} />
        </motion.button>

        {/* Compare button */}
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

        {/* Low stock badge — positioned below the NEW badge if present */}
        {product.stock !== undefined && product.stock <= 5 && (
          <span
            className={cn(
              "pointer-events-none absolute left-3 z-20 rounded-full bg-red-500/90 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm backdrop-blur-sm",
              product.isNew ? "top-12" : "top-3",
            )}
          >
            {t.stock.low.replace("{n}", String(product.stock))}
          </span>
        )}
      </div>
    </motion.div>
  );
}
