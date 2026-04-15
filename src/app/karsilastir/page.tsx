"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft, Package, Ruler, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/Breadcrumb";
import { getProductById, handleWhatsAppOrder } from "@/lib/products";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";
  const ids = idsParam.split(",").map(Number).filter(Boolean);
  const products = ids.map((id) => getProductById(id)).filter(Boolean);

  if (products.length < 2) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-gray-500">Karşılaştırmak için en az 2 ürün seçmelisiniz.</p>
        <Link href="/yeni-gelenler">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Ürünlere Dön
          </Button>
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Marka", icon: <ShieldCheck className="h-4 w-4" />, key: "brand" as const },
    { label: "Malzeme", icon: <Package className="h-4 w-4" />, key: "material" as const },
    { label: "Ebat", icon: <Ruler className="h-4 w-4" />, key: "size" as const },
    { label: "Renk", icon: <Palette className="h-4 w-4" />, key: "color" as const },
    { label: "Kategori", icon: <ShieldCheck className="h-4 w-4" />, key: "category" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <Breadcrumb items={[{ label: "Ürünler", href: "/yeni-gelenler" }, { label: "Karşılaştır" }]} />

      <div className="container mx-auto px-4 py-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Ürün Karşılaştırma
        </motion.h1>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="w-40" />
                {products.map((p) => (
                  <th key={p!.id} className="px-4 pb-6 align-top">
                    <Link href={`/urun/${p!.id}`} className="group block">
                      <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl shadow-md transition-transform group-hover:scale-[1.02]">
                        <Image src={p!.image} alt={p!.name} fill className="object-cover" sizes="220px" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-gray-900 transition-colors group-hover:text-purple-600">{p!.name}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="py-4 pr-4 text-sm font-bold text-gray-500">Fiyat</td>
                {products.map((p) => (
                  <td key={p!.id} className="px-4 py-4 text-center">
                    <span className="text-xl font-extrabold text-purple-600">{p!.price.toLocaleString("tr-TR")} TL</span>
                    {p!.oldPrice && (
                      <div className="mt-1">
                        <span className="text-sm text-gray-400 line-through">{p!.oldPrice.toLocaleString("tr-TR")} TL</span>
                        <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                          -%{Math.round(((p!.oldPrice - p!.price) / p!.oldPrice) * 100)}
                        </span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              {specs.map((spec) => (
                <tr key={spec.key} className="border-t border-gray-100">
                  <td className="py-4 pr-4">
                    <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
                      {spec.icon} {spec.label}
                    </span>
                  </td>
                  {products.map((p) => (
                    <td key={p!.id} className="px-4 py-4 text-center text-sm font-medium text-gray-800 capitalize">
                      {p![spec.key]}
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="border-t border-gray-100">
                <td className="py-4 pr-4 text-sm font-bold text-gray-500">Durum</td>
                {products.map((p) => (
                  <td key={p!.id} className="px-4 py-4 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {p!.isNew && <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">Yeni</span>}
                      {p!.isLimited && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Sınırlı</span>}
                      {p!.oldPrice && <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">İndirimli</span>}
                      {!p!.isNew && !p!.isLimited && !p!.oldPrice && <span className="text-xs text-gray-400">-</span>}
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-t border-gray-200">
                <td className="py-6 pr-4 text-sm font-bold text-gray-500">Sipariş</td>
                {products.map((p) => (
                  <td key={p!.id} className="px-4 py-6 text-center">
                    <a href={handleWhatsAppOrder(p!)} target="_blank" rel="noopener noreferrer">
                      <Button className="whatsapp-button rounded-full bg-green-500 px-6 text-white hover:bg-green-600">
                        <MessageCircle className="mr-1.5 h-4 w-4" /> Sipariş Ver
                      </Button>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
