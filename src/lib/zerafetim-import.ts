import rawData from "../../Data/zerafetim_2026-04-29_05-56_esarp.json";
import type { Product } from "./products";

interface RawZerafetimProduct {
  url: string;
  product_id: string;
  name: string;
  brand: string;
  price: number;
  price_text: string;
  stock: string;
  description: string;
  category_url: string;
  scraped_at: number;
  specs: Record<string, unknown>;
  images: string[];
  breadcrumbs: string[];
}

const CARE_SILK_LOCAL =
  "Kuru temizleme önerilir. Elde yıkama yapılacaksa ilk soğuk suyla nazikçe yıkayın. Ters çevirip düşük ısıda ütüleyin. Doğrudan güneş ışığında kurutmayın.";
const CARE_COTTON_LOCAL = "30 derecede yıkanabilir. Gölgede kurutun. Orta ısıda ütüleyin.";

const ID_OFFSET = 1000;

function classifySubCategory(name: string): string {
  const n = name.toLocaleLowerCase("tr-TR");
  if (n.includes("bandana")) return "bandana";
  if (n.includes("çocuk")) return "twill-cocuk-esarp";
  if (n.includes("yün ipek")) return "yun-ipek";
  if (n.includes("flos viskon") || n.includes("floş viskon")) return "flos-viskon";
  if (n.includes("viskon")) return "viskon";
  if (n.includes("damalı jakar")) return "damali-jakar";
  if (n.includes("pamuk jakar fon")) return "pamuk-jakar-fon";
  if (n.includes("pamuk modal")) return "pamuk-modal";
  if (n.includes("yuvarlak jakar") && n.includes("pamuk")) return "pamuklu-ipek";
  if (n.includes("pamuk ipek") || n.includes("pamuklu ipek")) return "pamuklu-ipek";
  if (n.includes("couture twill")) return "couture-twill-ipek";
  if (n.includes("twill") || n.includes("twil")) return "twill-ipek";
  return "twill-ipek";
}

function cleanName(name: string): string {
  return name
    .replace(/Twil(\s)/g, "Twill$1")
    .replace(/Eşarbı/g, "Eşarp")
    .trim();
}

function parseMaterial(description: string, subCategory: string): string {
  const m = description.match(/Materyal:\s*([^•\n]+?)(?=\s*•|\n|$)/);
  if (m) return m[1].trim();
  switch (subCategory) {
    case "yun-ipek":
      return "Yün-İpek Karışım";
    case "viskon":
    case "flos-viskon":
      return "Viskon";
    case "bandana":
      return "Pamuk";
    case "pamuklu-ipek":
      return "Pamuk-İpek";
    case "pamuk-modal":
      return "Pamuk-Modal";
    case "couture-twill-ipek":
      return "Couture %100 İpek Twill";
    default:
      return "%100 İpek Twill";
  }
}

function parseSize(description: string): string {
  const m = description.match(/Ebat:\s*([^•\n]+?)(?=\s*•|\n|$)/);
  return m ? m[1].trim() : "90 × 90 cm";
}

function shortenDescription(description: string): string {
  const idx = description.indexOf("Siparişinizi");
  const truncated = idx > 0 ? description.substring(0, idx) : description;
  return truncated.trim().replace(/\s+/g, " ").substring(0, 500);
}

function extractColor(name: string): string {
  const tokens = ["Siyah", "Beyaz", "Lacivert", "Mavi", "Yeşil", "Kırmızı", "Pembe", "Mor", "Sarı", "Turuncu", "Gri", "Bej", "Krem", "Bordo", "Pudra", "Kahve", "Vizon", "Hardal", "Turkuaz", "Fusya", "Antrasit", "Saks", "Gold", "Çok Renkli"];
  const found = tokens.filter((t) => name.includes(t));
  return found.length > 0 ? found.join("-") : "Çok Renkli";
}

function isSilk(subCategory: string): boolean {
  return [
    "twill-ipek",
    "yun-ipek",
    "twill-cocuk-esarp",
    "couture-twill-ipek",
    "damali-jakar",
    "pamuklu-ipek",
  ].includes(subCategory);
}

function ceilTo100(value: number): number {
  return Math.ceil(value / 100) * 100;
}

function transform(raw: RawZerafetimProduct, index: number): Product {
  const name = cleanName(raw.name);
  const subCategory = classifySubCategory(name);
  const oldPrice = ceilTo100(raw.price);
  const price = ceilTo100(raw.price * 0.85);

  return {
    id: ID_OFFSET + index,
    name,
    brand: "Zerafetim",
    price,
    oldPrice,
    image: raw.images[0],
    images: raw.images,
    category: "ipek-esarp",
    subCategory,
    description: shortenDescription(raw.description),
    material: parseMaterial(raw.description, subCategory),
    size: parseSize(raw.description),
    color: extractColor(name),
    careInstructions: isSilk(subCategory) ? CARE_SILK_LOCAL : CARE_COTTON_LOCAL,
  };
}

export const zerafetimProducts: Product[] = (rawData as RawZerafetimProduct[]).map(transform);
