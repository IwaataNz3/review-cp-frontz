"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";

export default function NavLinks() {
  const pathname = usePathname();
  const { favorites } = useFavorites();

  const links = [
    { href: "/", label: "Produtos" },
    { href: "/favoritos", label: `Favoritos (${favorites.length})` },
  ];

  return (
    <nav className="flex gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            pathname === link.href
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
