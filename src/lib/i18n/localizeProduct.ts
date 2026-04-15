import type { Product } from "@/lib/products";
import type { Locale } from "./types";
import en1 from "./product-en-part1.json";
import en2 from "./product-en-part2.json";
import en3 from "./product-en-part3.json";
import { materialColorEn } from "./material-color-en";

const PRODUCT_EN = { ...en1, ...en2, ...en3 } as Record<string, { name: string; description: string }>;

const CARE_SILK_TR =
  "Kuru temizleme önerilir. Elde yıkama yapılacaksa ilk soğuk suyla nazikçe yıkayın. Ters çevirip düşük ısıda ütüleyin. Doğrudan güneş ışığında kurutmayın.";
const CARE_COTTON_TR = "30 derecede yıkanabilir. Gölgede kurutun. Orta ısıda ütüleyin.";

const CARE_SILK_EN =
  "Dry cleaning is recommended. If hand-washing, use cold water and a gentle detergent; dry in the shade and iron on low on the reverse. Do not dry in direct sun.";
const CARE_COTTON_EN = "Machine wash at 30°C. Dry in the shade. Iron on medium heat.";

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === "tr") return product;
  const idKey = String(product.id);
  const en = PRODUCT_EN[idKey];
  const mc = materialColorEn(product.material, product.color, locale);
  let care = product.careInstructions;
  if (care === CARE_SILK_TR || care.includes("Kuru temizleme")) care = CARE_SILK_EN;
  else if (care === CARE_COTTON_TR || care.includes("30 derecede")) care = CARE_COTTON_EN;

  return {
    ...product,
    name: en?.name ?? product.name,
    description: en?.description ?? product.description,
    material: mc.material,
    color: mc.color,
    careInstructions: care,
  };
}

export function categoryLabel(category: string, locale: Locale): string {
  const map: Record<string, { tr: string; en: string }> = {
    "ipek-esarp": { tr: "İpek eşarp", en: "Silk scarf" },
    sal: { tr: "Şal", en: "Shawl" },
    desenli: { tr: "Desenli", en: "Patterned" },
    geometrik: { tr: "Geometrik", en: "Geometric" },
    lux: { tr: "Lüks", en: "Luxury" },
    "sinirli-uretim": { tr: "Sınırlı üretim", en: "Limited edition" },
  };
  const m = map[category];
  if (!m) return category;
  return locale === "en" ? m.en : m.tr;
}
