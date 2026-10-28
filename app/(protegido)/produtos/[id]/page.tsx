import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

export const metadata: Metadata = {
  title: "Detalhes do produto | FavStore",
};

export default function ProductPage({ params }: PageProps<"/produtos/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/" className="text-sm text-zinc-400 hover:text-pink-500">
        ← Voltar para produtos
      </Link>

      {/* O id só é conhecido na hora da requisição, por isso fica dentro do Suspense. */}
      <Suspense fallback={<DetailsSkeleton />}>
        {params.then(({ id }) => (
          <ProductDetails id={id} />
        ))}
      </Suspense>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div aria-busy="true" className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-xl bg-zinc-900" />
      <div className="flex flex-col gap-4">
        <div className="h-8 w-3/4 animate-pulse rounded bg-zinc-900" />
        <div className="h-6 w-1/3 animate-pulse rounded bg-zinc-900" />
        <div className="h-32 animate-pulse rounded bg-zinc-900" />
      </div>
    </div>
  );
}
