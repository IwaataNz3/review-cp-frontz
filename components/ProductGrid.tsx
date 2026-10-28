"use client";

import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { ProductSummary } from "@/types/product";

export default function ProductGrid({ products }: { products: ProductSummary[] }) {
  const { isFavorite } = useFavorites();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={isFavorite(product.id)}
        />
      ))}
    </div>
  );
}
