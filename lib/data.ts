import { Product, HeroSlide } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "h1",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    title: "Curated Luxury",
    subtitle: "Discover pieces that define your aesthetic",
  },
  {
    id: "h2",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    title: "Edit Your World",
    subtitle: "Premium finds for the discerning eye",
  },
  {
    id: "h3",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    title: "Live Beautifully",
    subtitle: "Objects that elevate everyday moments",
  },
  {
    id: "h4",
    image:
      "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=1600&q=80",
    title: "Timeless Style",
    subtitle: "Classics reimagined for the modern era",
  },
  {
    id: "h5",
    image:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80",
    title: "The Edit",
    subtitle: "A thoughtful collection of extraordinary things",
  },
];

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "Silk Slip Dress",
    description:
      "Effortless elegance in 100% mulberry silk. This bias-cut slip dress drapes beautifully against the body, transitioning seamlessly from day to evening. The adjustable spaghetti straps and subtle sheen make it a wardrobe cornerstone.",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    buyLink: "https://example.com/silk-slip-dress",
    category: "Fashion",
    price: "$320",
    createdAt: "2024-01-01",
  },
  {
    id: "p2",
    title: "Linen Table Runner",
    description:
      "Stonewashed Belgian linen in a natural ecru tone. Adds an artisanal, relaxed luxury to any table setting. Pre-washed for softness, gets better with every wash.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    buyLink: "https://example.com/linen-runner",
    category: "Home",
    price: "$85",
    createdAt: "2024-01-02",
  },
  {
    id: "p3",
    title: "Leather Tote Bag",
    description:
      "Full-grain vegetable-tanned Italian leather that develops a rich patina over time. Spacious interior with a zip pocket. Solid brass hardware. Each piece is unique.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    buyLink: "https://example.com/leather-tote",
    category: "Accessories",
    price: "$485",
    createdAt: "2024-01-03",
  },
  {
    id: "p4",
    title: "Ceramic Pour-Over Set",
    description:
      "Hand-thrown stoneware in a warm matte glaze. Each piece is slightly unique, bearing the marks of handcraft. Includes dripper and matching carafe. Elevates the morning ritual into ceremony.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    buyLink: "https://example.com/ceramic-pourover",
    category: "Kitchen",
    price: "$145",
    createdAt: "2024-01-04",
  },
  {
    id: "p5",
    title: "Cashmere Wrap Scarf",
    description:
      "Grade A Mongolian cashmere in an oversized wrap silhouette. Feather-light yet incredibly warm. Versatile enough to wear as a scarf, shawl, or light blanket. Available in eight muted tones.",
    image:
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    buyLink: "https://example.com/cashmere-wrap",
    category: "Fashion",
    price: "$260",
    createdAt: "2024-01-05",
  },
  {
    id: "p6",
    title: "Marble Side Table",
    description:
      "Solid Carrara marble top on a slender brushed brass base. A sculptural accent piece that works in any room. Weighs enough to feel permanent, light enough to move. A true investment piece.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    buyLink: "https://example.com/marble-table",
    category: "Home",
    price: "$890",
    createdAt: "2024-01-06",
  },
  {
    id: "p7",
    title: "Minimalist Watch",
    description:
      "Swiss-made quartz movement in a 38mm case. Sapphire crystal glass, 100m water resistance. The dial is deliberately spare — just hands and hour markers. A watch that tells time and nothing else.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    buyLink: "https://example.com/minimalist-watch",
    category: "Accessories",
    price: "$620",
    createdAt: "2024-01-07",
  },
  {
    id: "p8",
    title: "Soy Wax Candle",
    description:
      "Hand-poured with a proprietary blend of cedarwood, vetiver, and black pepper. 60-hour burn time. The vessel is frosted borosilicate glass — repurpose it as a drinking glass when the candle is done.",
    image:
      "https://images.unsplash.com/photo-1602607837050-d38c3f37d4b6?w=800&q=80",
    buyLink: "https://example.com/soy-candle",
    category: "Home",
    price: "$68",
    createdAt: "2024-01-08",
  },
  {
    id: "p9",
    title: "Linen Blazer",
    description:
      "Unstructured Italian linen blazer with minimal padding and an easy drape. The fabric breathes in summer heat yet looks polished enough for the boardroom. A single-button closure keeps the silhouette clean.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    buyLink: "https://example.com/linen-blazer",
    category: "Fashion",
    price: "$395",
    createdAt: "2024-01-09",
  },
  {
    id: "p10",
    title: "Walnut Serving Board",
    description:
      "End-grain American black walnut with a food-safe mineral oil finish. The natural grain pattern makes each board unique. Deep enough to carve on, beautiful enough to serve from.",
    image:
      "https://images.unsplash.com/photo-1493808983891-fef49be38e3c?w=800&q=80",
    buyLink: "https://example.com/walnut-board",
    category: "Kitchen",
    price: "$120",
    createdAt: "2024-01-10",
  },
  {
    id: "p11",
    title: "Gold Hoop Earrings",
    description:
      "14k solid gold hoops, 35mm diameter. Thick enough to hold their shape, light enough to forget you're wearing them. The classic proportion that works with everything from a ponytail to an updo.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    buyLink: "https://example.com/gold-hoops",
    category: "Accessories",
    price: "$340",
    createdAt: "2024-01-11",
  },
  {
    id: "p12",
    title: "Linen Bedding Set",
    description:
      "Pre-washed French linen in a range of organic tones. Gets softer and more beautiful with every wash. Includes duvet cover, two pillowcases, and a flat sheet. OEKO-TEX certified.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    buyLink: "https://example.com/linen-bedding",
    category: "Home",
    price: "$280",
    createdAt: "2024-01-12",
  },
];
