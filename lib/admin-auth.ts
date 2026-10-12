import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "atelier_admin_session";
const ADMIN_SECRET_TOKEN = "atelier_silk_admin_authenticated_session_token";

export const ADMIN_CREDENTIALS = {
  username: "aziz",
  password: "123",
};

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === ADMIN_SECRET_TOKEN;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, ADMIN_SECRET_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
