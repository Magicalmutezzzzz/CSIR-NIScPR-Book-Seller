import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getAuthenticatedUser, getDashboardPath } from "../../services/authService";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps) {
  const user = getAuthenticatedUser();

  if (user) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return <>{children}</>;
}
