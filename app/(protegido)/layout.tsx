import type { ReactNode } from "react";
import Header from "@/components/Header";

// Layout da área autenticada. O acesso é protegido pelo proxy.ts.
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
    </>
  );
}
