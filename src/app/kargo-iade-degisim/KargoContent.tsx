"use client";

import { ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function KargoContent() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">{t.kargo.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">{t.kargo.subtitle}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <Truck className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t.kargo.shipTitle}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {t.kargo.ship.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t.kargo.returnTitle}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {t.kargo.ret.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t.kargo.hygieneTitle}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {t.kargo.hyg.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="mb-5 flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">{t.kargo.exchangeTitle}</h2>
            </div>
            <ul className="space-y-3 text-gray-600">
              {t.kargo.ex.map((rule) => (
                <li key={rule}>- {rule}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
