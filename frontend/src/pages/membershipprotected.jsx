// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const LProtectedRoute = ({ children, role = "member" }) => {
  const storedUser = localStorage.getItem(role);

  if (!storedUser) {
    return <Navigate to="/loan-login" replace />;
  }

  return children;
};

export default LProtectedRoute;
