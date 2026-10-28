"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { ProductSummary } from "@/types/product";

interface FavoriteButtonProps {
  product: ProductSummary;
  size?: "sm" | "lg";
}

export default function FavoriteButton({ product, size = "sm" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);

  const sizeClass = size === "lg" ? "px-5 py-3 text-base" : "px-3 py-2 text-sm";
  const colorClass = active
    ? "border-pink-600 bg-pink-600 text-white hover:bg-pink-700"
    : "border-zinc-700 text-zinc-200 hover:border-pink-600 hover:text-pink-500";

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(product)}
      aria-pressed={active}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors ${sizeClass} ${colorClass}`}
    >
      <span aria-hidden="true">{active ? "♥" : "♡"}</span>
      {active ? "Favoritado" : "Favoritar"}
    </button>
  );
}
