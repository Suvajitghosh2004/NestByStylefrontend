"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  loading?: boolean;
}

// Skeleton card for loading state
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

export default function ProductGrid({
  products,
  searchQuery,
  loading = false,
}: ProductGridProps) {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

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

  if (filtered.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-24 gap-4 text-obsidian-700/40"
      >
        <PackageOpen size={48} strokeWidth={1} />
        <p className="font-display text-2xl font-light">No products found</p>
        <p className="text-sm">
          {searchQuery ? `No results for "${searchQuery}"` : "Check back soon"}
        </p>
      </motion.div>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="masonry-grid">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
