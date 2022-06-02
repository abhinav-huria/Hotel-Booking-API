import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated === "false") {
    localStorage.clear();
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
