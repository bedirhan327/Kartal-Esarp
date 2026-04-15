import type { Metadata } from "next";
import KargoContent from "./KargoContent";

export const metadata: Metadata = {
  title: "Kargo, İade ve Değişim",
  description:
    "Kartal Eşarp kargo, iade ve değişim koşulları. Süreler, kargo ücretleri ve hijyen kurallarını net şekilde inceleyin.",
};

export default function KargoIadeDegisimPage() {
  return <KargoContent />;
}
