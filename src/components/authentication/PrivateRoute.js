import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute() {
  const { currentUser } = useAuth();
  return <>{currentUser ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default PrivateRoute;
