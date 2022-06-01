import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import axios from "axios";

function ProtectedRoute({ component: Component, ...restOfProps }) {
console.log('ProtectedRoute');
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log(isAuthenticated);
  if(isAuthenticated === "false"){
    console.log("not authenticated");
  }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;


    
   
}

export default ProtectedRoute;

{/* <Route exact path="/dashboard" element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route> */}