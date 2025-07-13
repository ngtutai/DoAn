import { JSX } from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("adminToken");
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default AdminPrivateRoute;
