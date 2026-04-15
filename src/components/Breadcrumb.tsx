import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center gap-1.5 text-sm">
          <Link href="/" className="flex items-center gap-1 text-gray-400 transition-colors hover:text-purple-600">
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
                <span className="font-medium text-gray-900 truncate max-w-[200px]">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
