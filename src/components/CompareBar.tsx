"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, GitCompareArrows } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";

interface CompareContextType {
  items: Product[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false,
});

export function useCompare() {
  return useContext(CompareContext);
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const add = useCallback((p: Product) => {
    setItems((prev) => {
      if (prev.find((x) => x.id === p.id)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, p];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback((id: number) => items.some((x) => x.id === id), [items]);

  return (
    <CompareContext.Provider value={{ items, add, remove, clear, has }}>
      {children}
      <CompareBarUI />
    </CompareContext.Provider>
  );
}

function CompareBarUI() {
  const { items, remove, clear } = useCompare();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur-md"
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GitCompareArrows className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">{items.length}/3 ürün seçili</span>
          </div>

          <div className="flex items-center gap-3">
            {items.map((p) => (
              <div key={p.id} className="relative">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-purple-200">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                </div>
                <button
                  onClick={() => remove(p.id)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={clear} className="rounded-full px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100">
              Temizle
            </button>
            {items.length >= 2 && (
              <Link
                href={`/karsilastir?ids=${items.map((p) => p.id).join(",")}`}
                className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Karşılaştır
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
