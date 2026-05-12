import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF6EE",
          200: "#F4ECD8",
        },
        obsidian: {
          900: "#0D0D0D",
          800: "#1A1A1A",
          700: "#2A2A2A",
        },
        gold: {
          400: "#D4A853",
          500: "#C49A3C",
          600: "#A67C2A",
        },
        blush: {
          100: "#F9EDEA",
          200: "#F0D5CF",
          400: "#C97D73",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        luxury: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        "luxury-hover":
          "0 20px 60px rgba(0,0,0,0.14), 0 6px 20px rgba(0,0,0,0.08)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 16px 48px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
