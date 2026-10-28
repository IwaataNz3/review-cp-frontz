import Image from "next/image";
import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import { fetchProductById, formatPrice, toSummary } from "@/lib/products";

export default async function ProductDetails({ id }: { id: string }) {
  const product = await fetchProductById(id);
  if (!product) notFound();

  const originalPrice = product.price / (1 - product.discountPercentage / 100);

  const infos = [
    { label: "Marca", value: product.brand ?? "Não informada" },
    { label: "Categoria", value: product.category },
    { label: "Avaliação", value: `★ ${product.rating.toFixed(1)}` },
    { label: "Estoque", value: `${product.stock} unidade(s)` },
    { label: "Disponibilidade", value: product.availabilityStatus },
    { label: "Garantia", value: product.warrantyInformation },
    { label: "Envio", value: product.shippingInformation },
    { label: "Política de devolução", value: product.returnPolicy },
    { label: "Pedido mínimo", value: `${product.minimumOrderQuantity} unidade(s)` },
    { label: "SKU", value: product.sku },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <Image
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs uppercase tracking-wide text-zinc-400">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-white">{product.title}</h1>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-pink-500">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-zinc-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="rounded bg-pink-600/20 px-2 py-1 text-sm font-semibold text-pink-400">
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-zinc-300">{product.description}</p>

          <div>
            <FavoriteButton product={toSummary(product)} size="lg" />
          </div>

          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-zinc-800 pt-5 sm:grid-cols-2">
            {infos.map((info) => (
              <div key={info.label}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {info.label}
                </dt>
                <dd className="text-zinc-200">{info.value}</dd>
              </div>
            ))}
          </dl>

          {product.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white">Avaliações</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {product.reviews.map((review) => (
              <li
                key={`${review.reviewerEmail}-${review.date}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="text-pink-500">
                  {"★".repeat(review.rating)}
                  <span className="text-zinc-700">{"★".repeat(5 - review.rating)}</span>
                </p>
                <p className="mt-2 text-zinc-200">{review.comment}</p>
                <p className="mt-3 text-sm text-zinc-500">{review.reviewerName}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
