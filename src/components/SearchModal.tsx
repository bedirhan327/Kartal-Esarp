"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";
import { localizeProduct } from "@/lib/i18n/localizeProduct";

export default function SearchModal() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const catalog = useMemo(() => allProducts.map((p) => localizeProduct(p, locale)), [locale]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setFocused(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const q = query.toLowerCase().trim();
  const results =
    q.length < 2
      ? []
      : catalog
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.color.toLowerCase().includes(q),
          )
          .slice(0, 6);

  const showDropdown = focused && q.length >= 2;

  return (
    <div ref={wrapperRef} className="relative max-w-xl flex-1">
      <div
        className={`flex items-center rounded-full border bg-gray-50 transition-all ${focused ? "border-purple-400 ring-2 ring-purple-100 bg-white" : "border-gray-200"}`}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={t.search.placeholder}
          className="flex-1 bg-transparent py-2.5 pl-5 pr-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
          className="mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-transform hover:scale-105"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          >
            {results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-500">—</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/urun/${p.id}`}
                      onClick={() => setFocused(false)}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-purple-50"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{p.name}</p>
                        <p className="truncate text-xs text-gray-500">{p.brand}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-purple-600">
                        {p.price.toLocaleString(locale === "en" ? "en-US" : "tr-TR")} TL
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
