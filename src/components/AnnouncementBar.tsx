"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

const STORAGE_KEY = "kartal-ann-dismissed";

export default function AnnouncementBar() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  const msgs = [t.announcement.msg1, t.announcement.msg2, t.announcement.msg3];

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % msgs.length), 4000);
    return () => clearInterval(timer);
  }, [visible, msgs.length]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 text-white"
        >
          <div className="container mx-auto flex items-center justify-center px-8 py-2.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-center text-xs font-semibold tracking-wide sm:text-sm"
              >
                {msgs[idx]}
              </motion.p>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.announcement.close}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
