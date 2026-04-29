"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/*
  Accent overlays — all from the purple/pink brand family so they harmonise.
  Full static strings required for Tailwind JIT.
*/
const CARD_ACCENTS = [
  "from-purple-900/80 via-purple-600/30 to-transparent",   // İpek  — violet/brand
  "from-fuchsia-900/80 via-fuchsia-600/30 to-transparent", // Şal   — fuchsia
  "from-pink-900/80 via-pink-600/30 to-transparent",       // Desenli — pink
  "from-rose-900/80 via-rose-600/30 to-transparent",       // Geo   — rose
] as const;

export interface CollectionItem {
  num: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

/* ─── Single card ─────────────────────────────────────────── */
function CollectionCard({
  col,
  accentClass,
  large,
}: {
  col: CollectionItem;
  accentClass: string;
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={col.href}
      className="relative block w-full h-full overflow-hidden rounded-2xl shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <Image
        src={col.image}
        alt={col.title}
        fill
        className={`object-cover transition-transform duration-700 ease-out ${
          hovered ? "scale-[1.08]" : "scale-100"
        }`}
        sizes="(max-width: 768px) 50vw, 60vw"
      />

      {/* Base dark vignette so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-black/5" />

      {/* Brand-colour hover wash */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-t ${accentClass}`}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* Collection index number */}
      <div className="absolute top-5 left-5 font-mono text-[10px] font-bold tracking-[0.3em] text-white/35 select-none">
        {col.num}
      </div>

      {/* ── Bottom content ─────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        {/* Line that animates in from left */}
        <motion.div
          className="mb-3 h-px bg-gradient-to-r from-white/70 to-transparent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Title */}
        <motion.h3
          className={`font-extrabold tracking-tight text-white ${
            large
              ? "text-2xl md:text-3xl lg:text-4xl"
              : "text-lg md:text-xl lg:text-2xl"
          }`}
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {col.title}
        </motion.h3>

        {/* Description + CTA — only on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-3 flex items-end justify-between gap-3"
            >
              <p className="text-xs leading-relaxed text-white/75 line-clamp-2 md:text-sm">
                {col.desc}
              </p>
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm whitespace-nowrap">
                Keşfet <ArrowUpRight className="h-3 w-3" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
}

/* ─── Showcase section ────────────────────────────────────── */
export default function CollectionsShowcase({
  collections,
  label,
  title,
}: {
  collections: CollectionItem[];
  label: string;
  title: string;
}) {
  if (collections.length < 4) return null;

  return (
    /*
      Background: a very soft lavender→pink gradient built from the site's
      own purple/pink brand palette.  Looks almost white but has warmth —
      never clashes with the white sections above and below it.
    */
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.35em] text-purple-500">
              {label}
            </p>
            <h2 className="text-3xl font-extrabold text-gray-900 md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 md:block">
            4 Koleksiyon
          </p>
        </motion.div>

        {/* ── Desktop: asymmetric bento (5 columns) ────── */}
        {/*
          Row 1 (390 px) → Card 1 spans cols 1-3 (dominant),  Card 2 spans cols 4-5
          Row 2 (265 px) → Card 3 spans cols 1-2,             Card 4 spans cols 3-5 (dominant)
          Diagonal dominance: big top-left ↔ big bottom-right
        */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "390px 265px",
            gap: "10px",
          }}
        >
          <div style={{ gridColumn: "1 / 4", gridRow: "1" }}>
            <CollectionCard
              col={collections[0]}
              accentClass={CARD_ACCENTS[0]}
              large
            />
          </div>
          <div style={{ gridColumn: "4 / 6", gridRow: "1" }}>
            <CollectionCard
              col={collections[1]}
              accentClass={CARD_ACCENTS[1]}
            />
          </div>
          <div style={{ gridColumn: "1 / 3", gridRow: "2" }}>
            <CollectionCard
              col={collections[2]}
              accentClass={CARD_ACCENTS[2]}
            />
          </div>
          <div style={{ gridColumn: "3 / 6", gridRow: "2" }}>
            <CollectionCard
              col={collections[3]}
              accentClass={CARD_ACCENTS[3]}
              large
            />
          </div>
        </motion.div>

        {/* ── Mobile: 2-column grid ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 gap-3 md:hidden"
        >
          {collections.map((col, i) => (
            <div key={i} className="relative aspect-[3/4]">
              <CollectionCard
                col={col}
                accentClass={CARD_ACCENTS[i]}
                large={i === 0 || i === 3}
              />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
