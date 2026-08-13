import {
  login,
  adminLogin,
  me,
} from "../api/auth";

import type {
  AuthenticatedUser,
  UserRole,
} from "../types/auth";

const AUTH_STORAGE_KEY = "nispr-auth-user";
const TOKEN_STORAGE_KEY = "access_token";

export async function authenticate(
  email: string,
  password: string,
  isAdmin = false,
): Promise<AuthenticatedUser | null> {
  try {
    const response = isAdmin
      ? await adminLogin(email, password)
      : await login(email, password);

    if (!response?.access_token) {
      throw new Error("Login failed: access token not received.");
    }

    localStorage.setItem(
      TOKEN_STORAGE_KEY,
      response.access_token,
    );

    const user = await me();

    const role = String(user.role || "").toLowerCase();

    if (role !== "admin" && role !== "customer") {
      throw new Error(`Invalid user role: ${user.role}`);
    }

    const authUser: AuthenticatedUser = {
      email: user.email,
      role: role as UserRole,
      name: user.full_name,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authUser),
    );

    return authUser;
  } catch (error) {
    console.error("Authentication failed:", error);

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(AUTH_STORAGE_KEY);

    throw error;
  }
}

export function getAuthenticatedUser(): AuthenticatedUser | null {
  const data = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as AuthenticatedUser;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getDashboardPath(role: UserRole) {
  return role === "admin"
    ? "/admin/dashboard"
    : "/customer";
}