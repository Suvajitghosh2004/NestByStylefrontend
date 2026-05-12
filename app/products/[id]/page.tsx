import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export const metadata: Metadata = {
  title: "Product — Maison",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
