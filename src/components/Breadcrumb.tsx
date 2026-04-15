"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { t } = useLocale();

  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link href="/" className="flex items-center gap-1 text-gray-400 transition-colors hover:text-purple-600" aria-label={t.breadcrumb.homeAria}>
            <Home className="h-3.5 w-3.5" />
          </Link>
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-gray-300" />
              {item.href ? (
                <Link href={item.href} className="text-gray-500 transition-colors hover:text-purple-600">
                  {item.label}
                </Link>
              ) : (
                <span className="max-w-[200px] truncate font-medium text-gray-900">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
