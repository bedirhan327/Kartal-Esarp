"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { CompareProvider } from "@/components/CompareBar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <CompareProvider>{children}</CompareProvider>
    </LocaleProvider>
  );
}
