import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login | FavStore",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="text-center text-3xl font-bold text-white">
          Fav<span className="text-pink-600">Store</span>
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-zinc-400">
          Entre para ver os produtos e salvar seus favoritos.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
