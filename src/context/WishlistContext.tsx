"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface WishlistContextType {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  ids: [],
  toggle: () => {},
  has: () => false,
  count: 0,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kartal-wishlist");
      if (stored) setIds(JSON.parse(stored));
    } catch {}
    setMounted(true);
  }, []);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("kartal-wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const has = useCallback((id: number) => ids.includes(id), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, count: mounted ? ids.length : 0 }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
