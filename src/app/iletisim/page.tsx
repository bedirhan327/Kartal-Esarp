"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/products";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Iletisim() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white md:text-5xl">
            İletişim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80"
          >
            Size yardımcı olmak için buradayız
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Bize ulaşın</h2>
              <p className="text-gray-600 leading-relaxed">
                Soru, öneri veya siparişleriniz için aşağıdaki kanallardan bize ulaşabilirsiniz. WhatsApp üzerinden en hızlı dönüş bizden!
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Phone className="h-5 w-5" />, title: "Telefon", value: "+90 554 240 07 64", subtitle: "Hafta içi 09:00 - 18:00", href: "tel:+905542400764" },
                  { icon: <MessageCircle className="h-5 w-5" />, title: "WhatsApp", value: "+90 554 240 07 64", subtitle: "Her gün 09:00 - 22:00", href: "https://wa.me/905542400764" },
                  {
                    icon: <MapPin className="h-5 w-5" />,
                    title: "Adres",
                    value: "Sebilerenler Caddesi, Alipaşa Mah., Merkez / Kütahya",
                    subtitle: "Showroom ziyareti için randevu alınız",
                  },
                  { icon: <Clock className="h-5 w-5" />, title: "Çalışma saatleri", value: "Pazartesi - Cumartesi", subtitle: "09:00 - 18:00" },
                ].map((item) => {
                  const Wrapper = item.href ? "a" : "div";
                  const wrapperProps = item.href ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined } : {};
                  return (
                    <Wrapper key={item.title} {...wrapperProps} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm font-medium text-purple-600">{item.value}</p>
                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </motion.div>

            {/* Order steps + map */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-8">
              <div className="rounded-3xl bg-white p-8 shadow-lg">
                <h3 className="mb-6 text-xl font-bold text-gray-900">WhatsApp ile sipariş süreci</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: 1,
                      title: "Ürün seç",
                      desc: "Beğendiğiniz ürünün sayfasındaki «WhatsApp ile sipariş ver» düğmesine tıklayın.",
                    },
                    {
                      step: 2,
                      title: "Mesaj gönder",
                      desc: "Otomatik olarak hazırlanan mesajı WhatsApp üzerinden bize gönderin.",
                    },
                    {
                      step: 3,
                      title: "Onay alın",
                      desc: "Sipariş detayları ve teslimat bilgilerinizi paylaşarak siparişinizi tamamlayın.",
                    },
                    {
                      step: 4,
                      title: "Teslim alın",
                      desc: "Siparişleriniz 1-3 iş günü içinde kargoya verilerek adresinize ulaştırılır.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-bold text-white shadow-lg">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a href={getWhatsAppUrl("Merhaba, Kartal Eşarp hakkında bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" className="whatsapp-button w-full rounded-full bg-green-500 py-6 text-lg text-white hover:bg-green-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Hemen WhatsApp ile iletişime geçin
                </Button>
              </a>

              {/* Konum: Sebilerenler Caddesi — gömülü harita + Google Haritalar bağlantısı */}
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500!2d29.990145!3d39.421322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c9a1f5a93d0e1d%3A0x3f5e5b7a5a9c8e0!2sSebilerenler%20Caddesi%2C%20K%C3%BCtahya!5e0!3m2!1str!2str!4v1710000000000!5m2!1str!2str"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sebilerenler Caddesi, Kütahya harita"
                />
              </div>
              <p className="text-center text-sm text-gray-500">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sebilerenler+Caddesi%2C+Alipa%C5%9Fa+Mah.%2C+43020+Merkez%2FK%C3%BCtahya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple-600 underline underline-offset-2 hover:text-purple-800"
                >
                  Konumu Google Haritalar&apos;da aç
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
