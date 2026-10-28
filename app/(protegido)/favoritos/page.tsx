import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "Favoritos | FavStore",
};

export default function FavoritesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Meus favoritos</h1>
        <p className="text-zinc-400">
          Produtos salvos neste navegador. Eles são apagados ao sair da conta.
        </p>
      </div>
      <FavoritesList />
    </div>
  );
}
