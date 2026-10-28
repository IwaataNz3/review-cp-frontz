import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Este arquivo só roda no servidor. A senha nunca chega ao navegador.

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 horas, em segundos

function getSecret(): string {
  const secret = process.env.APP_PASSWORD;
  if (!secret) {
    throw new Error("A variável de ambiente APP_PASSWORD não foi definida.");
  }
  return secret;
}

function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function isValidPassword(password: string): boolean {
  return safeCompare(password, getSecret());
}

// O token guarda o usuário e a validade, com uma assinatura HMAC.
// Sem a senha do servidor não dá para gerar um token válido.
export function createSessionToken(username: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = Buffer.from(JSON.stringify({ username, expiresAt })).toString(
    "base64url",
  );
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(
  token: string | undefined,
): { username: string } | null {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeCompare(signature, sign(payload))) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.username !== "string" || Date.now() > data.expiresAt) {
      return null;
    }
    return { username: data.username };
  } catch {
    return null;
  }
}
