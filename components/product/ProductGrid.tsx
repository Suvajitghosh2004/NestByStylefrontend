"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { FaPinterest } from "react-icons/fa";
import { Search } from "lucide-react";
import Fuse from "fuse.js";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  loading?: boolean;
  onClearSearch?: () => void;
}

// Skeleton card
function SkeletonCard() {
  return (
    <div className="masonry-item bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="skeleton w-full" style={{ aspectRatio: "2/3" }} />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 rounded w-3/4" />
        <div className="skeleton h-3 rounded w-1/2" />
        <div className="skeleton h-3 rounded w-full" />
        <div className="skeleton h-8 rounded-xl mt-4" />
      </div>
    </div>
  );
}

// Not found state
function NotFound({
  query,
  onClear,
}: {
  query: string;
  onClear?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-cream-200 flex items-center justify-center">
          <Search size={36} strokeWidth={1} className="text-obsidian-700/30" />
        </div>
        {/* Pinterest dot */}
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white shadow-card flex items-center justify-center border border-cream-200">
          <FaPinterest size={14} className="text-[#E60023]" />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl md:text-4xl font-light text-obsidian-900 text-center mb-3"
      >
        No results for &ldquo;{query}&rdquo;
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-sm text-obsidian-700/50 text-center max-w-sm mb-10"
      >
        This product might not be listed yet — or try searching with different words.
      </motion.p>

      {/* Pinterest guide card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="w-full max-w-md bg-white border border-cream-200 rounded-2xl shadow-card overflow-hidden mb-6"
      >
        <div className="flex items-center gap-2.5 px-5 py-4 bg-cream-50 border-b border-cream-200">
          <FaPinterest size={14} className="text-[#E60023] flex-shrink-0" />
          <p className="text-xs font-medium text-obsidian-900">
            Did you come from Pinterest?
          </p>
        </div>
        <div className="px-5 py-5 space-y-4">
          <p className="text-xs text-obsidian-700/60 leading-relaxed">
            For best results, copy the <strong className="text-obsidian-800">exact product title</strong> from
            the Pinterest pin and paste it in the search bar.
          </p>
          <div className="space-y-2.5">
            {[
              { step: "1", label: "Open the Pinterest pin you liked" },
              { step: "2", label: "Copy the title text (press & hold on mobile)" },
              { step: "3", label: "Paste it in the search bar above" },
            ].map(({ step, label }) => (
              <div key={step} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-gold-400/15 text-gold-600 text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                  {step}
                </span>
                <span className="text-xs text-obsidian-700/65">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md space-y-2 mb-8"
      >
        <p className="text-[10px] font-medium tracking-widest uppercase text-obsidian-700/30 text-center mb-3">
          Search tips
        </p>
        {[
          "Try shorter keywords — \"rattan\" instead of \"rattan side table with drawer\"",
          "Check for spelling — try \"vase\" if \"vaas\" doesn't work",
          "Search by category — \"bedroom\", \"kitchen\", \"living room\"",
        ].map((tip) => (
          <div key={tip} className="flex items-start gap-2">
            <span className="text-gold-400 mt-0.5 flex-shrink-0 text-xs">—</span>
            <p className="text-xs text-obsidian-700/50 leading-relaxed">{tip}</p>
          </div>
        ))}
      </motion.div>

      {/* Clear button */}
      {onClear && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClear}
          className="flex items-center gap-2 px-7 py-3 bg-obsidian-900 hover:bg-obsidian-700 text-white text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300"
        >
          Browse All Products
        </motion.button>
      )}
    </motion.div>
  );
}

export default function ProductGrid({
  products,
  searchQuery,
  loading = false,
  onClearSearch,
}: ProductGridProps) {

  // Fuse.js fuzzy search instance — recreated only when products change
  const fuse = useMemo(
    () =>
      new Fuse(products, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.25 },
          { name: "category", weight: 0.15 },
        ],
        threshold: 0.4,       // 0 = exact match only, 1 = match anything
        ignoreLocation: true, // match anywhere in the string, not just start
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [products]
  );

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return fuse.search(searchQuery).map((r) => r.item);
  }, [fuse, products, searchQuery]);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="masonry-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (filtered.length === 0 && searchQuery.trim()) {
    return <NotFound query={searchQuery} onClear={onClearSearch} />;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Result count when searching */}
        {searchQuery.trim() && filtered.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-obsidian-700/40 mb-6 text-center tracking-wide"
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
          </motion.p>
        )}
        <div className="masonry-grid">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}