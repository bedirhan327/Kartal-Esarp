const WHATSAPP_E164 = "905542400764";

export type WhatsAppTemplateType = "general" | "order" | "question" | "address-update";

const templates: Record<WhatsAppTemplateType, string> = {
  general: "Merhaba, Kartal Eşarp hakkında bilgi almak istiyorum.",
  order:
    "Merhaba, sipariş vermek istiyorum. Ürün adı/kodu: [buraya yazınız]. Teslimat için gerekli bilgileri paylaşabilir misiniz?",
  question: "Merhaba, bir ürün hakkında soru sormak istiyorum. Yardımcı olur musunuz?",
  "address-update":
    "Merhaba, mevcut siparişim için teslimat adresi güncellemesi yapmak istiyorum. Sipariş no: [buraya yazınız].",
};

export function getWhatsAppUrl(prefillMessage?: string): string {
  const base = `https://wa.me/${WHATSAPP_E164}`;
  if (!prefillMessage?.trim()) return base;
  return `${base}?text=${encodeURIComponent(prefillMessage)}`;
}

export function getWhatsAppTemplateUrl(type: WhatsAppTemplateType): string {
  return getWhatsAppUrl(templates[type]);
}

export function getProductOrderWhatsAppUrl(productName: string): string {
  const message = `Merhaba, "${productName}" adlı ürününüzle ilgileniyorum. Sipariş için yardımcı olur musunuz?`;
  return getWhatsAppUrl(message);
}
