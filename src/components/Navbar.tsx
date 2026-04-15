"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchModal from "@/components/SearchModal";

const collections = [
  { name: "İpek Eşarplar", href: "/koleksiyonlar/ipek-esarp" },
  { name: "Şallar", href: "/koleksiyonlar/sal" },
  { name: "Desenli Eşarplar", href: "/koleksiyonlar/desenli" },
  { name: "Geometrik Eşarplar", href: "/koleksiyonlar/geometrik" },
  { name: "Lüks Koleksiyon", href: "/koleksiyonlar/lux" },
  { name: "Sınırlı Üretim", href: "/koleksiyonlar/sinirli-uretim" },
];

const brands = [
  { name: "Vakko", href: "/marka/vakko" },
  { name: "Armine", href: "/marka/armine" },
  { name: "Aker", href: "/marka/aker" },
  { name: "Vissona", href: "/marka/vissona" },
  { name: "Belli", href: "/marka/belli" },
  { name: "Zerafetim", href: "/marka/zerafetim" },
];

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Yeni Gelenler", href: "/yeni-gelenler" },
  { name: "Kumaş rehberi", href: "/kumas-rehberi" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow border-b border-gray-100",
        scrollY > 50 && "shadow-lg"
      )}
    >
      <div className="container mx-auto flex h-20 items-center gap-6 px-4">
        <Link href="/" className="shrink-0 text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text md:text-3xl">
          KARTAL ESARP
        </Link>

        <div className="hidden flex-1 lg:block">
          <SearchModal />
        </div>

        <nav className="hidden shrink-0 items-center gap-7 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600",
                pathname === link.href && "text-purple-600"
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600">
              Koleksiyonlar <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full mt-2 w-56 rounded-xl bg-white py-3 opacity-0 shadow-2xl border border-gray-200 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {collections.map((col) => (
                <Link
                  key={col.href}
                  href={col.href}
                  className={cn(
                    "block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-600",
                    pathname === col.href && "bg-purple-50 text-purple-600 font-semibold"
                  )}
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600">
              Markalar <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl bg-white py-3 opacity-0 shadow-2xl border border-gray-200 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {brands.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className={cn(
                    "block px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-600",
                    pathname === b.href && "bg-purple-50 text-purple-600 font-semibold"
                  )}
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold text-gray-700 transition-colors hover:text-purple-600",
                pathname === link.href && "text-purple-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t bg-white lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
              {navLinks.slice(0, 2).map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className={cn("rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600", pathname === link.href && "bg-purple-50 text-purple-600")}>
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="flex items-center justify-between rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600"
              >
                Koleksiyonlar
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
                      {collections.map((col) => (
                        <Link key={col.href} href={col.href} onClick={closeMenu} className={cn("rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-600", pathname === col.href && "bg-purple-50 text-purple-600")}>
                          {col.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                className="flex items-center justify-between rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600"
              >
                Markalar
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
                      {brands.map((b) => (
                        <Link key={b.href} href={b.href} onClick={closeMenu} className={cn("rounded-lg py-2 px-3 text-sm font-medium text-gray-800 hover:bg-purple-50 hover:text-purple-600", pathname === b.href && "bg-purple-50 text-purple-600")}>
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.slice(2).map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} className={cn("rounded-lg py-2.5 px-3 text-base font-semibold text-gray-900 hover:bg-purple-50 hover:text-purple-600", pathname === link.href && "bg-purple-50 text-purple-600")}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
