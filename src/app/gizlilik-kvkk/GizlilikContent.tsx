"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export default function GizlilikContent() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">{t.gizlilik.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">{t.gizlilik.subtitle}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl space-y-6 px-4">
          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">{t.gizlilik.s1t}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{t.gizlilik.s1p}</p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">{t.gizlilik.s2t}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{t.gizlilik.s2p}</p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">{t.gizlilik.s3t}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{t.gizlilik.s3p}</p>
          </article>

          <article className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">{t.gizlilik.s4t}</h2>
            <p className="mt-3 leading-relaxed text-gray-600">{t.gizlilik.s4p}</p>
            <p className="mt-2 text-gray-600">
              {t.gizlilik.s4contactPrefix}{" "}
              <Link href="/iletisim" className="font-semibold text-purple-600 underline underline-offset-2">
                {t.gizlilik.s4contactLink}
              </Link>{" "}
              {t.gizlilik.s4contactSuffix}
            </p>
          </article>

          <p className="text-sm text-gray-500">{t.gizlilik.foot}</p>
        </div>
      </section>
    </div>
  );
}
