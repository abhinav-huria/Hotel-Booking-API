import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ component: Component, ...restOfProps }) {

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;


    
   
}

export default ProtectedRoute;

{/* <Route exact path="/dashboard" element={<ProtectedRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route> */}