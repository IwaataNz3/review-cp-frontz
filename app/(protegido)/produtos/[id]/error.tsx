"use client";

import Link from "next/link";

export default function ProductError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-xl border border-red-800 bg-red-950/40 p-6"
    >
      <p className="font-semibold text-red-300">
        Não foi possível carregar este produto.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500"
        >
          Voltar para produtos
        </Link>
      </div>
    </div>
  );
}
