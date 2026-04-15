"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, MapPin, PackageCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppTemplateUrl } from "@/lib/whatsapp";
import { useLocale } from "@/context/LocaleContext";

const panelSpring = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.85 };

export default function WhatsAppFAB() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-0"
        >
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key="wa-panel"
                initial={{ opacity: 0, y: 24, scale: 0.9, x: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 16, scale: 0.92, x: 8, filter: "blur(2px)" }}
                transition={panelSpring}
                style={{ transformOrigin: "bottom right" }}
                className="mb-3 w-72 rounded-2xl border border-green-100 bg-white p-3 shadow-2xl"
              >
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{t.whatsappFab.title}</p>
                <div className="space-y-2">
                  <a
                    href={getWhatsAppTemplateUrl("order")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <PackageCheck className="h-4 w-4 text-green-600" />
                    {t.whatsappFab.order}
                  </a>
                  <a
                    href={getWhatsAppTemplateUrl("question")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <HelpCircle className="h-4 w-4 text-green-600" />
                    {t.whatsappFab.question}
                  </a>
                  <a
                    href={getWhatsAppTemplateUrl("address-update")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-green-50"
                  >
                    <MapPin className="h-4 w-4 text-green-600" />
                    {t.whatsappFab.address}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={toggle}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="whatsapp-button flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600"
            aria-expanded={open}
            aria-label={t.whatsappFab.aria}
          >
            <motion.span animate={{ rotate: open ? 12 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
              <MessageCircle className="h-7 w-7" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
