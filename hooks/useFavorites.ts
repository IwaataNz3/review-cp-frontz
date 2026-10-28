"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ProductSummary } from "@/types/product";

const STORAGE_KEY = "favoritos";
const CHANGE_EVENT = "favoritos-change";
const EMPTY: ProductSummary[] = [];

// Guarda a última leitura para não criar um array novo a cada render.
let cachedRaw: string | null = null;
let cachedList: ProductSummary[] = EMPTY;

function readFavorites(): ProductSummary[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedList = raw ? JSON.parse(raw) : EMPTY;
    } catch {
      cachedList = EMPTY;
    }
  }
  return cachedList;
}

function saveFavorites(list: ProductSummary[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function clearFavorites() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Atualiza a tela quando os favoritos mudam nesta aba ou em outra.
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useFavorites() {
  // No servidor não existe localStorage, então começa com a lista vazia.
  const favorites = useSyncExternalStore(subscribe, readFavorites, () => EMPTY);

  const isFavorite = useCallback(
    (id: number) => favorites.some((item) => item.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback((product: ProductSummary) => {
    const current = readFavorites();
    const exists = current.some((item) => item.id === product.id);
    saveFavorites(
      exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
