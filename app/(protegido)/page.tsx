import type { Metadata } from "next";
import ProductSearch from "@/components/ProductSearch";

export const metadata: Metadata = {
  title: "Produtos | FavStore",
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Produtos</h1>
        <p className="text-zinc-400">
          Pesquise produtos e salve seus favoritos para ver depois.
        </p>
      </div>
      <ProductSearch />
    </div>
  );
}
