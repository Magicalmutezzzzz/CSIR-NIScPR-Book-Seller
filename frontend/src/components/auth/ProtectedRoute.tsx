import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  // TODO: Replace with real authentication state
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}