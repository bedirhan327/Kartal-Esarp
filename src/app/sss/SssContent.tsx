"use client";

import { useMemo } from "react";
import { useLocale } from "@/context/LocaleContext";

export default function SssContent() {
  const { t } = useLocale();

  const faqItems = useMemo(
    () => [
      { question: t.sss.q1, answer: t.sss.a1 },
      { question: t.sss.q2, answer: t.sss.a2 },
      { question: t.sss.q3, answer: t.sss.a3 },
      { question: t.sss.q4, answer: t.sss.a4 },
      { question: t.sss.q5, answer: t.sss.a5 },
      { question: t.sss.q6, answer: t.sss.a6 },
    ],
    [t],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">{t.sss.title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-white/85">{t.sss.subtitle}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-2xl bg-white p-6 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">{item.question}</summary>
                <p className="mt-3 leading-relaxed text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
