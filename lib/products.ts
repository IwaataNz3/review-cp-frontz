import type { Product, ProductSummary, ProductsResponse } from "@/types/product";

const API_URL = "https://dummyjson.com/products";
export const PAGE_LIMIT = 15;

// Lista inicial ou busca, sempre com no máximo 15 produtos.
export async function fetchProducts(
  query: string,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const term = query.trim();
  const url = term
    ? `${API_URL}/search?q=${encodeURIComponent(term)}&limit=${PAGE_LIMIT}`
    : `${API_URL}?limit=${PAGE_LIMIT}`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar produtos`);
  }
  return response.json();
}

// Retorna null quando o produto não existe (a API responde 404).
export async function fetchProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao buscar o produto`);
  }
  return response.json();
}

export function toSummary(product: Product): ProductSummary {
  const { id, title, thumbnail, category, price, rating, stock } = product;
  return { id, title, thumbnail, category, price, rating, stock };
}

export function formatPrice(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
