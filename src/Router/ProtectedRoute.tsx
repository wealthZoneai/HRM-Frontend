import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }:any) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" replace />;
  if (role !== allowedRole) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;
