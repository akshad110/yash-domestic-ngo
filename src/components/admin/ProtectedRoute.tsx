import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
}

export default ProtectedRoute;
