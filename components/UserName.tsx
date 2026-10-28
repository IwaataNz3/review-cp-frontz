import { cookies } from "next/headers";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth";

// Lê o usuário logado direto do cookie, no servidor.
export default async function UserName() {
  const cookieStore = await cookies();
  const session = readSessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) return null;
  return (
    <span className="hidden text-sm text-zinc-400 sm:inline">
      Olá, <strong className="text-zinc-100">{session.username}</strong>
    </span>
  );
}
