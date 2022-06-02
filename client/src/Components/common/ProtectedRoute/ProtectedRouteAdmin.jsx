import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteAdmin({ component: Component, ...restOfProps }) {

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const isAdmin = localStorage.getItem("isAdmin");

  if (isAuthenticated === "true" && isAdmin === "true") {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}

export default ProtectedRouteAdmin;
