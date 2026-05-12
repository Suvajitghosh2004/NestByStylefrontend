"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;

  // Pages with light/white hero background need dark navbar text from the start
  const isLightPage = pathname === "/contact" || pathname.startsWith("/products");

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled || isLightPage
            ? "navbar-blur bg-cream-50/80 border-b border-cream-200 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <div className="w-7 h-7">
                  <img src="https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg" alt="logo" className="rounded-full"/>
                </div>
                <span
                  className={cn(
                    "font-display text-xl font-medium tracking-wider transition-colors duration-300",
                    scrolled || isLightPage ? "text-obsidian-900" : "text-white drop-shadow-sm"
                  )}
                >
                  NestByStyle
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className="relative group">
                    <span
                      className={cn(
                        "text-sm font-medium tracking-widest uppercase transition-colors duration-300",
                        scrolled || isLightPage
                          ? active
                            ? "text-gold-500"
                            : "text-obsidian-700 hover:text-obsidian-900"
                          : active
                          ? "text-gold-400"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {link.label}
                    </span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px bg-gold-400"
                      initial={{ width: active ? "100%" : "0%" }}
                      animate={{ width: active ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                scrolled || isLightPage
                  ? "text-obsidian-900 hover:bg-cream-200"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden pt-16"
          >
            <div className="navbar-blur bg-cream-50/95 h-full flex flex-col">
              <nav className="flex flex-col items-center justify-center flex-1 gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "font-display text-4xl font-light tracking-wider transition-colors",
                        pathname === link.href
                          ? "text-gold-500"
                          : "text-obsidian-800 hover:text-gold-500"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
