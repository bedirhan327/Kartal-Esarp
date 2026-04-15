import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/products";

const BASE = "https://kartal-esarp.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE}/yeni-gelenler`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/iletisim`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE}/kumas-rehberi`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/sss`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/kargo-iade-degisim`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/gizlilik-kvkk`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const collections = ["ipek-esarp", "sal", "desenli", "geometrik", "lux", "sinirli-uretim"].map((slug) => ({
    url: `${BASE}/koleksiyonlar/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const brands = ["vakko", "armine", "aker", "vissona", "belli", "zerafetim"].map((slug) => ({
    url: `${BASE}/marka/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const products = allProducts.map((p) => ({
    url: `${BASE}/urun/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...collections, ...brands, ...products];
}
