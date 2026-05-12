"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4 py-12 md:py-16 px-4"
    >
      <p className="text-xs font-medium tracking-widest uppercase text-gold-500">
        Discover
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-light text-obsidian-900 text-center">
        Find Your Next Favourite
      </h2>

      <div className="relative w-full max-w-xl mt-4 group">
        {/* Focus glow */}
        <div className="absolute inset-0 rounded-full bg-gold-400/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />

        <div className="relative flex items-center bg-white border border-cream-200 rounded-full shadow-card hover:shadow-card-hover transition-shadow duration-300 focus-within:border-gold-400">
          <Search
            size={16}
            className="absolute left-5 text-obsidian-700/40 group-focus-within:text-gold-500 transition-colors duration-200"
          />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-12 py-4 bg-transparent text-sm text-obsidian-900 placeholder:text-obsidian-700/30 focus:outline-none rounded-full"
            aria-label="Search products"
          />
          {value && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-5 text-obsidian-700/40 hover:text-obsidian-900 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      {value && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-obsidian-700/50"
        >
          Searching for &ldquo;{value}&rdquo;
        </motion.p>
      )}
    </motion.div>
  );
}
