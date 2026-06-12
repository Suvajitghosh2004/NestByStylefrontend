"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/product/HeroSlider";
import SearchBar from "@/components/product/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";
import { useProductStore } from "@/store";
import { productsApi } from "@/lib/api";
import { analyticsApi } from "@/lib/api";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PAGE_LIMIT = 10;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { products, loading, error, setProducts, setLoading, setError } =
    useProductStore();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // ── Track page view on mount ───────────────────────────────────────────
  useEffect(() => {
    analyticsApi.pageView(window.location.pathname);
  }, []);

  // ── Initial load ───────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productsApi.getPaginated({ page: 1, limit: PAGE_LIMIT });
        setProducts(res.data);
        setTotalPages(res.pagination.pages);
        setPage(1);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ── Load more ──────────────────────────────────────────────────────────
  const handleLoadMore = useCallback(async () => {
    if (loadingMore) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const res = await productsApi.getPaginated({ page: nextPage, limit: PAGE_LIMIT });
      setProducts([...products, ...res.data]);
      setPage(nextPage);
      setTotalPages(res.pagination.pages);
    } catch {
      // fail silently — user can retry
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, products, setProducts]);

  const allLoaded = page >= totalPages;

  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <SearchBar value={query} onChange={setQuery} />
        {error ? (
          <div className="text-center py-20 text-red-400">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm text-gold-500 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <ProductGrid
              products={products}
              searchQuery={query}
              loading={loading}
            />

            {/* Load More / spinner — only when not filtering by search */}
            {!query.trim() && !loading && products.length > 0 && (
              <div className="flex justify-center pb-20 -mt-8">
                {!allLoaded ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 px-8 py-3 border border-obsidian-900/20 hover:border-obsidian-900/50 text-obsidian-900 text-xs font-medium tracking-widest uppercase rounded-xl transition-colors duration-300 disabled:opacity-60"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Loading…
                      </>
                    ) : (
                      "Load More"
                    )}
                  </motion.button>
                ) : (
                  <p className="text-xs text-obsidian-700/30 tracking-widest uppercase">
                    All products loaded
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
