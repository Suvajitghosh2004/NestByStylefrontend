# Maison — Pinterest-Style Luxury Product Showcase

A premium, fully-responsive product showcase and affiliate promotion platform built with Next.js 15, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## 📁 Project Structure

```
maison/
├── app/
│   ├── page.tsx                   # Home page
│   ├── contact/page.tsx           # Contact page
│   ├── products/[id]/             # Dynamic product detail pages
│   └── admin/
│       ├── login/page.tsx         # Admin login
│       ├── dashboard/page.tsx     # Admin dashboard (CRUD)
│       └── page.tsx               # Admin redirect
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Sticky responsive navbar
│   │   └── Footer.tsx             # Footer with social links
│   └── product/
│       ├── HeroSlider.tsx         # Full-width auto-advancing slider
│       ├── SearchBar.tsx          # Dynamic product search
│       ├── ProductCard.tsx        # Pinterest-style product card
│       └── ProductGrid.tsx        # Masonry product grid
├── lib/
│   ├── data.ts                    # Seed data (products + hero slides)
│   └── utils.ts                   # Utility functions
├── store/
│   └── index.ts                   # Zustand state (products + auth)
├── types/
│   └── index.ts                   # TypeScript interfaces
└── app/globals.css                # Global styles + masonry CSS
```

---

## ✨ Features

### Public
- 🖼️ Full-width hero carousel with 5 cinematic slides
- 🔍 Real-time product search / filter
- 🧱 Pinterest-style masonry product grid
- 📦 Dynamic product detail pages (shareable URLs)
- 📤 Native share API (copies URL on unsupported browsers)
- 📱 Touch swipe on hero slider
- 💬 Contact form with validation
- 🦴 Skeleton loaders for images

### Admin
- 🔐 Protected admin routes
- ➕ Create products (image URL, title, description, buy link, category, price)
- ✏️ Edit existing products
- 🗑️ Delete with confirmation modal
- 🔓 Secure logout

### Technical
- ⚡ Next.js 15 App Router
- 🎨 Framer Motion animations throughout
- 🧩 Zustand with persistence (localStorage)
- 📱 Mobile-first, fully responsive (mobile / tablet / laptop / desktop)
- 🔤 Cormorant Garamond + DM Sans typography
- 🎨 Luxury cream/gold/obsidian color palette
- 🏷️ SEO optimized with metadata

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Display Font | Cormorant Garamond (serif) |
| Body Font | DM Sans |
| Primary | Obsidian `#0D0D0D` |
| Accent | Gold `#D4A853` |
| Background | Cream `#FDFBF7` |
| Border | Cream `#F4ECD8` |

---

## 📝 Environment

No `.env` file required. All data is stored client-side via Zustand persist (localStorage).

To reset all data: clear localStorage in browser DevTools.
