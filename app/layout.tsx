import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NestByStyle",
    template: "%s | NestByStyle",
  },
  description:
    "Discover premium, hand-curated home décor and lifestyle products. Shop beautiful furniture, candles, bedding, ceramics and more. Elevate your living space with NestByStyle.",
  keywords: [
    "home decor",
    "home decoration",
    "interior design",
    "home styling",
    "pinterest home decor",
    "aesthetic home",
    "luxury home decor",
    "minimalist home",
    "cozy home",
    "living room decor",
    "bedroom decor",
    "kitchen decor",
    "home accessories",
    "lifestyle products",
    "curated home",
    "premium furniture",
    "candles",
    "ceramic decor",
    "linen bedding",
    "marble decor",
    "nestbystyle",
  ],
  authors: [{ name: "NestByStyle" }],
  creator: "NestByStyle",
  publisher: "NestByStyle",
  category: "Home & Decor",
  icons: {
    icon: [
      {
        url: "https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg",
        type: "image/jpeg",
      },
    ],
    shortcut:
      "https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg",
    apple:
      "https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg",
  },
  openGraph: {
    title: "NestByStyle — Curated Home Décor & Lifestyle",
    description:
      "Discover premium, hand-curated home décor. Shop beautiful furniture, ceramics, bedding and more. Elevate your living space.",
    type: "website",
    siteName: "NestByStyle",
    locale: "en_US",
    images: [
      {
        url: "https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg",
        width: 280,
        height: 280,
        alt: "NestByStyle — Curated Home Décor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NestByStyle — Curated Home Décor & Lifestyle",
    description:
      "Discover premium, hand-curated home décor and lifestyle products.",
    images: [
      "https://i.pinimg.com/280x280_RS/a7/21/ca/a721cadc5c4c1cc4a8a5e73825d2a1ec.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nestbystyle.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-cream-50 text-obsidian-900 antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}