import Link from "next/link";
import { Suspense } from "react";
import LogoutButton from "@/components/LogoutButton";
import NavLinks from "@/components/NavLinks";
import UserName from "@/components/UserName";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-white">
            Fav<span className="text-pink-600">Store</span>
          </Link>
          {/* usePathname só existe na requisição, então o menu entra num Suspense. */}
          <Suspense fallback={<nav className="h-9 w-48" />}>
            <NavLinks />
          </Suspense>
        </div>

        <div className="flex items-center gap-4">
          <Suspense fallback={null}>
            <UserName />
          </Suspense>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
