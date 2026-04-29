import { getProductOrderWhatsAppUrl } from "@/lib/whatsapp";
import { zerafetimProducts } from "./zerafetim-import";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subCategory?: string;
  isNew?: boolean;
  isLimited?: boolean;
  stock?: number;
  description: string;
  material: string;
  size: string;
  color: string;
  careInstructions: string;
}

const CARE_SILK =
  "Kuru temizleme önerilir. Elde yıkama yapılacaksa ilk soğuk suyla nazikçe yıkayın. Ters çevirip düşük ısıda ütüleyin. Doğrudan güneş ışığında kurutmayın.";
const CARE_COTTON = "30 derecede yıkanabilir. Gölgede kurutun. Orta ısıda ütüleyin.";

function p(file: string) {
  return `/products/${file}`;
}

export const allProducts: Product[] = [
  // ==================== VAKKO ====================
  { id: 1, name: "Vakko Twill İpek Esarp - Kareli Buz Mavisi", brand: "Vakko", price: 2290, image: p("esarp-030.jpeg"), category: "geometrik", description: "Vakko buz mavisi zemin üzerinde sulu boya fırça darbeleriyle kare desen twill ipek esarp. Minimalist ve modern.", material: "%100 İpek Twill", size: "90x90 cm", color: "Buz Mavisi-Lacivert", careInstructions: CARE_SILK },
  { id: 2, name: "Vakko Twill İpek Esarp - Paisley Siyah Toprak", brand: "Vakko", price: 2790, oldPrice: 3490, image: p("esarp-031.jpeg"), category: "desenli", isNew: true, description: "Vakko siyah zemin üzerinde kırmızı, turuncu ve altın paisley desenleri. Zengin dokusu ve detaylı motifleriyle premium bir parça.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Kırmızı-Turuncu", careInstructions: CARE_SILK },
  { id: 3, name: "Vakko Twill İpek Esarp - Osmanlı Motif Lacivert", brand: "Vakko", price: 2990, image: p("esarp-032.jpeg"), category: "ipek-esarp", description: "Vakko lacivert zemin üzerinde turkuaz Osmanlı motifleri twill ipek esarp. İnci ve mücevher detaylarıyla görkemli bir tasarım.", material: "%100 İpek Twill", size: "90x90 cm", color: "Lacivert-Turkuaz", careInstructions: CARE_SILK },
  { id: 4, name: "Vakko Twill İpek Esarp - Çiçekli Hardal-Kahve", brand: "Vakko", price: 2590, oldPrice: 3090, image: p("esarp-034.jpeg"), category: "desenli", isNew: true, description: "Vakko hardal ve kahverengi zemin üzerinde beyaz çiçek motifleri twill ipek esarp. Mavi bordür ile doğadan ilham alan sonbahar tasarımı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Hardal-Kahve", careInstructions: CARE_SILK },
  { id: 5, name: "Vakko Twill İpek Esarp - Chevron Siyah-Gri", brand: "Vakko", price: 2490, image: p("esarp-035.jpeg"), category: "geometrik", description: "Vakko siyah ve gri tonlarında chevron (ok ucu) geometrik desenli twill ipek esarp. Monokrom şıklığın temsilcisi.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Gri-Beyaz", careInstructions: CARE_SILK },
  { id: 6, name: "Vakko Twill İpek Esarp - Çizgili Siyah-Beyaz Mini", brand: "Vakko", price: 1990, image: p("esarp-036.jpeg"), category: "geometrik", description: "Vakko siyah-beyaz dalga çizgili twill ipek esarp. Pembe bordür detayiyla minimalist ve modern. Kompakt boyutuyla her kombine uyumlu.", material: "%100 İpek Twill", size: "70x70 cm", color: "Siyah-Beyaz-Pembe", careInstructions: CARE_SILK },
  { id: 7, name: "Vakko Twill İpek Esarp - Pudra Gül Buketi", brand: "Vakko", price: 2390, oldPrice: 2890, image: p("esarp-037.jpeg"), category: "desenli", isNew: true, description: "Vakko pudra ve somon tonlarında büyük gül buketi desenli twill ipek esarp. Vakko özel kırmızı çantasıyla sunulan premium parça.", material: "%100 İpek Twill", size: "90x90 cm", color: "Pudra-Somon", careInstructions: CARE_SILK },
  { id: 8, name: "Vakko Twill İpek Esarp - Geometrik Retro", brand: "Vakko", price: 2590, image: p("esarp-038.jpeg"), category: "geometrik", description: "Vakko retro geometrik desenli twill ipek esarp. Canlı renklerle 70'ler estetiğinden ilham alan cesur ve dikkat çekici tasarım.", material: "%100 İpek Twill", size: "90x90 cm", color: "Retro Çok Renkli", careInstructions: CARE_SILK },

  // ==================== BELLI ====================
  { id: 9, name: "Belli Twill İpek Esarp - Dalga Mavi", brand: "Belli", price: 1753, image: p("esarp-028.jpeg"), category: "ipek-esarp", isNew: true, description: "Belli lacivert zemin üzerinde beyaz dalga ve çiçek bordür desenli twill ipek esarp. Zarif dalga motifleri iç içe geçen katmanlar oluşturur.", material: "%100 İpek Twill", size: "90x90 cm", color: "Lacivert-Beyaz", careInstructions: CARE_SILK },
  { id: 10, name: "Belli Twill İpek Esarp - Vintage Gül Yeşil-Kahve", brand: "Belli", price: 1849, oldPrice: 2400, image: p("esarp-029.jpeg"), category: "desenli", description: "Belli koyu yeşil zemin üzerinde vintage gül buketi desenli twill ipek esarp. Kırmızı, pembe ve sari güller sulu boya efektinde.", material: "%100 İpek Twill", size: "90x90 cm", color: "Yeşil-Kırmızı-Pembe", careInstructions: CARE_SILK },

  // ==================== VISSONA ====================
  { id: 11, name: "Vissona Twill İpek Esarp - Soyut Şehir Gri", brand: "Vissona", price: 1449, image: p("esarp-060.jpeg"), category: "geometrik", description: "Vissona siyah ve gri tonlarında soyut şehir silüeti desenli twill ipek esarp. Modern çizgiler ve fırça darbeleriyle avangard.", material: "%100 İpek Twill", size: "90x90 cm", color: "Gri-Siyah-Beyaz", careInstructions: CARE_SILK },
  { id: 12, name: "Vissona Twill İpek Esarp - Soyut Şehir Mavi", brand: "Vissona", price: 1449, image: p("esarp-065.jpeg"), category: "ipek-esarp", isNew: true, description: "Vissona mavi ve bej tonlarında soyut şehir silüeti desenli twill ipek esarp. Aynı serinin mavi varyasyonu.", material: "%100 İpek Twill", size: "90x90 cm", color: "Mavi-Bej-Beyaz", careInstructions: CARE_SILK },
  { id: 13, name: "Vissona Twill İpek Esarp - Soyut Şehir Pembe-Mavi", brand: "Vissona", price: 1549, oldPrice: 1999, image: p("esarp-070.jpeg"), category: "geometrik", description: "Vissona pembe ve mavi tonlarında soyut şehir silüeti desenli twill ipek esarp. Canlı renk kombinasyonuyla göz alıcı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Pembe-Mavi", careInstructions: CARE_SILK },
  { id: 14, name: "Vissona Twill İpek Esarp - Soyut Fusya-Mavi-Yeşil", brand: "Vissona", price: 1549, image: p("esarp-072.jpeg"), category: "geometrik", isNew: true, description: "Vissona fusya, mavi ve yeşil tonlarında soyut geometrik desenli twill ipek esarp. Model üzerinde gösterilen özel kombinleme stili.", material: "%100 İpek Twill", size: "90x90 cm", color: "Fusya-Mavi-Yeşil", careInstructions: CARE_SILK },
  { id: 15, name: "Vissona Twill İpek Esarp - Soyut Kahve Tipografi", brand: "Vissona", price: 1349, oldPrice: 1799, image: p("esarp-077.jpeg"), category: "geometrik", isNew: true, description: "Vissona %100 twill ipek esarp. Kahverengi tonlarında soyut harf ve tipografi motifleri. Fırça darbeleri efektiyle modern.", material: "%100 İpek Twill", size: "90x90 cm", color: "Kahve-Bej-Siyah", careInstructions: CARE_SILK },

  // ==================== LÜKS MARKA ESARPLARI ====================
  { id: 43, name: "Monogram Esarp - Siyah-Beyaz Klasik", brand: "Premium", price: 4990, oldPrice: 5990, image: p("esarp-073.jpeg"), category: "lux", isLimited: true, stock: 2, description: "Premium siyah zemin üzerinde beyaz monogram motifleri twill ipek esarp. Klasik ve zamansız şıklık.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Beyaz", careInstructions: CARE_SILK },
  { id: 44, name: "Monogram GG Esarp - Siyah", brand: "Premium", price: 4790, image: p("esarp-074.jpeg"), category: "lux", description: "Premium siyah zemin üzerinde ton-sur-ton GG monogram desenli ipek esarp. Gold yazi bordürlu sofistike tasarım.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Gold", careInstructions: CARE_SILK },
  { id: 45, name: "Floral Esarp - Bordo Gül Bahcesi", brand: "Premium", price: 5490, oldPrice: 6490, image: p("esarp-075.jpeg"), category: "lux", isLimited: true, stock: 3, description: "Premium bordo zemin üzerinde pembe ve beyaz gül buketi desenli ipek esarp. Krem bordürlu romantik ve zarif.", material: "%100 İpek", size: "90x90 cm", color: "Bordo-Pembe-Krem", careInstructions: CARE_SILK },
  { id: 46, name: "Ekose Esarp - Nova Check Klasik", brand: "Premium", price: 4990, image: p("esarp-076.jpeg"), category: "lux", isNew: true, description: "Premium bej zemin üzerinde klasik ekose kare desen. Lacivert bordürlu zamansız İngiliz tarzı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Bej-Kırmızı-Siyah", careInstructions: CARE_SILK },

  // ==================== EK URUNLER (mevcut fotograflarla) ====================
  { id: 47, name: "Vakko Pamuk İpek Sal - Pudra Gül", brand: "Vakko", price: 1890, image: p("esarp-037.jpeg"), category: "sal", description: "Vakko pamuk-ipek karışımlı sal. Pudra gül deseniyle her kombine zarif bir dokunuş katar. Yumuşacık doku.", material: "Pamuk-İpek", size: "68x200 cm", color: "Pudra", careInstructions: CARE_COTTON },
  { id: 48, name: "Armine Tivil İpek Esarp - Siyah Paisley", brand: "Armine", price: 2700, image: p("esarp-031.jpeg"), category: "ipek-esarp", description: "Armine siyah paisley desenli tivil ipek esarp. Zengin motiflerle zamansız zarafet.", material: "%100 İpek Tivil", size: "90x90 cm", color: "Siyah-Kırmızı-Turuncu", careInstructions: CARE_SILK },
  { id: 49, name: "Armine İpek Sal - Gül Kurusu", brand: "Armine", price: 3400, oldPrice: 4200, image: p("esarp-037.jpeg"), category: "sal", isNew: true, description: "Armine ipek sal, gül kurusu pudra tonunda çiçek deseni. Uzun boy formuyla çok yönlü kullanım.", material: "%100 İpek", size: "70x200 cm", color: "Gül Kurusu-Pudra", careInstructions: CARE_SILK },
  { id: 50, name: "Aker Twill Esarp - Sari Çiçekli", brand: "Aker", price: 1990, image: p("esarp-034.jpeg"), category: "desenli", isNew: true, description: "Aker hardal sari ve kahve zemin üzerinde beyaz çiçek motifli twill esarp.", material: "%100 İpek Twill", size: "90x90 cm", color: "Hardal-Kahve", careInstructions: CARE_SILK },
  { id: 51, name: "Aker Twill Esarp - Siyah Chevron", brand: "Aker", price: 1990, image: p("esarp-035.jpeg"), category: "geometrik", description: "Aker siyah ve gri chevron desenli twill ipek esarp. Zamansiz monokrom.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Gri", careInstructions: CARE_SILK },

  // ==================== MEVCUT DIGER ESARPLAR ====================
  { id: 52, name: "Vissona Twill Esarp - Şehir Silüeti Lacivert", brand: "Vissona", price: 1449, image: p("esarp-061.jpeg"), category: "ipek-esarp", isNew: true, description: "Vissona lacivert tonlarında şehir silüeti desenli twill ipek esarp. Soyut fırça darbeleriyle modern sanat etkisi.", material: "%100 İpek Twill", size: "90x90 cm", color: "Lacivert-Beyaz", careInstructions: CARE_SILK },
  { id: 53, name: "Vissona Twill Esarp - Şehir Silüeti Yeşil", brand: "Vissona", price: 1449, image: p("esarp-062.jpeg"), category: "ipek-esarp", description: "Vissona yeşil tonlarında şehir silüeti desenli twill ipek esarp. Soyut fırça darbeleriyle doğa ilhamlı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Yeşil-Beyaz", careInstructions: CARE_SILK },
  { id: 54, name: "Vissona Twill Esarp - Şehir Silüeti Bordo", brand: "Vissona", price: 1549, oldPrice: 1999, image: p("esarp-063.jpeg"), category: "ipek-esarp", description: "Vissona bordo tonlarında şehir silüeti desenli twill ipek esarp. Sıcak sonbahar tonlarında.", material: "%100 İpek Twill", size: "90x90 cm", color: "Bordo-Bej", careInstructions: CARE_SILK },
  { id: 55, name: "Vissona Twill Esarp - Şehir Silüeti Turuncu", brand: "Vissona", price: 1449, image: p("esarp-064.jpeg"), category: "ipek-esarp", isNew: true, description: "Vissona turuncu tonlarında şehir silüeti desenli twill ipek esarp. Canlı ve enerjik.", material: "%100 İpek Twill", size: "90x90 cm", color: "Turuncu-Beyaz", careInstructions: CARE_SILK },
  { id: 56, name: "Vissona Twill Esarp - Şehir Silüeti Kahve", brand: "Vissona", price: 1549, image: p("esarp-066.jpeg"), category: "ipek-esarp", description: "Vissona kahve tonlarında şehir silüeti desenli twill ipek esarp. Sonbahar-kış kombini için ideal.", material: "%100 İpek Twill", size: "90x90 cm", color: "Kahve-Bej", careInstructions: CARE_SILK },
  { id: 57, name: "Vissona Twill Esarp - Şehir Silüeti Pembe", brand: "Vissona", price: 1449, image: p("esarp-067.jpeg"), category: "ipek-esarp", description: "Vissona pembe tonlarında şehir silüeti desenli twill ipek esarp. Romantik ve ferah.", material: "%100 İpek Twill", size: "90x90 cm", color: "Pembe-Beyaz", careInstructions: CARE_SILK },
  { id: 58, name: "Vissona Twill Esarp - Şehir Silüeti Siyah", brand: "Vissona", price: 1549, oldPrice: 1999, image: p("esarp-068.jpeg"), category: "ipek-esarp", isLimited: true, stock: 4, description: "Vissona siyah tonlarında şehir silüeti desenli twill ipek esarp. Dramatik ve sofistike. Sınırlı üretim.", material: "%100 İpek Twill", size: "90x90 cm", color: "Siyah-Gri", careInstructions: CARE_SILK },
  { id: 59, name: "Vissona Twill Esarp - Şehir Silüeti Kırmızı", brand: "Vissona", price: 1449, image: p("esarp-069.jpeg"), category: "ipek-esarp", isNew: true, description: "Vissona kırmızı tonlarında şehir silüeti desenli twill ipek esarp. Cesur ve göz alıcı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Kırmızı-Beyaz", careInstructions: CARE_SILK },
  { id: 60, name: "Vissona Twill Esarp - Şehir Silüeti Turkuaz", brand: "Vissona", price: 1549, image: p("esarp-071.jpeg"), category: "ipek-esarp", description: "Vissona turkuaz tonlarında şehir silüeti desenli twill ipek esarp. Yaz mevsiminin ferah renkleri.", material: "%100 İpek Twill", size: "90x90 cm", color: "Turkuaz-Beyaz", careInstructions: CARE_SILK },

  // ==================== EK ESARPLAR (kalan dosyalar) ====================
  { id: 68, name: "Belli Saf İpek Esarp - Dalga Mavi Klasik", brand: "Belli", price: 1849, oldPrice: 2800, image: p("esarp-028.jpeg"), category: "ipek-esarp", isLimited: true, stock: 3, description: "Belli 2026 koleksiyonu, mavi dalga desenli saf ipek esarp. Sınırlı üretim.", material: "%100 Saf İpek", size: "90x90 cm", color: "Lacivert-Beyaz", careInstructions: CARE_SILK },
  { id: 69, name: "Belli Tivil Esarp - Yeşil Vintage Gul", brand: "Belli", price: 1753, image: p("esarp-029.jpeg"), category: "ipek-esarp", description: "Belli vintage gül buketi desenli tivil ipek esarp. Koyu yeşil zemin.", material: "%100 İpek Twill", size: "90x90 cm", color: "Yeşil-Kırmızı", careInstructions: CARE_SILK },
  { id: 70, name: "Armine Sura İpek Esarp - Mavi Kare", brand: "Armine", price: 2700, image: p("esarp-030.jpeg"), category: "ipek-esarp", description: "Armine buz mavisi tonlarında kare ve fırça darbeli desen. Modern ve sik.", material: "%100 İpek Sura", size: "90x90 cm", color: "Mavi-Buz Mavisi", careInstructions: CARE_SILK },
  { id: 71, name: "Aker Twill Esarp - Osmanlı Lacivert", brand: "Aker", price: 2130, image: p("esarp-032.jpeg"), category: "ipek-esarp", isNew: true, description: "Aker lacivert Osmanlı motifli twill ipek esarp. Turkuaz detaylarla görkemli.", material: "%100 İpek Twill", size: "90x90 cm", color: "Lacivert-Turkuaz", careInstructions: CARE_SILK },
  { id: 73, name: "Vissona Medine Ipegi Sal - Siyah", brand: "Vissona", price: 349, image: p("esarp-035.jpeg"), category: "sal", description: "Vissona siyah medine ipegi sal. Her kombine uyum saglayan temel parça.", material: "Medine Ipegi", size: "75x200 cm", color: "Siyah", careInstructions: CARE_COTTON },
  { id: 75, name: "Belli Fresh Berlin Sal - Siyah", brand: "Belli", price: 264, image: p("esarp-036.jpeg"), category: "sal", description: "Belli Fresh Berlin serisi sal. Siyah-beyaz çizgili, pembe bordür.", material: "Pamuk Karisim", size: "70x200 cm", color: "Siyah-Beyaz", careInstructions: CARE_COTTON },
  { id: 76, name: "Vissona Medine Ipegi Sal - Pudra", brand: "Vissona", price: 399, image: p("esarp-037.jpeg"), category: "sal", description: "Vissona lux medine ipegi sal. Pudra çiçek tonlarında günlük kullanıma uygun.", material: "Medine Ipegi", size: "75x200 cm", color: "Pudra", careInstructions: CARE_COTTON },
  { id: 77, name: "Vakko Twill İpek Esarp - Kareli Vizon", brand: "Vakko", price: 2390, image: p("esarp-041.jpeg"), category: "geometrik", description: "Vakko vizon ve kahve tonlarında kareli twill ipek esarp. Sonbahar-kış için sıcak ve zarif.", material: "%100 İpek Twill", size: "90x90 cm", color: "Vizon-Kahve", careInstructions: CARE_SILK },
  { id: 78, name: "Vakko Twill İpek Esarp - Modern Soyut", brand: "Vakko", price: 2490, oldPrice: 2990, image: p("esarp-044.jpeg"), category: "ipek-esarp", isNew: true, description: "Vakko modern soyut desenli twill ipek esarp. Canlı renklerle dinamik ve göz alıcı.", material: "%100 İpek Twill", size: "90x90 cm", color: "Çok Renkli", careInstructions: CARE_SILK },
  { id: 79, name: "Vakko Twill İpek Esarp - Klasik Bordür", brand: "Vakko", price: 2290, image: p("esarp-046.jpeg"), category: "ipek-esarp", description: "Vakko klasik bordür desenli twill ipek esarp. Zarif ve zamansız.", material: "%100 İpek Twill", size: "90x90 cm", color: "Klasik", careInstructions: CARE_SILK },
  { id: 80, name: "Vakko Twill İpek Esarp - Doga Ilhamli", brand: "Vakko", price: 2690, oldPrice: 3290, image: p("esarp-054.jpeg"), category: "desenli", isLimited: true, stock: 4, description: "Vakko doğa ilhamlı desenlerle suslenmiş twill ipek esarp. Sınırlı üretim.", material: "%100 İpek Twill", size: "90x90 cm", color: "Doga Tonlari", careInstructions: CARE_SILK },
  { id: 81, name: "Vissona Twill Esarp - Soyut Grafik", brand: "Vissona", price: 1349, image: p("esarp-057.jpeg"), category: "geometrik", description: "Vissona soyut grafik desenli twill ipek esarp. Modern sanat etkisi.", material: "%100 İpek Twill", size: "90x90 cm", color: "Çok Renkli", careInstructions: CARE_SILK },
  { id: 82, name: "Vissona Twill Esarp - Soyut Fırça", brand: "Vissona", price: 1449, oldPrice: 1999, image: p("esarp-058.jpeg"), category: "desenli", isNew: true, description: "Vissona soyut fırça darbeleri desenli twill ipek esarp. Sanatsal ve ozgun.", material: "%100 İpek Twill", size: "90x90 cm", color: "Çok Renkli", careInstructions: CARE_SILK },

  // ==================== ZERAFETIM (JSON içe aktarımı) ====================
  ...zerafetimProducts,
];

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductsBySubCategory(subCategory: string): Product[] {
  return allProducts.filter((p) => p.subCategory === subCategory);
}

export function getNewProducts(): Product[] {
  return allProducts.filter((p) => p.isNew);
}

export function getLimitedProducts(): Product[] {
  return allProducts.filter((p) => p.isLimited);
}

export function getProductsByBrand(brand: string): Product[] {
  return allProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, limit);
}

export function handleWhatsAppOrder(product: Product) {
  return getProductOrderWhatsAppUrl(product.name);
}
