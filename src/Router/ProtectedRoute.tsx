import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element;
  allowedRoles: string[]; 
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // 1. Check if user is logged in
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has permission
  // We use .includes() so you can pass ["hr", "admin"] to one route if needed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // Ensure you have this route or redirect to dashboard
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;