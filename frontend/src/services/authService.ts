import type { AuthenticatedUser, UserRole } from "../types/auth";

const AUTH_STORAGE_KEY = "nispr-auth-user";

const temporaryAccounts: Record<
  string,
  {
    password: string;
    role: UserRole;
  }
> = {
  "admin@niscpr.in": {
    password: "Admin@123",
    role: "admin",
  },

  "customer@niscpr.in": {
    password: "Customer@123",
    role: "customer",
  },
};

export function authenticate(
  email: string,
  password: string,
): AuthenticatedUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const account = temporaryAccounts[normalizedEmail];

  if (!account || account.password !== password) {
    return null;
  }

  const user: AuthenticatedUser = {
    email: normalizedEmail,
    role: account.role,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function getAuthenticatedUser(): AuthenticatedUser | null {
  const serializedUser = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!serializedUser) {
    return null;
  }

  try {
    const user: unknown = JSON.parse(serializedUser);
    if (
      typeof user === "object" &&
      user !== null &&
      "email" in user &&
      "role" in user &&
      typeof user.email === "string" &&
      (user.role === "admin" || user.role === "customer")
    ) {
      return user as AuthenticatedUser;
    }
  } catch {
    // Ignore invalid or outdated local storage values.
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  return null;
}

export function getDashboardPath(role: UserRole): string {
  return role === "admin" ? "/admin/dashboard" : "/customer";
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
