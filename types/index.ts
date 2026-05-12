export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  buyLink: string;
  category: string;
  price?: string;
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}
