"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearFavorites } from "@/hooks/useFavorites";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      // Ao sair, os favoritos salvos no navegador são apagados.
      clearFavorites();
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-pink-600 hover:text-pink-500 disabled:opacity-50"
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
