"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/context/LocaleContext";

export default function Footer() {
  const { t } = useLocale();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 to-pink-900 py-12 text-white">
      <div className="container mx-auto px-4">

        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex items-start gap-4 md:flex-1">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-bold text-white">{t.newsletter.title}</h3>
                <p className="text-sm text-purple-200">{t.newsletter.desc}</p>
              </div>
            </div>
            <div className="md:w-80">
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 rounded-xl bg-green-500/20 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{t.newsletter.success}</p>
                      <p className="text-xs text-purple-200">{t.newsletter.successDesc}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubscribe}
                    className="flex gap-2"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.newsletter.placeholder}
                      required
                      className="min-w-0 flex-1 rounded-full bg-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:bg-white/30"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-purple-900 transition-colors hover:bg-purple-100"
                    >
                      {t.newsletter.button}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              {!subscribed && (
                <p className="mt-2 text-xs text-purple-300">{t.newsletter.privacy}</p>
              )}
            </div>
          </div>
        </motion.div>

        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-2xl font-bold">KARTAL ESARP</h3>
            <p className="text-purple-200">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.quickLinks}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.home}
              </Link>
              <Link href="/yeni-gelenler" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.newArrivals}
              </Link>
              <Link href="/kumas-rehberi" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.fabricGuide}
              </Link>
              <Link href="/sss" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.faq}
              </Link>
              <Link href="/hakkimizda" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.about}
              </Link>
              <Link href="/iletisim" className="block text-purple-200 transition-colors hover:text-white">
                {t.nav.contact}
              </Link>
              <Link href="/kargo-iade-degisim" className="block text-purple-200 transition-colors hover:text-white">
                {t.footer.kargoPage}
              </Link>
              <Link href="/gizlilik-kvkk" className="block text-purple-200 transition-colors hover:text-white">
                {t.footer.privacy}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.collections}</h4>
            <div className="space-y-2">
              <Link href="/koleksiyonlar/ipek-esarp" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav["ipek-esarp"]}
              </Link>
              <Link href="/koleksiyonlar/sal" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.sal}
              </Link>
              <Link href="/koleksiyonlar/desenli" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.desenli}
              </Link>
              <Link href="/koleksiyonlar/geometrik" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.geometrik}
              </Link>
              <Link href="/koleksiyonlar/lux" className="block text-purple-200 transition-colors hover:text-white">
                {t.collectionNav.lux}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold">{t.footer.contact}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-sm text-purple-200">Sebilerenler Caddesi, Kütahya</span>
              </div>
              <a href="tel:+905542400764" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone className="h-5 w-5 shrink-0 text-purple-300" />
                <span className="text-sm text-purple-200">+90 554 240 07 64</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="mb-2 text-purple-200">
            {t.footer.copyright} &copy; {new Date().getFullYear()}
          </p>
          <p className="text-sm text-purple-300">{t.footer.shippingNote}</p>
        </div>
      </div>
    </footer>
  );
}
