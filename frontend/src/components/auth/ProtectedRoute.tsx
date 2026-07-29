import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getAuthenticatedUser, getDashboardPath } from "../../services/authService";
import type { UserRole } from "../../types/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const user = getAuthenticatedUser();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
