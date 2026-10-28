"use client";

import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesList() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 p-10 text-center text-zinc-400">
        <p>Você ainda não favoritou nenhum produto.</p>
        <Link
          href="/"
          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  return <ProductGrid products={favorites} />;
}
