"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/SearchModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocale } from "@/context/LocaleContext";

const collectionEntries = [
  { slug: "ipek-esarp", href: "/koleksiyonlar/ipek-esarp" },
  { slug: "sal", href: "/koleksiyonlar/sal" },
  { slug: "desenli", href: "/koleksiyonlar/desenli" },
  { slug: "geometrik", href: "/koleksiyonlar/geometrik" },
  { slug: "lux", href: "/koleksiyonlar/lux" },
  { slug: "sinirli-uretim", href: "/koleksiyonlar/sinirli-uretim" },
] as const;

const brandEntries = [
  { name: "Vakko", href: "/marka/vakko" },
  { name: "Armine", href: "/marka/armine" },
  { name: "Aker", href: "/marka/aker" },
  { name: "Vissona", href: "/marka/vissona" },
  { name: "Belli", href: "/marka/belli" },
  { name: "Zerafetim", href: "/marka/zerafetim" },
];

const navEntries: { href: string; label: "home" | "newArrivals" | "fabricGuide" | "faq" | "about" | "contact" }[] = [
  { href: "/", label: "home" },
  { href: "/yeni-gelenler", label: "newArrivals" },
  { href: "/kumas-rehberi", label: "fabricGuide" },
  { href: "/sss", label: "faq" },
  { href: "/hakkimizda", label: "about" },
  { href: "/iletisim", label: "contact" },
];

export default function Navbar() {
  const { t } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsCollectionsOpen(false);
    setIsBrandsOpen(false);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.closest("[data-mobile-nav-ignore]")) return;
      const panel = mobileMenuRef.current;
      if (panel?.contains(targetEl)) return;
      closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.button
            type="button"
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[45] bg-black/35 backdrop-blur-[1px] lg:hidden"
            aria-label="Menüyü kapat"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-shadow border-b border-gray-100",
          scrollY > 50 && "shadow-lg",
        )}
      >
        <div className="container mx-auto flex h-20 items-center gap-4 px-4">
          <Link
            href="/"
            className="shrink-0 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text md:text-3xl"
          >
            KARTAL ESARP
          </Link>

          <div className="hidden min-w-0 flex-1 lg:block">
            <SearchModal />
          </div>

          <nav className="hidden shrink-0 items-center gap-7 lg:flex">
            {navEntries.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600",
                  pathname === link.href && "text-purple-600",
                )}
              >
                {t.nav[link.label]}
              </Link>
            ))}

            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600"
              >
                {t.nav.collections} <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white py-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {collectionEntries.map((col) => (
                  <Link
                    key={col.href}
                    href={col.href}
                    className={cn(
                      "block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-600",
                      pathname === col.href && "bg-purple-50 font-semibold text-purple-600",
                    )}
                  >
                    {t.collectionNav[col.slug]}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600"
              >
                {t.nav.brands} <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {brandEntries.map((b) => (
                  <Link
                    key={b.href}
                    href={b.href}
                    className={cn(
                      "block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-600",
                      pathname === b.href && "bg-purple-50 font-semibold text-purple-600",
                    )}
                  >
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>

            {navEntries.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600",
                  pathname === link.href && "text-purple-600",
                )}
              >
                {t.nav[link.label]}
              </Link>
            ))}

            <LanguageSwitcher className="shrink-0" />
          </nav>

          <div data-mobile-nav-ignore className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={t.nav.menu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-50 px-4 py-2 lg:hidden">
          <SearchModal />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-[50] overflow-hidden border-t bg-white lg:hidden"
            >
              <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
                {navEntries.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600",
                      pathname === link.href && "bg-purple-50 text-purple-600",
                    )}
                  >
                    {t.nav[link.label]}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                  className="flex items-center justify-between rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600"
                >
                  {t.nav.collections}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isCollectionsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isCollectionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pl-4 pb-2">
                        {collectionEntries.map((col) => (
                          <Link
                            key={col.href}
                            href={col.href}
                            onClick={closeMenu}
                            className={cn(
                              "rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-600",
                              pathname === col.href && "bg-purple-50 text-purple-600",
                            )}
                          >
                            {t.collectionNav[col.slug]}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                  className="flex items-center justify-between rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600"
                >
                  {t.nav.brands}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isBrandsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isBrandsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pl-4 pb-2">
                        {brandEntries.map((b) => (
                          <Link
                            key={b.href}
                            href={b.href}
                            onClick={closeMenu}
                            className={cn(
                              "rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-600",
                              pathname === b.href && "bg-purple-50 text-purple-600",
                            )}
                          >
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navEntries.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600",
                      pathname === link.href && "bg-purple-50 text-purple-600",
                    )}
                  >
                    {t.nav[link.label]}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
