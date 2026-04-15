import type { Metadata } from "next";
import SssContent from "./SssContent";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Kargo, iade, değişim, ipek bakım talimatları ve sipariş süreçleri hakkında Kartal Eşarp sık sorulan sorular sayfası.",
};

export default function SssPage() {
  return <SssContent />;
}
