"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Pin } from "lucide-react";
import { FaPinterest } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const HINTS = [
  "rattan lamp",
  "ceramic vase",
  "boho wall art",
  "linen bedding",
  "marble tray",
  "macrame decor",
];

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const showHint = !value && !focused;
  const showPinterestGuide = focused && !value;

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

      {/* Pinterest hint — shown before user interacts */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cream-200 rounded-full shadow-sm"
          >
            <FaPinterest size={13} className="text-[#E60023] flex-shrink-0" />
            <p className="text-xs text-obsidian-700/70">
              Came from Pinterest?{" "}
              <span className="text-obsidian-900 font-medium">
                Copy the product title and paste it below ↓
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search input */}
      <div className="relative w-full max-w-xl group">
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste product title from Pinterest..."
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

      {/* Pinterest step-by-step guide — shown when input is focused and empty */}
      <AnimatePresence>
        {showPinterestGuide && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl bg-white border border-cream-200 rounded-2xl shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-cream-200 bg-cream-50">
              <FaPinterest size={13} className="text-[#E60023]" />
              <p className="text-xs font-medium text-obsidian-900">
                How to find the product you saw on Pinterest
              </p>
            </div>

            {/* Steps */}
            <div className="px-5 py-4 space-y-3">
              {[
                {
                  step: "1",
                  text: "Go back to the Pinterest pin you saw",
                },
                {
                  step: "2",
                  text: "Copy the product title (long press on mobile → Copy)",
                },
                {
                  step: "3",
                  text: "Paste it here — we'll find it instantly",
                },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold-400/15 text-gold-600 text-[10px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <p className="text-xs text-obsidian-700/70 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Example searches */}
            <div className="px-5 pb-4">
              <p className="text-[10px] font-medium tracking-widest uppercase text-obsidian-700/30 mb-2">
                Try searching
              </p>
              <div className="flex flex-wrap gap-1.5">
                {HINTS.map((hint) => (
                  <button
                    key={hint}
                    onMouseDown={(e) => {
                      e.preventDefault(); // prevent blur before click
                      onChange(hint);
                    }}
                    className="px-3 py-1.5 bg-cream-100 hover:bg-gold-400/10 hover:text-gold-600 text-obsidian-700/60 text-xs rounded-full border border-cream-200 hover:border-gold-300 transition-all duration-200"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active search label */}
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