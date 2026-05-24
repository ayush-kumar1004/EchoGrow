import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "echogrow_admin_session";

function getExpectedSessionToken(): string {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "echogrow2026";
  const secret = process.env.ADMIN_SESSION_SECRET || "echogrow_default_secret_key";
  
  return crypto.createHmac("sha256", secret).update(`${username}:${password}`).digest("hex");
}

export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionToken) return false;
    return sessionToken === getExpectedSessionToken();
  } catch (error) {
    console.error("Error verifying admin session:", error);
    return false;
  }
}

export async function loginAdmin(usernameInput: string, passwordInput: string): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "echogrow2026";

  if (usernameInput === expectedUsername && passwordInput === expectedPassword) {
    const token = getExpectedSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logoutAdmin(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch (error) {
    console.error("Error clearing admin session:", error);
  }
}
