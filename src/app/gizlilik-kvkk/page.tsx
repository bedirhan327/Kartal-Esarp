import type { Metadata } from "next";
import GizlilikContent from "./GizlilikContent";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK Aydınlatma",
  description:
    "Kartal Eşarp gizlilik, çerez kullanımı ve KVKK kapsamında kişisel veri işleme süreçlerine dair bilgilendirme metni.",
};

export default function GizlilikKvkkPage() {
  return <GizlilikContent />;
}
