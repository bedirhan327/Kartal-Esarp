"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/context/LocaleContext";

const STORAGE_KEY = "kartal_esarp_cookie_consent_v1";

export default function CookieBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem(STORAGE_KEY);
  });

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-purple-200 bg-white/95 shadow-2xl backdrop-blur">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-gray-700">
          {t.cookie.textBefore}{" "}
          <Link href="/gizlilik-kvkk" className="font-semibold text-purple-600 underline underline-offset-2">
            {t.cookie.privacyLink}
          </Link>{" "}
          {t.cookie.textAfter}
        </p>
        <div className="flex gap-2">
          <Link href="/gizlilik-kvkk">
            <Button variant="outline" className="rounded-full">
              {t.cookie.details}
            </Button>
          </Link>
          <Button onClick={accept} className="rounded-full bg-purple-600 hover:bg-purple-700">
            {t.cookie.accept}
          </Button>
        </div>
      </div>
    </div>
  );
}
