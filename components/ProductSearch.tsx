"use client";

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { fetchProducts, toSummary } from "@/lib/products";
import type { ProductSummary } from "@/types/product";

type SearchResult =
  | { key: string; status: "success"; products: ProductSummary[]; total: number }
  | { key: string; status: "error"; message: string };

const DEBOUNCE_MS = 400;

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<SearchResult | null>(null);

  // Espera o usuário parar de digitar antes de chamar a API.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  // A chave identifica a requisição atual. Enquanto o resultado salvo
  // for de outra chave (ou o usuário ainda estiver digitando), mostra o carregamento.
  const requestKey = `${debouncedQuery}|${attempt}`;
  const isLoading = result?.key !== requestKey || query.trim() !== debouncedQuery;

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(debouncedQuery, controller.signal)
      .then((data) =>
        setResult({
          key: requestKey,
          status: "success",
          products: data.products.map(toSummary),
          total: data.total,
        }),
      )
      .catch((error: unknown) => {
        // Requisição cancelada porque o usuário digitou de novo.
        if (controller.signal.aborted) return;
        setResult({
          key: requestKey,
          status: "error",
          message: error instanceof Error ? error.message : "Erro desconhecido",
        });
      });

    return () => controller.abort();
  }, [debouncedQuery, requestKey]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="busca" className="text-sm font-medium text-zinc-300">
          Buscar produtos
        </label>
        <input
          id="busca"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ex.: phone, laptop, perfume..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-pink-600"
        />
      </div>

      {isLoading && <LoadingState />}

      {!isLoading && result?.status === "error" && (
        <div
          role="alert"
          className="flex flex-col items-start gap-3 rounded-xl border border-red-800 bg-red-950/40 p-6"
        >
          <p className="font-semibold text-red-300">
            Não foi possível carregar os produtos.
          </p>
          <p className="text-sm text-red-400">{result.message}</p>
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && result?.status === "success" && result.products.length === 0 && (
        <div className="rounded-xl border border-zinc-800 p-10 text-center text-zinc-400">
          Nenhum produto encontrado para &quot;{debouncedQuery}&quot;.
        </div>
      )}

      {!isLoading && result?.status === "success" && result.products.length > 0 && (
        <>
          <p className="text-sm text-zinc-400">
            Mostrando {result.products.length} de {result.total} produto(s)
            {debouncedQuery && <> para &quot;{debouncedQuery}&quot;</>}
          </p>
          <ProductGrid products={result.products} />
        </>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando produtos"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="h-80 animate-pulse rounded-xl bg-zinc-900" />
      ))}
    </div>
  );
}
