import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isValidPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!process.env.APP_PASSWORD) {
    return NextResponse.json(
      { error: "Servidor sem senha configurada (APP_PASSWORD)." },
      { status: 500 },
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Preencha usuário e senha." },
      { status: 400 },
    );
  }

  if (!isValidPassword(password)) {
    return NextResponse.json(
      { error: "Usuário ou senha incorretos." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ username });
  response.cookies.set(SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
