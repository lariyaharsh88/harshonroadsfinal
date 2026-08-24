export const ADMIN_COOKIE_NAME = "hor_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getAdminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value && value.length > 0 ? value : null;
}

export function getAdminSessionSecret(): string | null {
  const value = process.env.ADMIN_SESSION_SECRET?.trim();
  return value && value.length >= 16 ? value : null;
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword() && getAdminSessionSecret());
}
