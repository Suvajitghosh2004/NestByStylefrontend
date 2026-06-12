"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Share2, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "@/types";
import { shareProduct } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { analyticsApi } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const viewTracked = useRef(false);

  // ── Check if description actually overflows 2 lines ─────────────────────
  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    // scrollHeight > clientHeight means text overflows the clamped box
    setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
  }, [product.description]);

  // ── Intersection Observer — track product view once visible ──────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el || viewTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !viewTracked.current) {
          viewTracked.current = true;
          analyticsApi.productView(product.id, product.title);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [product.id, product.title]);

  const handleBuyClick = () => {
    analyticsApi.buyClicked(product.id, product.title, product.price || "");
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      className="masonry-item group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-400 flex flex-col"
    >
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            !imgLoaded && "skeleton min-h-[280px]"
          )}
          style={{ aspectRatio: "2/3" }}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            loading="lazy"
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-105",
              imgLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-obsidian-900/0 group-hover:bg-obsidian-900/10 transition-colors duration-400" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-medium tracking-widest uppercase bg-white/90 backdrop-blur-sm text-obsidian-800 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-display text-lg font-medium text-obsidian-900 leading-tight hover:text-gold-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Share button */}
          <button
            onClick={() => shareProduct(product.id, product.title)}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-cream-100 hover:bg-gold-400/10 flex items-center justify-center text-obsidian-700/50 hover:text-gold-500 transition-all duration-200"
            aria-label={`Share ${product.title}`}
          >
            <Share2 size={13} />
          </button>
        </div>

        {/* Price */}
        {product.price && (
          <p className="text-xs font-medium text-gold-500 mb-2 tracking-wide">
            {product.price}
          </p>
        )}

        {/* Description — flex-1 so card footer stays pinned */}
        <div className="mb-4 flex-1 flex flex-col">
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              expanded ? "max-h-[600px]" : "max-h-[2.8rem]"
            )}
          >
            <p
              ref={descRef}
              className={cn(
                "text-xs text-obsidian-700/60 leading-relaxed",
                !expanded && "line-clamp-2"
              )}
            >
              {product.description}
            </p>
          </div>

          {isOverflowing && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-0.5 text-gold-500 hover:text-gold-600 mt-1 text-xs font-medium self-start"
              aria-expanded={expanded}
            >
              {expanded ? (
                <>
                  Less <ChevronUp size={10} />
                </>
              ) : (
                <>
                  More <ChevronDown size={10} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Buy Button */}
        <motion.a
          href={product.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyClick}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-obsidian-900 hover:bg-obsidian-700 text-white text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300"
        >
          <ShoppingBag size={13} />
          Buy Now
        </motion.a>
      </div>
    </motion.article>
  );
}
