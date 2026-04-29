"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { useLocale } from "@/context/LocaleContext";

type SortOption = "default" | "price-asc" | "price-desc" | "newest";

interface Props {
  products: Product[];
  children: (filtered: Product[]) => React.ReactNode;
}

export default function ProductFilters({ products, children }: Props) {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>("default");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const allBrands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);
  const allSubCategories = useMemo(
    () =>
      [...new Set(products.map((p) => p.subCategory).filter((s): s is string => Boolean(s)))].sort(),
    [products],
  );

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  const toggleSubCategory = (s: string) =>
    setSelectedSubCategories((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedSubCategories([]);
    setOnlyDiscount(false);
    setOnlyNew(false);
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
  };

  const hasFilters =
    selectedBrands.length > 0 ||
    selectedSubCategories.length > 0 ||
    onlyDiscount ||
    onlyNew ||
    minPrice ||
    maxPrice ||
    sort !== "default";

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedSubCategories.length > 0)
      result = result.filter((p) => p.subCategory && selectedSubCategories.includes(p.subCategory));
    if (onlyDiscount) result = result.filter((p) => p.oldPrice);
    if (onlyNew) result = result.filter((p) => p.isNew);
    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedBrands, selectedSubCategories, onlyDiscount, onlyNew, minPrice, maxPrice, sort]);

  const productCountLabel = t.filters.productCount.replace("{count}", String(filtered.length));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-purple-300 hover:text-purple-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t.filters.filter}
            {hasFilters && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">!</span>}
          </button>
          {hasFilters && (
            <button type="button" onClick={clearAll} className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-red-500">
              <X className="h-3.5 w-3.5" /> {t.filters.clear}
            </button>
          )}
          <span className="text-sm text-gray-400">{productCountLabel}</span>
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none rounded-full border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition-colors hover:border-purple-300 focus:border-purple-500"
          >
            <option value="default">{t.filters.sortSelectDefault}</option>
            <option value="price-asc">{t.filters.sortPriceAscLong}</option>
            <option value="price-desc">{t.filters.sortPriceDescLong}</option>
            <option value="newest">{t.filters.sortNewestLong}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="grid gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h4 className="mb-3 text-sm font-bold text-gray-900">{t.filters.brands}</h4>
                <div className="flex flex-wrap gap-2">
                  {allBrands.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => toggleBrand(b)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedBrands.includes(b) ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-purple-50"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {allSubCategories.length > 1 && (
                <div>
                  <h4 className="mb-3 text-sm font-bold text-gray-900">{t.filters.subCategory}</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSubCategories.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => toggleSubCategory(s)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedSubCategories.includes(s)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-purple-50"
                        }`}
                      >
                        {t.subCategoryLabels[s as keyof typeof t.subCategoryLabels] ?? s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-3 text-sm font-bold text-gray-900">{t.filters.priceRange}</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder={t.filters.minPlaceholder}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder={t.filters.maxPlaceholder}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-bold text-gray-900">{t.filters.status}</h4>
                <label className="mb-2 flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={onlyNew} onChange={() => setOnlyNew(!onlyNew)} className="h-4 w-4 rounded border-gray-300 accent-purple-600" />
                  <span className="text-sm text-gray-700">{t.filters.onlyNewProducts}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyDiscount}
                    onChange={() => setOnlyDiscount(!onlyDiscount)}
                    className="h-4 w-4 rounded border-gray-300 accent-purple-600"
                  />
                  <span className="text-sm text-gray-700">{t.filters.discountOnly}</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children(filtered)}
    </div>
  );
}
