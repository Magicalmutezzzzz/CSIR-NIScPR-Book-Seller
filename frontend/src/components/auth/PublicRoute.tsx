import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps) {
  // TODO: Replace with AuthContext later
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}