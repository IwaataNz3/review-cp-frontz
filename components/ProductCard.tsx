import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { formatPrice } from "@/lib/products";
import type { ProductSummary } from "@/types/product";

interface ProductCardProps {
  product: ProductSummary;
  isFavorite: boolean;
}

export default function ProductCard({ product, isFavorite }: ProductCardProps) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border bg-zinc-900 transition-colors ${
        isFavorite ? "border-pink-600" : "border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <Link href={`/produtos/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-zinc-800">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-4"
          />
          {isFavorite && (
            <span className="absolute left-3 top-3 rounded-full bg-pink-600 px-2 py-1 text-xs font-semibold text-white">
              ♥ Favorito
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-xs uppercase tracking-wide text-zinc-400">
            {product.category}
          </span>
          <h2 className="font-semibold text-zinc-100">{product.title}</h2>
          <p className="text-xl font-bold text-pink-500">
            {formatPrice(product.price)}
          </p>
          <div className="mt-auto flex justify-between text-sm text-zinc-400">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>Estoque: {product.stock}</span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <FavoriteButton product={product} />
      </div>
    </article>
  );
}
