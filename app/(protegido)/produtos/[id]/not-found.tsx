import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-zinc-800 p-10 text-center">
      <h1 className="text-2xl font-bold text-white">Produto não encontrado</h1>
      <p className="text-zinc-400">Esse produto não existe ou foi removido.</p>
      <Link
        href="/"
        className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
      >
        Voltar para produtos
      </Link>
    </div>
  );
}
