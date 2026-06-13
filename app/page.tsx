"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/product/HeroSlider";
import SearchBar from "@/components/product/SearchBar";
import ProductGrid from "@/components/product/ProductGrid";
import { useProductStore } from "@/store";
import { productsApi, analyticsApi } from "@/lib/api";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { products, loading, error, setProducts, setLoading, setError } =
    useProductStore();

  useEffect(() => {
    analyticsApi.pageView(window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productsApi.getAll();
        setProducts(res.data);
      } catch (err: any) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
          <ProductGrid
            products={products}
            searchQuery={query}
            loading={loading}
            onClearSearch={() => setQuery("")}
          />
        )}
      </main>
      <Footer />
    </>
  );
}