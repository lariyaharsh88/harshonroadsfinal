import { createHmac, timingSafeEqual } from "crypto";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  getAdminSessionSecret,
} from "@/lib/admin/config";

type SessionPayload = {
  exp: number;
};

export { ADMIN_COOKIE_NAME, ADMIN_SESSION_MAX_AGE_SECONDS };

export function createSessionToken(): string | null {
  const secret = getAdminSessionSecret();
  if (!secret) {
    return null;
  }

  const payload: SessionPayload = {
    exp: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) {
    return false;
  }

  const secret = getAdminSessionSecret();
  if (!secret) {
    return false;
  }

  const [body, signature] = token.split(".");
  if (!body || !signature) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  if (signature.length !== expected.length) {
    return false;
  }

  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as SessionPayload;
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
