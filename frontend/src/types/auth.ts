export type UserRole = "admin" | "customer";

export interface AuthenticatedUser {
  email: string;
  role: UserRole;
}
