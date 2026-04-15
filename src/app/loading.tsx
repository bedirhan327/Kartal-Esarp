"use client";

import { useLocale } from "@/context/LocaleContext";

export default function Loading() {
  const { t } = useLocale();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        <p className="text-sm text-gray-400">{t.common.loading}</p>
      </div>
    </div>
  );
}
