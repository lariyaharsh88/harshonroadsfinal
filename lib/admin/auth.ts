import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";
import {
  getAdminPassword,
  isAdminConfigured,
} from "@/lib/admin/config";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
} from "@/lib/admin/session";

function safeComparePassword(input: string, expected: string): boolean {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);
  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<void> {
  if (!(await getAdminSession())) {
    redirect("/admin/login");
  }
}

export async function loginAdmin(password: string): Promise<{ ok: boolean; error?: string }> {
  if (!isAdminConfigured()) {
    return {
      ok: false,
      error:
        "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET in your environment.",
    };
  }

  const expected = getAdminPassword();
  if (!expected || !safeComparePassword(password, expected)) {
    return { ok: false, error: "Incorrect password." };
  }

  const token = createSessionToken();
  if (!token) {
    return { ok: false, error: "Could not create a session." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return { ok: true };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
