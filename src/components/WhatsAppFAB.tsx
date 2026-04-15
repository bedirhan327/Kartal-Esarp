"use client";

import { useState, useEffect } from "react";
import { MessageCircle, MapPin, PackageCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppTemplateUrl } from "@/lib/whatsapp";

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mb-3 w-72 rounded-2xl border border-green-100 bg-white p-3 shadow-2xl"
              >
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Hazır WhatsApp Mesajları
                </p>
                <div className="space-y-2">
                  <a
                    href={getWhatsAppTemplateUrl("order")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <PackageCheck className="h-4 w-4 text-green-600" />
                    Sipariş başlat
                  </a>
                  <a
                    href={getWhatsAppTemplateUrl("question")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <HelpCircle className="h-4 w-4 text-green-600" />
                    Ürün hakkında soru sor
                  </a>
                  <a
                    href={getWhatsAppTemplateUrl("address-update")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <MapPin className="h-4 w-4 text-green-600" />
                    Adres güncelleme bildir
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="whatsapp-button flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
            aria-label="WhatsApp seçeneklerini aç"
          >
            <MessageCircle className="h-7 w-7" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
