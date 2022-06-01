import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteHotelOwner({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isHotelOwner = localStorage.getItem("isHotelOwner");

  

  return isHotelOwner ? <Outlet /> : <Navigate to="/login" />;
  
}

export default ProtectedRouteHotelOwner;
