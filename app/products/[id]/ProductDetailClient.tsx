"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, ShoppingBag, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { productsApi } from "@/lib/api";
import { shareProduct } from "@/lib/utils";
import { Product } from "@/types";

export default function ProductDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await productsApi.getOne(id);
        setProduct(res.data);
        setRelated(res.related || []);
      } catch (err: any) {
        if (err.status === 404) setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 md:pt-24 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="skeleton rounded-2xl" style={{ aspectRatio: "2/3" }} />
              <div className="space-y-4 pt-8">
                <div className="skeleton h-4 rounded w-1/4" />
                <div className="skeleton h-10 rounded w-3/4" />
                <div className="skeleton h-6 rounded w-1/3" />
                <div className="skeleton h-px rounded w-full mt-4" />
                <div className="space-y-2 mt-4">
                  <div className="skeleton h-3 rounded w-full" />
                  <div className="skeleton h-3 rounded w-5/6" />
                  <div className="skeleton h-3 rounded w-4/5" />
                </div>
                <div className="skeleton h-12 rounded-xl mt-8" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Navbar />
        <p className="font-display text-3xl font-light text-obsidian-700">
          Product not found
        </p>
        <Link href="/" className="text-sm text-gold-500 hover:text-gold-600 underline">
          Back to collection
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 md:pt-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-obsidian-700/60 hover:text-obsidian-900 transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-luxury"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col justify-center space-y-6"
            >
              <div className="space-y-1">
                <span className="text-xs font-medium tracking-widest uppercase text-gold-500">
                  {product.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-light text-obsidian-900 leading-tight">
                  {product.title}
                </h1>
                {product.price && (
                  <p className="text-xl font-display text-gold-500">{product.price}</p>
                )}
              </div>
              <div className="h-px bg-cream-200" />
              <p className="text-obsidian-700/70 leading-relaxed text-base">
                {product.description}
              </p>
              <div className="h-px bg-cream-200" />
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={product.buyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-obsidian-900 hover:bg-obsidian-700 text-white text-sm font-medium tracking-widest uppercase rounded-xl transition-colors duration-300"
                >
                  <ShoppingBag size={16} />
                  Buy Now
                  <ExternalLink size={12} className="opacity-50" />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => shareProduct(product.id, product.title)}
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-cream-200 hover:border-gold-400 text-obsidian-800 hover:text-gold-500 text-sm font-medium tracking-widest uppercase rounded-xl transition-all duration-300"
                >
                  <Share2 size={16} />
                  Share
                </motion.button>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-cream-200" />
                <h2 className="font-display text-2xl font-light text-obsidian-900 whitespace-nowrap">
                  You May Also Like
                </h2>
                <div className="h-px flex-1 bg-cream-200" />
              </div>
              <div className="masonry-grid">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
