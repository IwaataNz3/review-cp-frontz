import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth";

// Roda no servidor antes de cada página: protege a área logada
// e tira da tela de login quem já está autenticado.
export function proxy(request: NextRequest) {
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Ignora rotas de API, arquivos estáticos e imagens.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
