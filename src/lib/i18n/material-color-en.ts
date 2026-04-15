import type { Locale } from "./types";

const MATERIAL_MAP: Record<string, { en: string }> = {
  "%100 İpek Twill": { en: "100% silk twill" },
  "%100 İpek": { en: "100% silk" },
  "%100 İpek Tivil": { en: "100% silk twill (tivil)" },
  "%100 İpek Sura": { en: "100% silk sura" },
  "%100 İpek Saten": { en: "100% silk satin" },
  "%100 İpek Sifon": { en: "100% silk chiffon" },
  "Jersey İpek": { en: "Jersey silk" },
  "Pamuk-Polyester": { en: "Cotton–polyester" },
  "Dokuma İpek": { en: "Woven silk" },
  "Pamuk-İpek": { en: "Cotton–silk" },
  "İpek-Pamuk Jakar": { en: "Silk–cotton jacquard" },
  Viskon: { en: "Viscose" },
  "Medine Ipegi": { en: "Medina silk" },
  "Pamuk Karisim": { en: "Cotton blend" },
};

export function materialColorEn(material: string, color: string, locale: Locale): { material: string; color: string } {
  if (locale === "tr") return { material, color };
  const m = MATERIAL_MAP[material]?.en ?? material;
  return { material: m, color };
}
