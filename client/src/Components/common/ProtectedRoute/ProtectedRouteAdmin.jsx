import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteAdmin({ component: Component, ...restOfProps }) {
console.log('ProtectedRouteAdmin');
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(isAuthenticated);
  const isAdmin = localStorage.getItem("isAdmin");

  if(isAuthenticated === "true" && isAdmin === "true"){
    return <Outlet />;
  }
 
    return <Navigate to="/login" />;


    
   
}

export default ProtectedRouteAdmin;

{/* <Route exact path="/dashboard" element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route> */}