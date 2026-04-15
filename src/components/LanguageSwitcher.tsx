"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/context/LocaleContext";
import type { Locale } from "@/lib/i18n/types";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.ariaLanguage}
        className="flex h-10 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-purple-300 hover:text-purple-600"
      >
        <Globe className="h-4 w-4 shrink-0 text-purple-600" />
        <span className="uppercase tabular-nums">{locale}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-[60] mt-2 min-w-[160px] overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-2xl"
        >
          <button
            type="button"
            role="option"
            aria-selected={locale === "tr"}
            className={cn(
              "flex w-full items-center px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-purple-50",
              locale === "tr" && "bg-purple-50 text-purple-700",
            )}
            onClick={() => pick("tr")}
          >
            Türkçe
          </button>
          <button
            type="button"
            role="option"
            aria-selected={locale === "en"}
            className={cn(
              "flex w-full items-center px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-purple-50",
              locale === "en" && "bg-purple-50 text-purple-700",
            )}
            onClick={() => pick("en")}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
