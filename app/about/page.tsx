"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { analyticsApi } from "@/lib/api";
import { FaPinterest } from "react-icons/fa";
import { Heart, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function InViewSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const values = [
  {
    icon: Heart,
    title: "Curated with Love",
    body: "Every product is hand-picked — no filler, no fast fashion. If we wouldn't put it in our own home, it doesn't make the list.",
  },
  {
    icon: Sparkles,
    title: "Aesthetic First",
    body: "We believe your home should feel like you. We look for pieces that are beautiful, timeless, and work across Indian living spaces.",
  },
  {
    icon: ShieldCheck,
    title: "Honest & Transparent",
    body: "We link directly to Amazon listings. No inflated prices, no hidden markups. What you see is what you pay.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    analyticsApi.pageView("/about");
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream-50">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-cream-200 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-400/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blush-100/60 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="text-xs font-medium tracking-widest uppercase text-gold-500 mb-4"
            >
              Our Story
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-obsidian-900 leading-[1.1] mb-6"
            >
              A home that feels{" "}
              <em className="text-gold-500 not-italic">like you</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-base md:text-lg text-obsidian-700/60 max-w-2xl mx-auto leading-relaxed"
            >
              NestByStyle is a curated home décor destination built for Indian homes —
              finding the most beautiful, affordable Amazon finds so you don't have to scroll for hours.
            </motion.p>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-cream-200 to-transparent" />
        </div>

        {/* ── Origin Story ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

            {/* Image mosaic */}
            <InViewSection>
              <div className="relative">
                {/* Large card */}
                <div className="rounded-2xl overflow-hidden shadow-luxury aspect-[4/5] bg-cream-200">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                    alt="Elegant home interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating accent card */}
                <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden shadow-luxury-hover border-4 border-cream-50">
                  <img
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
                    alt="Cozy living room corner"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gold dot accent */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gold-400/20 border border-gold-400/30" />
              </div>
            </InViewSection>

            {/* Text */}
            <InViewSection className="space-y-6">
              <p className="text-xs font-medium tracking-widest uppercase text-gold-500">
                How it started
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-obsidian-900 leading-tight">
                Born from a love of beautiful spaces
              </h2>
              <div className="space-y-4 text-obsidian-700/65 text-sm leading-relaxed">
                <p>
                  It started with a frustration we all know — spending hours scrolling Amazon
                  trying to find home pieces that actually look good, only to end up overwhelmed
                  or disappointed when they arrive.
                </p>
                <p>
                  NestByStyle was created to solve exactly that. We do the searching, filtering,
                  and styling so you can simply discover and shop. Every product you see here has
                  been personally reviewed for quality, aesthetics, and value for Indian homes.
                </p>
                <p>
                  We're a small team with a big passion for interiors — and we believe everyone
                  deserves a home that feels intentional, beautiful, and uniquely theirs.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="https://pin.it/5XjdsY9s4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-obsidian-900 hover:text-gold-500 transition-colors duration-200 group"
                >
                  <FaPinterest size={16} className="text-gold-400" />
                  Follow us on Pinterest
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </InViewSection>
          </div>
        </section>

        {/* ── Values ────────────────────────────────────────────────────────── */}
        <section className="bg-obsidian-900 py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <InViewSection className="text-center mb-16">
              <p className="text-xs font-medium tracking-widest uppercase text-gold-400 mb-3">
                What we stand for
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-white">
                Our values
              </h2>
            </InViewSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map(({ icon: Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i * 1.5}
                  className="group p-8 rounded-2xl border border-white/8 hover:border-gold-400/30 hover:bg-white/3 transition-all duration-400"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center mb-5 group-hover:bg-gold-400/20 transition-colors duration-300">
                    <Icon size={18} className="text-gold-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-medium text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we curate ────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            <InViewSection className="space-y-6">
              <p className="text-xs font-medium tracking-widest uppercase text-gold-500">
                What you'll find
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-obsidian-900 leading-tight">
                Everything your home deserves
              </h2>
              <p className="text-sm text-obsidian-700/60 leading-relaxed">
                From statement furniture to the smallest candle holder — we curate across every
                room and every budget. All products link directly to Amazon India so you can
                shop with confidence, fast delivery, and easy returns.
              </p>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Living Room", "Bedroom", "Kitchen", "Lighting", "Ceramics", "Textiles", "Wall Art", "Candles"].map((cat) => (
                  <span
                    key={cat}
                    className="text-xs font-medium tracking-wide px-3 py-1.5 bg-cream-100 text-obsidian-700 rounded-full border border-cream-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-obsidian-900 hover:bg-obsidian-700 text-white text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300 group"
                >
                  Browse All Products
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </InViewSection>

            {/* Image grid */}
            <InViewSection>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80", alt: "Bedroom decor", tall: true },
                  { src: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=400&q=80", alt: "Kitchen accessories", tall: false },
                  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", alt: "Candles", tall: false },
                  { src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80", alt: "Living room", tall: true },
                ].map(({ src, alt, tall }) => (
                  <div
                    key={alt}
                    className={`rounded-2xl overflow-hidden bg-cream-200 shadow-card ${tall ? "row-span-2" : ""}`}
                    style={{ aspectRatio: tall ? "3/4" : "4/3" }}
                  >
                    <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </InViewSection>
          </div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <InViewSection>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-obsidian-900 to-obsidian-800 px-8 py-16 md:px-16 md:py-20 text-center shadow-luxury">
              {/* Subtle gold glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-400/10 blur-3xl rounded-full" />
              <p className="relative text-xs font-medium tracking-widest uppercase text-gold-400 mb-3">
                Ready to transform your space?
              </p>
              <h2 className="relative font-display text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Start exploring today
              </h2>
              <p className="relative text-sm text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
                Hundreds of hand-picked pieces waiting for your home. New products added every week.
              </p>
              <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-400 hover:bg-gold-500 text-obsidian-900 text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300 group"
                >
                  Shop the Collection
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </InViewSection>
        </section>

      </main>
      <Footer />
    </>
  );
}