"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Pin, Facebook } from "lucide-react";
import { FaPinterest } from "react-icons/fa";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: FaPinterest, href: "https://pin.it/5XjdsY9s4", label: "Pinterest" },
];
export default function Footer() {
  return (
    <footer className="bg-obsidian-900 text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7">
                <img src="https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg" alt="logo" className="rounded-full"/>
              </div>
              <span className="font-display text-xl font-medium text-white tracking-wider">
                NestByStyle
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Amazon home decor deals for Indian homes 🏠
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-medium tracking-widest uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-medium tracking-widest uppercase">
              Follow
            </h4>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -2, color: "#D4A853" }}
                  className="text-white/60 hover:text-gold-400 transition-colors duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-wide">
            © {new Date().getFullYear()} NestByStyle. All rights reserved.
          </p>
          <p className="text-xs">
            Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
