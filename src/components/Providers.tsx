"use client";

import { LocaleProvider } from "@/context/LocaleContext";
import { CompareProvider } from "@/components/CompareBar";
import { WishlistProvider } from "@/context/WishlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <WishlistProvider>
        <CompareProvider>{children}</CompareProvider>
      </WishlistProvider>
    </LocaleProvider>
  );
}
